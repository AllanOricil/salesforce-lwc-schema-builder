export default {
  SET_USER: (state, user) => {
    state.user = user
    state.loggedIn = user.active
  },
  SET_AUTH_INFO: (state, authInfo) => {
    state.access_token = authInfo.access_token
    state.expires_in = authInfo.expires_in
    state.user_id = authInfo.user_id
    state.instance_url = authInfo.instance_url
    state.organization_id = authInfo.organization_id
    window.$nuxt.$lsbCookies.set('access_token', authInfo.access_token, {
      path: '/',
    })
  },
  LOGOUT: (state) => {
    state.access_token = undefined
    state.user_id = undefined
    state.instance_url = undefined
    state.organization_id = undefined
    state.user = {}
    state.loggedIn = false
  },
}
