<template>
  <div class="app">
    <home></home>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Home from '@/views/Home'

export default {
  components: {
    Home
  },
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

<style lang="scss">
* {
  margin:0;
  padding: 0;
}

html, body {
  background-color: transparent;
}

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #222;
  border-radius: 30px;
  height:100px;
  width:500px;
  text-align: center;
  color: #DDD;
  padding: 0 20px;
  line-height: 100px;
}

</style>
