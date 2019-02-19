<template>
  <no-ssr>
<div class="uk-background-default" v-if="product">
  <section class="header-container">
    <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
      <div class="uk-background-cover" v-if="product.imagen" uk-img :data-src="baseUrl + product.imagen.url" uk-height-viewport></div>
      <div class="uk-padding-large">
        <div class="uk-width-3-5@m uk-margin-auto">

          <h1>{{ product.nombre }} | Detalles</h1>
          <p class="uk-margin">{{ product.descripcion }}</p>
          <p class="uk-margin"><span class="text-bold">Precio:</span> {{ product.preciofinal | currency('$', 0) }} CLP</p>
          <hr class="uk-hr">
          <form class="uk-form-stacked uk-text-right">

            <div class="uk-margin">
              <button class="uk-button uk-button-large style-a" @click="addToCart(product)" type="button">Agregar al Carro</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </section>
</div>
</no-ssr>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      product: null,
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.id = this.$route.params.id
    this.loadProduct()
  },
  computed: {
   dishes() {
     return this.$store.getters['dishes/list']
   },
   selectedDishes() {
     return this.$store.getters['cart/items']
   },
   price() {
     return this.$store.getters['cart/price']
   },
   numberOfItems() {
     return this.$store.getters['cart/numberOfItems']
   }
 },
  methods: {
    loadProduct: function() {
      axios
        .get(this.baseUrl + '/productos/' + this.id)
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data)
          this.product = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>
