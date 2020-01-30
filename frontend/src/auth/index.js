import Vue from 'vue'
import { createOidcAuth, SignInType, LogLevel } from '@/plugins/vue-oidc-client/VueOidcAuth.js'

const loco = window.location
const appRootUrl = `${loco.protocol}//${loco.host}${process.env.BASE_URL}`

var mainOidc = createOidcAuth(
  'main',
  SignInType.Window,
  appRootUrl,
  {
    authority: 'https://id.twitch.tv/oauth2',
    client_id: process.env.VUE_APP_CLIENT_ID,
    response_type: 'id_token token',
    scope: 'openid chat:edit chat:read'// ,
    // post_logout_redirect_uri: appRootUrl
    // // test use
    // prompt: 'login',
    // login_hint: 'bob'
  },
  console,
  LogLevel.Debug
)
Vue.prototype.$oidc = mainOidc
export default mainOidc

// authority: 'https://id.twitch.tv/oauth2',
// client_id: 'z9h6nmygelzmq1wv7ipd2ebp98l4vn',
// redirect_uri: 'http://localhost:8080/oidc-callback',
// popup_redirect_uri: 'http://localhost:8080/oidc-callback',
// response_type: 'token id_token',
// scope: 'openid chat:edit chat:read',
// post_logout_redirect_uri: 'http://localhost:8080/',
// silentRedirectUri: 'http://localhost:8080/oidc-callback',
// automaticSilentRenew: false,
// filterProtocolClaims: true,
// loadUserInfo: true
