<template>
  <div class="home">
    <button @click="runAd(30)">Run 30s ad</button>
    <button @click="runAd(90)">Run 90s ad</button>
    <button @click="fakeAd(30)">Run fake 30s ad</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState([
      'signalRClient',
      'chatClient',
      'channel'
    ])
  },
  methods: {
    fakeAd (time) {
      this.signalRClient.invoke('SendMessage', this.channel, time)
      // .catch(function (err) {
      //   return console.error(err.toString())
      // })
    },
    runAd (time) {
      this.chatClient.runCommercial(this.channel, time)
        .then(_ => {
          // console.log(`Comercial started ${time}`)
          return this.signalRClient.invoke('SendMessage', this.channel, time)
          // .catch(function (err) {
          //   return console.error(err.toString())
          // })
        })
        // .catch(error => console.error(error))
    }
  }
}
</script>
