export default {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
  async getUserInfo({ commit, state }) {
    console.log('INSIDE STORE')
    console.log(state.user_id)
    console.log(state.access_token)
    console.log(state.organization_id)
    const user = await this.$axios.$get(
      `/api/salesforce/user/${state.organization_id}/${state.user_id}`,
      {
        headers: { authorization: `Bearer ${state.access_token}` },
      }
    )
    console.log(user)
    commit('SET_USER', user)
  },
  logout({ commit }) {
    this.$axios.$get('/api/oauth2/logout')
    commit('LOGOUT')
    this.$router.push('/login')
  },
}
