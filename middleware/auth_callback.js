export default function ({ redirect, route, store }) {
  console.log(route)
  if (route.query.access_token) {
    store.commit('auth/SET_AUTH_INFO', {
      access_token: route.query.access_token,
      user_id: route.query.user_id,
      instance_url: route.query.instance_url,
      organization_id: route.query.organization_id,
    })
    route.query = undefined
    store.dispatch('auth/getUserInfo').then(() => {
      redirect('/builder')
    })
  }
}
