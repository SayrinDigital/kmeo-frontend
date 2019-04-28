<template>
<div>

  <div>
    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="min-height: 350">

    <ul class="uk-slideshow-items">
       <li v-for="head in headers" :key="head.id">
          <section v-if="head.imagen" class="uk-background-cover uk-section uk-section-large" :style="'background-image: url('+baseUrl + head.imagen.url+');'">
            <div class="uk-container">
              <h2 class="uk-width-large main-header">{{ head.titulo }}</h2>
              <p class="desc uk-width-large">{{ head.descripcion }}</p>
              <div class="uk-margin">
                <a class="uk-button normal" :href="head.link">Ver Más <span class="uk-icon uk-margin-small-left" uk-icon="arrow-right"></span> </a>
              </div>
            </div>
          </section>
        </li>
    </ul>

    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>

</div>


    <section class="uk-section uk-background-cover" v-if="hlcategory">
      <div class="uk-container">
        <h2 class="normal-title">Destacados</h2>
        <p class="uk-width-large@m">Productos más destacados por su oferta y basado en la búsqueda de nuestros clientes.</p>
      </div>
      <div class="uk-margin">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-if="product.mostrar" v-for="product in hlcategory.producto" :key="product.id">
                <Product :product="product"></Product>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="uk-section">
      <div class="uk-container">
        <h2 class="normal-title">Categorías</h2>
        <p class="uk-width-large@m">Encuentra El Producto A Tu Medida.</p>
        <div class="uk-margin">
          <div  class="uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1 uk-grid-medium uk-grid" uk-grid>
            <Category v-for="category in categories" :key="category.id" :category="category"></Category>
          </div>
        </div>
      </div>
    </section>



    <section class="uk-section">
      <div class="uk-container">

        <h2 class="normal-title">Últimos Productos</h2>
        <p class="uk-width-large@m">Encuentra las últimas tendencias que tenemos en nuestro stock.</p>

        <div class="uk-section product-section">
          <div class="uk-grid-small uk-grid uk-child-width-1-5@l uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-match" uk-grid>
            <div v-if="product.mostrar" v-for="product in randomizedProducts" :key="product.id">
              <Product :product="product"></Product>
            </div>

          </div>
        </div>
      </div>

    </section>

    <div class="uk-position-fixed uk-position-bottom-center">
      <div class="uk-position-relative">
        <div ref="cart" id="cart-icon">
          <span class="uk-icon" uk-icon="icon: cart; ratio: 3;"></span>
        </div>
        <div ref="bubblePulse" class="bubble-pulse"></div>
      </div>
    </div>

  </div>

  <div ref="loader" class="fixed-loader uk-position-fixed uk-height-viewport uk-width-1-1">
  </div>

  <div class="uk-position-center uk-position-fixed loader-logo">
    <img ref="logo_loader" width="100px" src="/logopink.svg" alt="">
  </div>

</div>
</template>

<script>
import axios from '~/plugins/axios'
import Product from '~/components/Product'
import Category from '~/components/Category'
import {
  TimelineLite
} from 'gsap'

export default {
  data() {
    return {
      baseUrl: "https://say.petschile.cl/",
      timeline: null,
      loadertl: null,
      swiperOption: {
        spaceBetween: 20,
        centeredSlides: false,
        slidesPerView: 5,
        slidesOffsetBefore: 40,
        slidesOffsetAfter: 40,
        autoplay: {
            delay: 500,
            disableOnInteraction: false
          },
        pagination: {
          el: '.swiper-pagination',
        },
        breakpoints: {
          1200: {
            slidesPerView: 5,
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 40,
          },
          960: {
            slidesPerView: 4,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesOffsetBefore: 15,
            slidesOffsetAfter: 15,
          }
        }
      }
    }
  },
  components: {
    Product,
    Category
  },
  mounted() {

    var vm = this

    if (process.browser) {
      this.timeline = new TimelineLite({
        paused: true
      })
      this.loadertl = new TimelineLite({
        paused: true
      })
      this.cartAnimation()
    }
    this.$nuxt.$on('START_ANIMATION', function() {
      vm.startAnimation()
    })

    this.disolveLoader()

    if (process.browser) {
      window.onNuxtReady((app) => {
        this.disolveLoader()
      })
    }

  },
  computed: {
    randomizedProducts: function() {
      return this.products.sort(function() {
        return 0.5 - Math.random()
      });
    }
  },
  methods: {

    disolveLoader: function() {
      const {
        loader
      } = this.$refs
      const {
        logo_loader
      } = this.$refs

      this.loadertl.to(loader, 2, {
        scaleY: 0,
        opacity: 1,
        transformOrigin: "50% 0%",
        ease: Power4.easeInOut
      })

      this.loadertl.to(logo_loader, 2, {
          scale: 1.1,
          opacity: 0,
          transformOrigin: "50% 50%",
          ease: Power4.easeInOut,
          display: 'none'
        },
        '-=2'
      )

      this.loadertl.play()
    },

    cartAnimation: function() {

      const {
        cart
      } = this.$refs
      const {
        bubblePulse
      } = this.$refs

      this.timeline.to(cart, .5, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: -80,
        ease: Power4.easeInOut
      })

      this.timeline.to(
        bubblePulse,
        0.5, {
          scale: 0.9,
          opacity: 1,
          y: -80
        },
        '-=0.5'
      )

      this.timeline.to(cart, .2, {
        scale: 1.01,
        y: -91,
        ease: Power4.easeInOut
      })
      this.timeline.to(cart, .2, {
        scale: 1,
        ease: Power4.easeInOut
      })
      this.timeline.to(cart, .5, {
        opacity: 0,
        scale: 1,
        x: 0,
        y: 80,
        ease: Power4.easeInOut,
        display: 'none'
      })

      this.timeline.to(
        bubblePulse,
        1.1, {
          scale: 3,
          opacity: 0,
          ease: Expo.easeOut,
          display: 'none'
        },
        '-=1.2'
      )

    },
    startAnimation: function() {
      this.timeline.restart()
    }
  },
  async asyncData({
    params
  }) {
    // We can use async/await ES6 feature
    const interfaces = await axios.get(
      '/interfazs', {
        params: {
          _limit: 1
        }
      }
    );
    const headers = await axios.get(
      '/encabezados'
    );

    const products = await axios.get(
      '/productos/', {
        params: {
          _limit: 20,
          _sort: "id:DESC"
        }
      }
    );

    const categories = await axios.get(
      '/categorias'
    );

    const hlcategory = await axios.get(
      '/categorias', {
        params: {
          nombre: "Destacados"
        }
      }
    );

    return {
      interfaces: interfaces.data[0],
      headers: headers.data,
      products: products.data,
      categories: categories.data,
      hlcategory: hlcategory.data[0],
      hlproducts: hlcategory.data.producto
    };
  },
}
</script>
