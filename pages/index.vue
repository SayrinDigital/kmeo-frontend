<template>
<div>
  <section class="uk-section">
    <div class="uk-section uk-section-large header-container">
      <div class="uk-container uk-container-large">
        <h1 class="text-responsive">{{ interface.tituloencabezado }}</h1>
        <p class="uk-width-2-5@m uk-margin">{{ interface.descripcion }}</p>
      </div>
    </div>

    <section class="uk-section uk-section-small">
      <div uk-grid>
        <div class="uk-width-4-5@m">
          <div class="uk-position-relative">
            <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="autplay: true; autoplay-interval: 2000">

              <ul class="uk-slideshow-items">
                <li v-for="header in headers">
                  <a :href="header.link" class="imagen-link-container">
                     <img v-if="header.imagen" :src="baseUrl + header.imagen.url" alt="" uk-cover>
                  </a>
                </li>
              </ul>

              <div class="uk-position-bottom-right arrows-sliders-a">
                <a class=" uk-position-small uk-hidden-hover uk-link" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                <a class="uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
              </div>

            </div>
            <div class="uk-position-top-left link-container uk-width-4-5@m uk-text-right">
              <a class="uk-button-text" href="">Conóce lo último en nuestro catálogo <span class="uk-icon uk-margin-small-left" uk-icon="icon: arrow-right;"></span> </a>
            </div>
          </div>
        </div>
        <div class="uk-width-1-5@m">
          <div class="uk-text-center">
            <p>Lo Nuevo De La Temporada <span class="uk-margin-small-left uk-icon" uk-icon="icon: arrow-down;"></span> </p>
          </div>
        </div>
      </div>
    </section>

    <section class="uk-section uk-section-large" v-if="hlcategory">
      <div class="">
        <div uk-grid class="uk-flex uk-grid-large uk-flex-middle">
          <div class="uk-width-2-5@m">
            <div class=" say-padding-left-container">
              <div class="uk-container">
                <h1><span class="text-highlight">Destacados</span></h1>
                <p class="uk-margin">{{ hlcategory.descripcion }}</p>
              </div>
            </div>
          </div>
          <div class="uk-width-3-5@m">
            <div>
              <div class="uk-position-relative uk-visible-toggle" tabindex="-1" uk-slider>

                <ul class="uk-slider-items uk-grid" v-if="hlcategory.producto">
                  <li v-for="product in hlcategory.producto" :key="hlcategory.producto.id" class="uk-width-4-5">
                    <Product :product="product"></Product>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="uk-section uk-section-large">

      <div class="uk-container uk-container-large">
        <div>
          <h1><span class="text-highlight">Categorías</span></h1>
          <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
        </div>
        <div class="uk-section">
          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>

            <ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
              <li v-for="category in categories" :key="category.id">
                <nuxt-link tag="div" :to="{ name: 'categorias-id', params: { id: category.id }}" class="uk-panel cursor-pointer category-container">
                  <img v-if="category.imagen" :src="baseUrl + category.imagen.url" alt="">
                  <div class="uk-position-bottom-left uk-panel">
                    <div class="badge-container">
                      <p>{{ category.nombre }}</p>
                    </div>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>

    <section class="uk-section uk-section-large">
      <div class="uk-container uk-container-large">
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

    </section>
  </section>

</div>
</template>

<script>
import axios from 'axios'
import Product from '~/components/Product'

export default {
  data() {
    return {
      categories: [],
      headers: [],
      baseUrl: "",
      interface: "",
      products: [],
      hlcategory: null,
      hlproducts: []
    }
  },
  components:{
    Product
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadContent()
    this.loadCategories()
    this.loadHeaders()
    this.loadProducts()
    this.loadHlCategory()
  },
  methods: {
    loadContent: function() {
      axios
        .get(this.baseUrl + '/interfazs',{
          params:{
            _limit: 1
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.interface = response.data[0]
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadHeaders: function() {
      axios
        .get(this.baseUrl + '/encabezados')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.headers = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadCategories: function() {
      axios
        .get(this.baseUrl + '/categorias')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.categories = response.data
          console.log(response.data[0])
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadProducts: function() {
      axios
        .get(this.baseUrl + '/productos/',{
          params: {
            _limit: 20,
            _sort: "id:DESC"
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
    loadHlCategory: function(){
      axios
        .get(this.baseUrl + '/categorias', {
          params:{
            "nombre": "Destacados"
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          //console.log(response.data[0])
          this.hlcategory = response.data[0]
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadHlProducts: function(hlcategory){
      axios
        .get(this.baseUrl + '/productos/',{
          params: {
            categoria: hlcategory.id,
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.hlproducts = response.data
          //console.log(response.data)
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }

  },
}
</script>
