import Vue from 'vue'
import Vuex from 'vuex'

import ChatClient from 'twitch-chat-client'
import TwitchClient from 'twitch'
import { HubConnectionBuilder } from '@aspnet/signalr'

import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    channelId: process.env.VUE_APP_CHANNEL_ID,
    channel: process.env.VUE_APP_CHANNEL_NAME,
    client: null,
    chatClient: null,
    clientId: process.env.VUE_APP_CLIENT_ID,
    clientSecret: process.env.VUE_APP_SECRET,
    clientAuthToken: process.env.VUE_APP_AUTH_TOKEN,
    signalRServer: process.env.VUE_APP_SIGNALR_SERVER,
    signalRClient: null,
    adLastRun: Date.now(),
    adDuration: 0,
    prerollFreeDuration: 0,
    timeDifference: 0,
    adRunningDifference: 0
  },
  getters: {
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

      let client = await TwitchClient.withCredentials(context.state.clientId, context.state.clientAuthToken)
      let chatClient = await ChatClient.forTwitchClient(client, { webSocket: true })
      chatClient.connect()
        .then(() => chatClient.waitForRegistration())
        .then(() => chatClient.join(context.state.channel))
        .then(() => {
          context.commit('chatClient', chatClient)
        })

      context.commit('client', client)

      let signalRClient = new HubConnectionBuilder().withUrl(context.state.signalRServer).build()
      signalRClient.on('ReceiveMessage', (channel, time) => {
        // console.log({ channel, time })

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
          // console.log('connected')
          context.commit('signalRClient', signalRClient)
        })
      // .catch(function (err) {
      //   return console.error(err.toString())
      // })
    }
  }
})
