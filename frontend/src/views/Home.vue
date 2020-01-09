<template>
  <div class="home">
    <button @click="runAd(30)">Run 30s ad</button>
  </div>
</template>

<script>
import ChatClient from 'twitch-chat-client'
import TwitchClient from 'twitch'
import { HubConnectionBuilder } from '@aspnet/signalr'

export default {
  name: 'home',
  data () {
    return {
      channelId: '14900522',
      channel: 'luckynos7evin',
      client: null,
      chatClient: null,
      clientId: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_SECRET,
      clientAuthToken: process.env.VUE_APP_AUTH_TOKEN,
      signalRClient: null
    }
  },
  methods: {
    runAd (time) {
      this.chatClient.runCommercial(this.channel, time)
        .then(async _ => {
          console.log(`Comercial started ${time}`)
          this.signalRClient.invoke('SendMessage', this.channel, time)
            .catch(function (err) {
              return console.error(err.toString())
            })
        })
        .catch(error => console.error(error))
    }
  },
  async mounted () {
    this.client = await TwitchClient.withCredentials(this.clientId, this.clientAuthToken)
    let chatClient = await ChatClient.forTwitchClient(this.client, { webSocket: true })
    chatClient.connect()
      .then(() => chatClient.waitForRegistration())
      .then(() => chatClient.join(this.channel))
      .then(() => {
        this.chatClient = chatClient
      })
    this.signalRClient = new HubConnectionBuilder().withUrl('http://localhost:5000/messageHub').build()
    this.signalRClient.on('ReceiveMessage', (channel, time) => console.log({ channel, time }))
    this.signalRClient.start()
      .then(() => {
        console.log('connected')
      })
      .catch(function (err) {
        return console.error(err.toString())
      })
  }
}
</script>
