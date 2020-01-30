<template>
  <overlay/>
</template>

<script>
import { mapActions } from 'vuex'
import Overlay from '@/components/Overlay'

export default {
  components: {
    Overlay
  },
  methods: {
    ...mapActions([
      'loadOverlay'
    ])
  },
  mounted () {
    this.loadOverlay(this.$route.params.login)
  }
}
</script>
