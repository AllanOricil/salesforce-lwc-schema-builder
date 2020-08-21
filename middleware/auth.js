export default function ({ redirect, store, $lsbCookies }) {
  const accessToken =
    $lsbCookies.get('access_token') ||
    store.state.auth.access_token ||
    (window.localStorage.getItem('lightning-schema-builder')
      ? JSON.parse(window.localStorage.getItem('lightning-schema-builder')).auth
          .access_token
      : null)

  if (!accessToken) redirect('/login')
}
