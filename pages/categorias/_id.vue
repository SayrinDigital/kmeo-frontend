<template>
<div v-if="category">

  <section class="uk-section header-container  uk-width-4-5@m background-soft" :Style=" 'background-color: ' +category.color+ ';' ">
    <div class="uk-section uk-section-large">
      <div class="say-padding-left-container">
        <div class="uk-container uk-container-large">
          <p class="uk-width-2-5@m">Categorías</p>
          <h1 v-if="category" class="text-responsive">{{ category.nombre }}</h1>
        </div>
      </div>
    </div>
  </section>

  <section class="uk-section uk-section-large" v-if="category.producto">
    <div class="uk-container uk-container-large">

      <div uk-grid>
        <div class="uk-width-1-5">
          <div>
            <h1 class="uk-text-capitalize"><span class="text-highlight">Filtrar</span></h1>
            <p class="uk-text-capitalize uk-width-large@m uk-margin">Ajusta el buscador en base a tus necesidades.</p>

                          <hr class="uk-hr">
            <div class="uk-section uk-section-small">
              <div>
                <h4>Marcas</h4>
                <div class="uk-margin-small">
                  <p><input class="uk-radio" v-model="filterbrand" type="radio" checked value="Todas" name="radio1"> Todas</p>
                </div>
                <div class="uk-margin-small" v-for="brand in brands">
                  <p><input class="uk-radio"  v-model="filterbrand" type="radio" :value="brand.nombre" name="radio1"> {{ brand.nombre }}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="uk-width-4-5">
          <div>
            <h1 class="uk-text-capitalize"><span class="text-highlight">últimos Productos</span></h1>
            <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
          </div>
          <div class="uk-section">
            <div class="uk-grid-medium uk-child-width-1-4" uk-scrollspy="cls: uk-animation-fade; target: > div > .product-container; delay: 400; repeat: true" uk-grid>
              <div v-for="product in filteredProducts" :key="category.producto.id">
                <Product :product="product"></Product>
              </div>

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
      id: null,
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
  computed: {
     filteredProducts: function(){

       var vm = this
       var filterBrand = this.filterbrand

        if(filterBrand === "Todas"){
          return this.category.producto
        }else{
          return vm.category.producto.filter(function(product) {
            if(product.marca){
              return (filterBrand === "Todas" || product.marca.nombre === filterBrand)
            }
          })
        }
     }
  },
  mounted() {
    this.id = this.$route.params.id
    //this.loadProducts()
    this.loadCategory()
    this.loadBrands()
  },
  methods: {

    loadBrands: function(){
      axios
        .get(this.baseUrl + '/marcas')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.brands = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        })
    },

    loadCategory: function() {
      axios
        .get(this.baseUrl + '/categorias/' + this.id)
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.category = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
  },
}
</script>
