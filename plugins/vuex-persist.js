import VuexPersistence from 'vuex-persist'

export default ({ store, isHMR }) => {
  if (isHMR) return

  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'lightning-schema-builder',
    }).plugin(store)
  })
}
