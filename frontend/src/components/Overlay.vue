<template>
  <div class="timer">
    <h1 v-if="prerollFree && !adRunning">Preroll Free Time: {{timeLeft}}</h1>
    <h1 v-if="adRunning">Ad Running: {{adTimeLeft}}</h1>
    <h1 v-if="!prerollFree && !adRunning">Prerolls Active</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'timeLeft',
      'adTimeLeft',
      'adRunning',
      'prerollFree'
    ])
  }
}
</script>
