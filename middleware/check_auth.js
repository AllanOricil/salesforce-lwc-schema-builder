export default function ({ redirect, route, store }) {
  if (store.state.auth.loggedIn) redirect('/builder')
}
