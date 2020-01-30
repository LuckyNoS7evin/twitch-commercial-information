import Vue from 'vue'
import Vuex from 'vuex'

import mainAuth from '@/auth'

import ChatClient from 'twitch-chat-client'
import TwitchClient from 'twitch'
import { HubConnectionBuilder } from '@aspnet/signalr'

import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlayUrl: '',
    channel: null,
    client: null,
    chatClient: null,
    clientId: process.env.VUE_APP_CLIENT_ID,
    signalRServer: process.env.VUE_APP_SIGNALR_SERVER,
    signalRClient: null,
    adLastRun: Date.now(),
    adDuration: 0,
    prerollFreeDuration: 0,
    timeDifference: 0,
    adRunningDifference: 0
  },
  getters: {
    overlayUrl (state) {
      return state.overlayUrl
    },
    adRunning (state) {
      return state.adRunningDifference > 0
    },
    prerollFree (state) {
      return state.timeDifference > 0
    },
    timeLeft (state) {
      if (state.timeDifference < 0) {
        return '00:00'
      }
      let token = moment.duration(state.timeDifference, 'milliseconds').format('mm:ss', {
        trim: false
      })
      return token
    },
    adTimeLeft (state) {
      if (state.adRunningDifference < 0) {
        return '00:00'
      }
      let token = moment.duration(state.adRunningDifference, 'milliseconds').format('mm:ss', {
        trim: false
      })
      return token
    }
  },
  mutations: {
    channel (state, channel) {
      state.channel = channel
    },
    overlayUrl (state, overlayUrl) {
      state.overlayUrl = overlayUrl
    },
    client (state, client) {
      state.client = client
    },
    chatClient (state, chatClient) {
      state.chatClient = chatClient
    },
    signalRClient (state, signalRClient) {
      state.signalRClient = signalRClient
    },
    timeDifference (state, timeDifference) {
      state.timeDifference = timeDifference
    },
    adLastRun (state, adLastRun) {
      state.adLastRun = adLastRun
    },
    adDuration (state, adDuration) {
      state.adDuration = adDuration
    },
    prerollFreeDuration (state, prerollFreeDuration) {
      state.prerollFreeDuration = prerollFreeDuration
    },
    adRunningDifference  (state, adRunningDifference) {
      state.adRunningDifference = adRunningDifference
    }
  },
  actions: {
    runAd (context, time) {
      context.state.chatClient.runCommercial(context.state.channel, time)
        .then(_ => {
          return context.state.signalRClient.invoke('SendMessage', time)
        })
    },
    loadOverlay (context, channelId) {
      momentDurationFormatSetup(moment)
      setInterval(() => {
        let date = Date.now()
        let timeDifference = (context.state.adLastRun + context.state.prerollFreeDuration + context.state.adDuration) - date
        let adRunningDifference = (context.state.adLastRun + context.state.adDuration) - date
        if (timeDifference > context.state.prerollFreeDuration) {
          timeDifference = context.state.prerollFreeDuration
        }
        context.commit('timeDifference', timeDifference)
        context.commit('adRunningDifference', adRunningDifference)
      }, 1000)

      let signalRClient = new HubConnectionBuilder()
        .withUrl(`${context.state.signalRServer}`)
        .build()

      signalRClient.on('ReceiveMessage', (time) => {
        let duration = 0
        switch (time) {
          case 30: {
            duration = 10 * 60 * 1000
            break
          }
          case 60: {
            duration = 20 * 60 * 1000
            break
          }
          default: {
            duration = 30 * 60 * 1000
            break
          }
        }
        context.commit('adDuration', time * 1000)
        context.commit('adLastRun', Date.now())
        context.commit('prerollFreeDuration', duration)
      })
      signalRClient.start()
        .then(() => {
          signalRClient.send('listen', channelId)
          context.commit('signalRClient', signalRClient)
        })
    },
    async loadApplication (context) {
      momentDurationFormatSetup(moment)

      setInterval(() => {
        let date = Date.now()
        let timeDifference = (context.state.adLastRun + context.state.prerollFreeDuration + context.state.adDuration) - date
        let adRunningDifference = (context.state.adLastRun + context.state.adDuration) - date
        if (timeDifference > context.state.prerollFreeDuration) {
          timeDifference = context.state.prerollFreeDuration
        }
        context.commit('timeDifference', timeDifference)
        context.commit('adRunningDifference', adRunningDifference)
      }, 1000)

      let client = await TwitchClient.withCredentials(context.state.clientId, mainAuth.user.access_token)

      let user = await client.helix.users.getMe(false)
      const loco = window.location
      context.commit('overlayUrl', `${loco.protocol}//${loco.host}${process.env.BASE_URL}overlay/${user.id}`)
      context.commit('channel', user.name)
      let chatClient = await ChatClient.forTwitchClient(client, { webSocket: true })
      chatClient.connect()
        .then(() => chatClient.waitForRegistration())
        .then(() => chatClient.join(user.name))
        .then(() => {
          console.log('here')
          chatClient.say(user.name, 'hey')
          context.commit('chatClient', chatClient)
        })

      context.commit('client', client)

      let signalRClient = new HubConnectionBuilder()
        .withUrl(`${context.state.signalRServer}`, {
          accessTokenFactory: () => mainAuth.user.id_token
        })
        .build()
      signalRClient.on('ReceiveMessage', (time) => {
        let duration = 0
        switch (time) {
          case 30: {
            duration = 10 * 60 * 1000
            break
          }
          case 60: {
            duration = 20 * 60 * 1000
            break
          }
          default: {
            duration = 30 * 60 * 1000
            break
          }
        }
        context.commit('adDuration', time * 1000)
        context.commit('adLastRun', Date.now())
        context.commit('prerollFreeDuration', duration)
      })
      signalRClient.start().then(() => context.commit('signalRClient', signalRClient))
    }
  }
})
