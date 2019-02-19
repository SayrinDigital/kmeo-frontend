<template>

  <div >

    <section class="uk-section header-container  uk-width-4-5@m background-green">
      <div class="uk-section uk-section-large">
        <div class="say-padding-left-container">
          <div class="uk-container uk-container-large">
            <p class="uk-width-2-5@m">Mis Productos</p>
            <h1 class="text-responsive">Carro de Compras</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="uk-section uk-section-large">
      <div class="uk-container uk-container-large">
        <div>
          <h1 class="uk-text-capitalize"><span class="text-highlight">Tienes {{ numberOfItems }} Productos</span></h1>
          <p class="uk-text-capitalize uk-width-large@m uk-margin">Revisa tu lista de compras antes de proceder a pagar.</p>
          <div class="uk-margin">
            <button class="uk-button uk-button-large style-a" type="button" @click="uploadOrder()">Generar Orden</button>
          </div>
        </div>
        <div class="uk-section">
          <div class="uk-grid-medium uk-child-width-1-4@s" uk-scrollspy="cls: uk-animation-fade; target: > div > .product-container; delay: 400; repeat: true" uk-grid>
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
  }

}
</script>
