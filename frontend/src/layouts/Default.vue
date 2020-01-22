<template>
  <v-app class="app">
    <slot/>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Default',
  methods: {
    ...mapActions([
      'loadApplication'
    ])
  },
  mounted () {
    this.loadApplication()
  }
}
</script>
