<template>

  <div class="uk-position-relative product-container">
    <nuxt-link :to="{ name: 'categorias-producto-id', params: { id: product.id }}">
      <img v-if="product.imagen" :src="baseUrl + product.imagen.url" uk-img alt="">
    </nuxt-link>
    <div class="uk-position-top-left">
      <div class="badge-container">
        <p>{{ discountPercetange }}%</p>
      </div>
    </div>
    <div class="uk-margin-top uk-margin-bottom">
      <h3>{{ product.nombre }}</h3>
      <h5 v-if="product.marca">{{ product.marca.nombre }}</h5>
      <p class="text-strike">{{ product.precioreferencial | currency('$', 0) }} CLP</p>
      <h4>{{ product.preciofinal | currency('$', 0) }} CLP</h4>
    </div>
  </div>

</template>

<script>


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
       return Math.round((decrease / this.$props.product.precioreferencial) * 100)
     }
  }
}
</script>

<style lang="css">
</style>
