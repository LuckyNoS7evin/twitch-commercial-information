// import '@/plugins/vue-oidc-client/polyfill.js'
import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import mainAuth from '@/auth'

import Default from '@/layouts/Default'
import Overlay from '@/layouts/Overlay'
import vuetify from './plugins/vuetify'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitch, faDiscord, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTwitch)
library.add(faDiscord)
library.add(faTwitter)
library.add(faLinkedin)
library.add(faMoneyBill)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('default-layout', Default)
Vue.component('overlay-layout', Overlay)

Vue.config.productionTip = false

mainAuth.startup().then(ok => {
  if (ok) {
    new Vue({
      store,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
