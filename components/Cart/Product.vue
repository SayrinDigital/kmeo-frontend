<template>
<div>

  <no-ssr>
    <div class="uk-position-relative product-container" v-if="product.fotos">
        <div class="uk-position-relative">
          <div class="uk-inline-clip uk-transition-toggle" tabindex="0" v-if="baseUrl">
              <img class="uk-transition-scale-up uk-transition-opaque" v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" uk-img alt="">
          </div>
          <div class="uk-position-top-right">
            <div class="badge-container">
              <p>{{ product.quantity }} u.</p>
            </div>
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
        <p>{{ product.preciofinal | currency('$', 0) }} CLP</p>
      </div>
      <div class="uk-margin uk-text-right">
        <button type="button" class="uk-button action-button" @click="addToCart(product)"><span class="uk-icon" uk-icon="icon: plus"></span></button>
            <button type="button" class="uk-button danger-button" @click="removeFromCart(product)"><span class="uk-icon" uk-icon="icon: trash"></span></button>
      </div>
    </div>
  </no-ssr>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      baseUrl: ""
    }
  },
  beforeMount(){
      this.baseUrl = this.$axios.defaults.baseURL
  },
  props: ['product'],
  computed:{
     discountPercetange: function(){
       var decrease = this.$props.product.precioreferencial - this.$props.product.preciofinal
       console.log(decrease)
       return Math.round((decrease / this.$props.product.precioreferencial) * 100)
     }
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>

<style lang="css">
</style>
