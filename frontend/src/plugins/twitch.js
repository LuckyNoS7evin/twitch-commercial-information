import Vue from 'vue'
import axios from 'axios'

export function twitchApi (clientId, accessToken) {
  let headers = {
    'Client-ID': clientId
  }

  if (accessToken !== undefined && accessToken !== null && accessToken !== '') {
    headers['Authorization'] = accessToken
  }

  const api = new Vue({
    data () {
      return {
        config: {
          clientId,
          accessToken,
          headers
        }
      }
    },
    methods: {
      revokeAccessToken () {
        return axios.post(`https://id.twitch.tv/oauth2/revoke?token=${this.config.accessToken}&client_id=${this.config.clientId}`)
      }
    }
  })

  return api
}
