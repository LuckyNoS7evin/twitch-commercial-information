<template>
  <div class="home">
    <button @click="runAd(30)">Run 30s ad</button>
    <button @click="runAd(90)">Run 90s ad</button>
    <button @click="fakeAd(30)">Run fake 30s ad</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
  }
}
</script>
