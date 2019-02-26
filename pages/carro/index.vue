<template>

  <div >

    <div  z-index="0" class="uk-position-relative uk-section uk-section-large category-header uk-background-cover" uk-img data-src="https://images.unsplash.com/photo-1484920274317-87885fcbc504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80">
     <div class="overlay uk-position-cover"></div>
     <div class="uk-section uk-section-small uk-position-relative">
       <div class="uk-container">
         <p>Mis Productos</p>
         <h1 class="text-responsive">Carro de Compras</h1>
       </div>
     </div>
    </div>


    <section class="uk-section">
      <div class="uk-container">
        <div>
          <h1 class="uk-text-capitalize"><span class="text-highlight">Tienes {{ numberOfItems }} Productos</span></h1>
          <p class="uk-text-capitalize uk-width-large@m uk-margin">Revisa tu lista de compras antes de proceder a pagar.</p>
          <div class="uk-margin">
            <button class="uk-button uk-button-large style-a uk-margin-top" type="button" @click="uploadOrder()"><span uk-icon="icon: cart" class="uk-icon uk-margin-small-right"></span> Generar Orden</button>
            <button class="uk-button uk-button-large uk-margin-top style-a danger-button" type="button" @click="emptyCart()"><span uk-icon="icon: trash" class="uk-icon uk-margin-small-right"></span> Vaciar Carro</button>
          </div>
        </div>
        <div class="uk-section">
          <div class="uk-grid uk-grid-medium uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1" uk-scrollspy="cls: uk-animation-fade; target: > div > .product-container; delay: 400; repeat: true" uk-grid>
            <div v-for="product in selectedProducts">
              <Product :product="product"></Product>
            </div>

          </div>
        </div>
      </div>

    </section>
  </div>

</template>

<script>

import Product from '~/components/Cart/Product'
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {

  data(){
    return{
       baseUrl: ""
    }
  },
  components: {
    Product
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },

  computed: {
    selectedProducts() {
      return this.$store.getters['cart/items']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    },
    price() {
      return this.$store.getters['cart/price']
    },
  },
  methods: {
    uploadOrder(){
      this.$router.push('/carro/checkout')
    },
    ...mapMutations({
   emptyCart: 'cart/emptyList'
 })
  }

}
</script>
