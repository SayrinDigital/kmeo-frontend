<template>

  <div class="uk-position-relative product-container" v-if="product.fotos">

    <div @click="openModal()">
      <div class="uk-inline-clip uk-transition-toggle" tabindex="0" v-if="baseUrl">
          <img class="uk-transition-scale-up uk-transition-opaque cursor-pointer" v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" uk-img alt="">
      </div>
    </div>
    <div class="uk-position-top-left">
      <div class="badge-container">
        <p>{{ discountPercetange }}%</p>
      </div>
    </div>
    <div class="uk-margin-top uk-margin-bottom">
      <h3>{{ product.nombre }}</h3>
      <h5 v-if="product.marca">{{ product.marca.nombre }}</h5>
      <p class="text-strike">{{ product.precioreferencial | currency('$', 0)}} CLP</p>
      <h4>{{ product.preciofinal | currency('$', 0)}} CLP</h4>
    </div>
  </div>

</template>

<script>


export default {
  data(){
    return{
      baseUrl: "https://say.kmeo.cl"
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
    }
  }
}
</script>

<style lang="css">
</style>
