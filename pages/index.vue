<template>
<div>

  <div>
    <div class="uk-section">
      <div class="uk-container">
        <div class="uk-child-width-1-2@s uk-flex uk-flex-middle" uk-grid>
           <div>
             <div>
               <h1 class="text-responsive">{{ interfaces.tituloencabezado }}</h1>
               <p class="uk-width-4-5@m uk-margin">{{ interfaces.descripcion }}</p>
             </div>
           </div>
           <div>
             <div>
               <!--<img uk-img src="/assets/header.png" alt="">-->
             </div>
           </div>
        </div>
      </div>
    </div>

      <section class="uk-section uk-section-small">
        <div uk-grid>
          <div class="uk-width-4-5@m">
            <div class="uk-position-relative">
              <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="autoplay: true; autoplay-interval: 2000">

                <ul class="uk-slideshow-items">
                  <li v-for="header in headers">
                    <a :href="header.link" class="imagen-link-container">
                      <img v-if="header.imagen" uk-img :src="baseUrl + header.imagen.url" alt="" uk-cover>
                    </a>
                  </li>
                </ul>

                <div class="uk-position-bottom-right arrows-sliders-a">
                  <a class=" uk-position-small uk-hidden-hover uk-link" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                  <a class="uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
                </div>

              </div>
              <!--<div class="uk-position-top-left link-container uk-width-4-5@m uk-text-right@m uk-text-left">
                <nuxt-link class="uk-button-text" to="/faq">Visíta nuestra seccion de preguntas y respuestas. <span class="uk-icon uk-margin-small-left" uk-icon="icon: arrow-right;"></span> </nuxt-link>
              </div>-->
            </div>
          </div>
          <div class="uk-width-1-5@m">
            <div class="uk-text-center">
              <p>Lo Nuevo De La Temporada <span class="uk-margin-small-left uk-icon" uk-icon="icon: arrow-down;"></span> </p>
            </div>
          </div>
        </div>
      </section>
      <section class="uk-section uk-section-large uk-background-cover"  uk-img data-src="/assets/bg-b.svg" v-if="hlcategory">
        <div class="uk-container">
          <div class="uk-margin">
            <h1><span class="text-highlight">Destacados</span></h1>
            <p class="uk-margin uk-width-large@m">Productos más destacados por su oferta y basado en la búsqueda de nuestros clientes.</p>
          </div>
        </div>
        <div class="uk-section padding-slider">
          <div v-if="hlcategory.producto" uk-slider="center: true; autoplay: true; autoplay-interval: 1500;">
            <div class="uk-slider-container">
              <ul class="uk-slider-items uk-child-width-1-6@l uk-child-width-1-4@m uk-child-width-1-2 uk-grid uk-grid-medium">
                <li v-for="product in hlcategory.producto" :key="hlcategory.producto.id">
                    <Product :product="product"></Product>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="uk-section uk-background-cover"  id="categories-section" uk-img data-src="/assets/bg-a.svg">

        <div class="uk-container uk-container-large">

          <div class=" uk-section">
            <div class="uk-container">
              <h1><span class="text-highlight">Categorías</span></h1>
              <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
            </div>
          </div>
          </div>

         <div class="uk-container">

          <div class="uk-section" >
            <div class="uk-position-relative uk-visible-toggle " tabindex="-1">
              <div uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div > div ; delay: 200;" class="uk-child-width-1-2@m uk-grid-medium uk-grid" uk-grid>
                    <Category v-for="category in categories" :key="category.id" :category="category"></Category>
               </div>
            </div>
          </div>

          </div>

      </section>
      <section class="uk-section" >
        <div class="uk-container">

          <div class="uk-section">
            <div class="uk-child-width-1-2@m uk-flex uk-flex-middle" uk-grid>
              <div>
                <div>
                  <h1 class="uk-text-capitalize"><span class="text-highlight">últimos Productos</span></h1>
                  <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="uk-section product-section">
            <div class="uk-grid uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2 uk-grid-match" uk-grid>
              <div v-for="product in randomizedProducts" :key="product.id">
                <Product :product="product"></Product>
              </div>

            </div>
          </div>
        </div>

      </section>

      <div class="uk-position-fixed uk-position-bottom-center">
       <div class="uk-position-relative">
         <div ref="cart"  id="cart-icon">
           <span class="uk-icon" uk-icon="icon: cart; ratio: 3;"></span>
         </div>
          <div ref="bubblePulse" class="bubble-pulse"></div>
       </div>
  </div>

 </div>

 <div ref="loader" class="fixed-loader uk-position-fixed uk-height-viewport uk-width-1-1">
 </div>

 <div class="uk-position-center uk-position-fixed loader-logo">
   <img ref="logo_loader" width="100px" src="/logo.svg" alt="">
 </div>

</div>
</template>

<script>
import axios from '~/plugins/axios'
import Product from '~/components/Product'
import Category from '~/components/Category'
import { TimelineLite } from 'gsap'

export default {
  data() {
    return {
      baseUrl: "https://say.kmeo.cl/",
      timeline: null,
      loadertl: null
    }
  },
  components: {
    Product,
    Category
  },
  mounted(){

    var vm = this

    if (process.browser) {
    this.timeline = new TimelineLite({ paused: true })
    this.loadertl = new TimelineLite({ paused: true })
    this.cartAnimation()
   }
   this.$nuxt.$on('START_ANIMATION',function(){
     vm.startAnimation()
   })

   if (process.browser) {
  window.onNuxtReady((app) => {
    this.disolveLoader()
  })
}

  },
  computed: {
     randomizedProducts: function(){
       return this.products.sort(function(){return 0.5 - Math.random()});
     }
  },
  methods: {

   disolveLoader: function(){
       const { loader } = this.$refs
       const { logo_loader } = this.$refs

       this.loadertl.to(loader, 2, {
         scaleY: 0,
        opacity: 1,
        transformOrigin:"50% 0%",
       ease: Power4.easeInOut
      })

      this.loadertl.to(logo_loader, 2, {
        scale: 1.1,
       opacity: 0,
       transformOrigin:"50% 50%",
      ease: Power4.easeInOut,
      display: 'none'
      },
      '-=2'
    )

      this.loadertl.play()
   },

    cartAnimation: function(){

       const { cart } = this.$refs
       const { bubblePulse } = this.$refs

       this.timeline.to(cart, .5, {
        scale: 1,
        opacity: 1,
        x:0,
        y:-80,
       ease: Power4.easeInOut
      })

      this.timeline.to(
            bubblePulse,
            0.5,
            {
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
         x:0,
         y:80,
       ease: Power4.easeInOut,
        display: 'none'
      })

      this.timeline.to(
       bubblePulse,
       1.1,
       {
         scale: 3,
         opacity: 0,
         ease: Expo.easeOut,
         display: 'none'
       },
       '-=1.2'
     )

    },
    startAnimation: function(){
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
