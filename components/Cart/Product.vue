<template>
<div class="uk-height-1-1"  v-if="product">

  <div  class="cursor-pointer uk-position-relative product-container uk-height-1-1" v-if="product.fotos">

    <div class="content uk-height-1-1">
      <div>
        <img v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" alt="">
      </div>
      <div class="uk-card-body">
        <div class="brand">

        </div>
        <h5>{{ product.nombre }}</h5>
        <div>
          <!--<p class="price-strike">{{ product.precioreferencial | currency('$', 0)}} CLP</p>-->
          <p class="price">{{ product.preciofinal | currency('$', 0)}} CLP</p>
          <p><span class="uk-icon uk-margin-small-right" uk-icon="icon: grid;"></span>{{ product.quantity }} u.</p>
        </div>
        <div class="uk-margin uk-text-right">
          <button type="button" uk-tooltip="Agregar unidad" class="uk-button cart-add-button" @click="addToCart(product)"><span class="uk-icon" uk-icon="icon: plus"></span></button>
          <button type="button" uk-tooltip="Quitar unidad"class="uk-button cart-remove-button" @click="removeFromCart(product)"><span class="uk-icon" uk-icon="icon: trash"></span></button>
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

  

</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      baseUrl: "https://say.kmeo.cl"
    }
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
