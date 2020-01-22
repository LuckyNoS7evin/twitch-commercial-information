import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import Default from '@/layouts/Default'
import Login from '@/layouts/Login'
import Blank from '@/layouts/Blank'
import Overlay from '@/layouts/Overlay'

Vue.component('default-layout', Default)
Vue.component('login-layout', Login)
Vue.component('blank-layout', Blank)
Vue.component('overlay-layout', Overlay)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
