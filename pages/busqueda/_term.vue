<template>
<div>

  <div  z-index="0" class="uk-position-relative uk-section uk-section-large category-header uk-background-cover" uk-img data-src="https://images.unsplash.com/photo-1484920274317-87885fcbc504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80">
   <div class="overlay uk-position-cover"></div>
   <div class="uk-section uk-section-small uk-position-relative">
     <div class="uk-container">
       <p>Búsqueda</p>
       <h1 class="text-responsive">Resultados</h1>
     </div>
   </div>
  </div>

  <section class="uk-section" v-if="products">
    <div class="uk-container">

        <div>
          <div>
            <h1 class="uk-text-capitalize"><span class="text-highlight">últimos Productos</span></h1>
            <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
          </div>
          <div class="uk-section">
            <div class="uk-grid-medium uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-2 uk-grid" uk-scrollspy="cls: uk-animation-fade; target: > div > .product-container; delay: 400; repeat: true" uk-grid>
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
