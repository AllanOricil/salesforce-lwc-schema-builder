export default {
  getGlobalDescribe({ commit, rootState }) {
    const sobjectsResponse = this.$axios.$get(
      `/api/salesforce/v${process.env.SALESFORCE_API_VERSION}/sobjects/`,
      {
        headers: {
          authorization: `Bearer ${
            rootState.auth.access_token ||
            window.$nuxt.$lsbCookies.get('access_token')
          }`,
        },
      }
    )

    sobjectsResponse.then((response) => {
      commit('SET_SOBJECTS', response)
    })

    return sobjectsResponse
  },
  getSobjectDescribe({ commit, rootState }, sobject) {
    const request = this.$axios.$get(
      `/api/salesforce/v${process.env.SALESFORCE_API_VERSION}/sobjects/${sobject}`,
      {
        headers: {
          authorization: `Bearer ${
            rootState.auth.access_token ||
            window.$nuxt.$lsbCookies.get('access_token')
          }`,
        },
      }
    )
    request.then((response) => {
      commit('SET_SOBJECT', response)
    })
    return request
  },
}
