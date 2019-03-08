<template>

<div class="uk-height-1-1" >
  <div class="uk-height-1-1" >
    <div :uk-tooltip="product.descripcion" class="cursor-pointer product-container uk-height-1-1  uk-transition-toggle uk-position-relative" v-if="product.fotos">
      <div class="content uk-height-1-1">
        <div class="uk-inline-clip">
          <img v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" alt="">
          <img class="uk-transition-scale-up uk-position-cover" v-if="product.fotos.extra" :src="baseUrl + product.fotos.extra.url" alt="">
        </div>
        <div class="uk-card-body">
          <div class="brand">
            <p v-if="product.marca.nombre" >{{ product.marca.nombre }}</p>
            <p class="uk-visible@s" v-else>Novedades</p>
          </div>
          <h5 class="product-title">{{ product.nombre }}</h5>
          <div class="uk-margin-small">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-expand@s">
                <div>
                  <p class="price-strike">{{ product.precioreferencial | currency('$', 0)}} CLP</p>
                  <p class="price">{{ product.preciofinal | currency('$', 0)}} CLP</p>
                </div>
              </div>
              <div class="uk-width-auto@s">
                <div class=" uk-text-right">
                  <a @click="addProduct(product)" uk-tooltip="Agregar Al Carro" class="addtocartbutton uk-icon-button uk-icon-button-b" uk-icon="cart"></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-position-top-right">
          <div class="uk-overlay">
            <div class="percentage-container">
              <p>{{ discountPercetange }} %</p>
            </div>
          </div>
        </div>


             <div class="box-hover-product" ref="box">
               <img class="uk-border-rounded" v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" alt="">
             </div>

      </div>
    </div>

        <div class="drop-upper uk-visible@s" uk-drop=" offset: 30; pos: right-center; delay-hide: 0; animation: uk-animation-slide-top-small; duration: 300">
            <div class="dropdown">
              <div>
               <img class="uk-border-rounded" v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" alt="">
                <p>{{ product.descripcion }}</p>
              </div>
             </div>
        </div>
  </div>
</div>

</template>

<script>

import { TimelineLite } from 'gsap'

export default {
  data(){
    return{
      baseUrl: "https://say.kmeo.cl",
      timeline: null,
      windowHeight: null
    }
  },
  components: {

  },
  mounted(){



    if (process.browser) {
    this.timeline = new TimelineLite({ paused: true })
   }


   this.$nextTick(function () {
       this.getWindowHeight()
     })
     window.addEventListener('resize', this.getWindowHeight)

  },
  props: ['product'],
  computed:{
     discountPercetange: function(){
       var decrease = this.$props.product.precioreferencial - this.$props.product.preciofinal
       return Math.round((decrease / this.$props.product.precioreferencial) * 100)
     }
  },
  methods: {
    getWindowHeight (event) {
     this.windowHeight = document.documentElement.clientHeight
   },
    cartAnimation: function(){

       const { box } = this.$refs
       var rect = box.getBoundingClientRect()
       var height = box.clientHeight
       var width = box.clientWidth
       var centeredBottom = (document.documentElement.clientWidth/2) - (rect.width + rect.x) + 120

       this.timeline.to(box, .45, {
         opacity: 0.5,
         scale: 1.1,
         y: -90,
         ease: Power3.easeOut,
         transformOrigin:"50% 50%",
         visibility: 'visible'
        })

        this.timeline.to(box, 1, {
          opacity: 1,
          x: centeredBottom,
          y: 800,
          ease: Power4.easeInOut,
          scale: 0,
          transformOrigin:"50% 50%",
          display: 'none'
         })

    },
    startAnimation: function(){
       this.cartAnimation()
       this.timeline.restart()
       this.$nuxt.$emit('START_ANIMATION');
    },
    addProduct: function(product){
      this.startAnimation()
      this.$store.commit('cart/add', product)
    }
  }
}
</script>

<style lang="css">
</style>
