<template>
<div>

  <section class="uk-section header-container  uk-width-4-5@m background-soft" >
    <div class="uk-section uk-section-large">
      <div class="say-padding-left-container">
        <div class="uk-container uk-container-large">
          <p class="uk-width-2-5@m">Búsqueda</p>
          <h1 class="text-responsive">Resultados</h1>
        </div>
      </div>
    </div>
  </section>

  <section class="uk-section uk-section-large" v-if="products">
    <div class="uk-container uk-container-large">

        <div>
          <div>
            <h1 class="uk-text-capitalize"><span class="text-highlight">últimos Productos</span></h1>
            <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
          </div>
          <div class="uk-section">
            <div class="uk-grid-medium uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1" uk-scrollspy="cls: uk-animation-fade; target: > div > .product-container; delay: 400; repeat: true" uk-grid>
              <div v-for="product in products" :key="product.id">
                <Product :product="product"></Product>
              </div>

            </div>
          </div>
        </div>
      </div>

  </section>
</div>
</template>

<script>
import axios from 'axios'
import Product from '~/components/Product'

export default {
  data() {
    return {
      category: null,
      products: [],
      baseUrl: "",
      term: null,
      brands: [],
      filterbrand: "Todas"
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  components: {
    Product
  },
  mounted() {
    this.term = this.$route.params.term
    //this.loadProducts()
    this.loadProducts()
  },
  methods: {

    loadProducts: function() {
      axios
        .get(this.baseUrl + '/productos',{
          params: {
            "nombre_contains" : this.term
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.products = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
  },
}
</script>
