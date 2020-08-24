require('dotenv').config()
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  loading: false,

  generate: {
    fallback: true,
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    {
      src:
        '../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css',
      lang: 'css',
    },
    {
      src:
        '../node_modules/@allanoricil/schema-builder/assets/css/salesforceFont.css',
      lang: 'css',
    },
    {
      src: '../node_modules/@allanoricil/schema-builder/assets/css/grid.css',
      lang: 'css',
    },
    {
      src: '~assets/globalcss.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '~/plugins/vuex-persist',
      ssr: false,
    },
    {
      src: '~/plugins/vuetening',
      ssr: false,
    },
    {
      src: '~/plugins/vuelidate',
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/dotenv', { systemvars: true }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // '@nuxtjs/auth',
    '@nuxtjs/proxy',
    [
      'cookie-universal-nuxt',
      {
        alias: 'lsbCookies',
      },
    ],
  ],

  pwa: {
    manifest: {
      short_name: 'LSB',
      name: 'Lightning Schema Builder',
      description: 'Create Salesforce Objects with a better User Experience.',
      start_url: '/builder',
      theme_color: '#202124',
      background_color: '#202124',
      display: 'standalone',
    },
    icons: {
      purpose: ['maskable', 'any'],
    },
  },

  auth: {
    strategies: {
      auth0: {
        domain: 'dev-k3r8xate.us.auth0.com',
        client_id: 'RybsEetqMqttIM1FPvcWzLnhjFPyhwta',
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': process.env.SALESFORCE_SERVICE_API,
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    filenames: {
      chunk: '[name].js',
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        if (ctx.isDev && ctx.isClient) {
          config.devtool = '#source-map'
        }

        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
