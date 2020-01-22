import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import Home from '@/views/Home'
import Settings from '@/views/Settings'
import Overlay from '@/views/Overlay'
import OidcCallback from '@/views/OidcCallback'
import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: './',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: 'login'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/overlay/:login',
      name: 'overlay',
      component: Overlay.vue,
      meta: {
        layout: 'overlay'
      }
    },
    {
      path: '/oidc-callback',
      name: 'oidcCallback',
      component: OidcCallback,
      meta: {
        layout: 'blank'
      }
    },
    {
      path: '*',
      component: PageNotFound,
      meta: {
        layout: 'blank'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (store.getters.authUser != null) {
      next()
    } else {
      router.push({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
