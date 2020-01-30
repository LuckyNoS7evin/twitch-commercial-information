<template>
  <v-app class="app">
    <v-app-bar clipped-left app dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>No Preroll Service</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" v-if="loggedIn"><font-awesome-icon :style="{ marginRight: '5px' }" :icon="['fab','twitch']"/>Logout</v-btn>
      <v-btn @click="login" v-else><font-awesome-icon :style="{ marginRight: '5px' }" :icon="['fab','twitch']"/>Login</v-btn>
    </v-app-bar>
    <v-navigation-drawer clipped v-model="drawer" app>
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <slot />
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2020 LuckyNoS7evin</span>
      <v-spacer></v-spacer>
      <v-btn href="https://twitch.tv/luckynos7evin" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','twitch']"/></v-btn>
      <v-btn href="https://twitter.com/TheS7evin" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','twitter']"/></v-btn>
      <v-btn href="https://www.linkedin.com/in/andy-morrell/" target="_blank" icon :style="{ fontSize: '1.5em' }"><font-awesome-icon :icon="['fab','linkedin']"/></v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import mainAuth from '@/auth'
import { twitchApi } from '@/plugins/twitch'

export default {
  name: 'Default',
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    loggedIn () {
      return mainAuth.isAuthenticated
    }
  },
  methods: {
    login () {
      mainAuth.signIn()
    },
    logout () {
      if (this.$router.currentRoute.name !== 'home') {
        this.$router.push('/').then(_ => {
          this.signOut()
        })
      } else {
        this.signOut()
      }
    },
    signOut () {
      let accessToken = mainAuth.user.access_token
      mainAuth.mgr.removeUser().then(_ => twitchApi(process.env.VUE_APP_CLIENT_ID, accessToken).revokeAccessToken())
    }
  }
}
</script>
