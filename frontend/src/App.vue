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

<style lang="scss">
// * {
//   margin:0;
//   padding: 0;
// }

// html, body {
//   background-color: transparent;
// }

// .app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   background-color: #222;
//   border-radius: 30px;
//   height:100px;
//   width:500px;
//   text-align: center;
//   color: #DDD;
//   padding: 0 20px;
//   line-height: 100px;
// }

</style>
