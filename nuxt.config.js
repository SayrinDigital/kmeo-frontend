const pkg = require('./package')
import axios from 'axios'

module.exports = {
  mode: 'universal',
  optimization: {
    minimize: false
  },

  /*
  ** Headers of the page
  */


  head: {
    title: 'Pets Chile | Tienda Online',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700|Work+Sans:400,800' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
    css: ['uikit/dist/css/uikit.css', '@/assets/style.scss' ,'swiper/dist/css/swiper.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/uikit.js', ssr: false },{ src: '~/plugins/vue-filters.js', ssr: true },
    { src: '~/plugins/localStorage.js', ssr: false },{src: '~/plugins/swiper.js', ssr: false }
    ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],


  serverMiddleware: ['~/api/index.js'],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'https://say.petschile.cl'
    // See https://github.com/nuxt-community/axios-module#options
  },

  generate: {
    routes: function () {
      return axios.get('https://say.petschile.cl/categorias')
      .then((res) => {
        return res.data.map((categoria) => {
          return '/categorias/' + categoria.id
        })
      })
    }
  },

  /*
  ** Build configuration
  */
  build: {

    vendor: [
      'gsap',
    ],
    extend(config, ctx) {
      config.node = {
              console: true,
              fs: 'empty',
              net:'empty',
              tls:'empty',
            }
    }
  }
}
