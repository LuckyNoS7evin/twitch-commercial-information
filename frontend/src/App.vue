<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>

export default {
  name: 'App',
  computed: {
    layout () {
      return (this.$route.meta.layout || 'default') + '-layout'
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
