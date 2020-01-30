<template>
<v-container class="fill-height" fluid>
   <v-row align="center" justify="center">
    <v-col cols="12" align="center" justify="center">
      <overlay />
    </v-col>
  </v-row>
   <v-row align="center" justify="center">
    <v-col cols="12" align="center" justify="center">
      <v-alert>
        Your overlay Url is: {{overlayUrl}}
      </v-alert>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col cols="6" align="center" justify="center">
      <v-btn @click="runAd(30)" class="ad-btn">Run 30-Second<br/> Ad Break</v-btn>
    </v-col>
    <v-col cols="6" align="center" justify="center">
      <v-btn @click="runAd(60)" class="ad-btn">Run 60-Second<br/> Ad Break</v-btn>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col cols="6" align="center" justify="center">
      <v-btn @click="runAd(90)" class="ad-btn">Run 90-Second<br/> Ad Break</v-btn>
    </v-col>
    <v-col cols="6" align="center" justify="center">
      <v-btn @click="runAd(120)" class="ad-btn">Run 120-Second<br/> Ad Break</v-btn>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col cols="6" align="center" justify="center">
      <v-btn @click="runAd(150)" class="ad-btn">Run 150-Second<br/> Ad Break</v-btn>
    </v-col>
    <v-col cols="6" align="center" justify="center">
      <v-btn @click="runAd(180)" class="ad-btn">Run 180-Second<br/> Ad Break</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Overlay from '@/components/Overlay'

export default {
  name: 'Settings',
  components: {
    Overlay
  },
  computed: {
    ...mapGetters([
      'overlayUrl'
    ])
  },
  methods: {
    ...mapActions([
      'loadApplication',
      'runAd'
    ])
  },
  mounted () {
    this.loadApplication()
  }
}
</script>

<style scoped>
.timer {
  /* width: fit-content; */
  height: 100px;
  background-color: #9147ff;
  border-radius: 20px;
  line-height: 100px;
}

.ad-btn {
  background-color: #9147ff !important;
  border-color: #9147ff !important;
  height: 150px !important;
  line-height: 150px !important;
  min-width:150px !important;
  border-radius: 20px !important;
}
</style>
