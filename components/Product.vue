<template>

<div>
  <div>
    <div :uk-tooltip="product.descripcion" class="cursor-pointer product-container   uk-transition-toggle uk-position-relative" v-if="product.fotos">

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
          <h5>{{ product.nombre }}</h5>
          <div class="uk-margin">
            <div uk-grid>
              <div class="uk-width-expand">
                <div>
                  <p class="price-strike">{{ product.precioreferencial | currency('$', 0)}} CLP</p>
                  <p class="price">{{ product.preciofinal | currency('$', 0)}} CLP</p>
                </div>
              </div>
              <div class="uk-width-auto">
                <div>
                  <a @click="startAnimation" uk-tooltip="Agregar Al Carro" class="addtocartbutton uk-icon-button" uk-icon="cart"></a>
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

let TweenLite;
if (process.browser) {
  TweenLite = require("gsap/TweenLite");
}

export default {
  data(){
    return{
      baseUrl: "https://say.kmeo.cl",
      timeline: null
    }
  },
  components: {

  },
  props: ['product'],
  computed:{
     discountPercetange: function(){
       var decrease = this.$props.product.precioreferencial - this.$props.product.preciofinal
       return Math.round((decrease / this.$props.product.precioreferencial) * 100)
     }
  },
  methods: {
    openModal: function(){
       this.$modal.show('modal-product-card', { product: this.product })
    },
    cartAnimation: function(){

    }
  }
}
</script>

<style lang="css">
</style>
