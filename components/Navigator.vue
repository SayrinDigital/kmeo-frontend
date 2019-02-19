<template>
<div uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: active-sticky; cls-inactive: uk-navbar-transparent; top: 200">
  <nav class="uk-navbar-container uk-position-relative uk-navbar-transparent" id="mainnav" uk-navbar="mode: click">

    <div class="uk-navbar-left">
      <div class="uk-navbar-item">
        <nuxt-link to="/">
          <img uk-img width="80px" src="/logo.svg" />
        </nuxt-link>
      </div>
    </div>

    <div class="uk-navbar-right">

      <!--<div class="uk-navbar-item  uk-visible@s">
        <div>
          <a class="uk-navbar-toggle" uk-search-icon href="#"></a>
          <div class="uk-drop" uk-drop="mode: click; pos: left-center; offset: 0">
            <form v-on:submit.prevent class="uk-search uk-search-navbar">
              <div class="uk-display-inline-block uk-dark">
                <div class="uk-form-controls">
                  <select v-model="selecttosearch" class="uk-select">
                    <option disabled value="">Elegir Término</option>
                    <option value="name">Nombre</option>
                    <option value="location">Ubicación</option>
                  </select>
                </div>
              </div>
              <div class="uk-display-inline-block">
                <input v-on:keyup.enter="searchsubmit" v-model="search" class="uk-search-input" type="search" placeholder="Buscar..." autofocus>
              </div>
            </form>
          </div>
        </div>
      </div>-->

      <div class="uk-navbar-item uk-visible@m">
        <nuxt-link to="/" class="uk-button-text">Inicio</nuxt-link>
      </div>

      <div class="uk-navbar-item uk-visible@m">
        <nuxt-link to="/faq" class="uk-button-text">Preguntas Frecuentes</nuxt-link>
      </div>

      <div class="uk-navbar-item uk-visible@m">
        <a class="uk-button-text">Categorías</a>
        <div uk-dropdown>
          <ul class="uk-nav uk-dropdown-nav">
            <!--{{ categories }}-->
            <li v-for="category in categories" :key="category.id"><nuxt-link :to="{ name: 'categorias-id', params: { id: category.id }}">{{ category.nombre }}</nuxt-link></li>
          </ul>
        </div>
      </div>

      <div class="uk-navbar-item">
        <div class="uk-position-relative">
          <nuxt-link to="/carro" uk-icon="icon: cart">
          <div class="quantity-container">
            <div class="quantity-cart uk-text-center uk-position-relative">
              <p class="uk-position-center">{{ numberOfItems }}</p>
            </div>
          </div>
        </nuxt-link>
        </div>
      </div>


    </div>

  </nav>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: [],
      headers: [],
      baseUrl: "",
      interface: ""
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadCategories()
  },
  computed: {
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  methods: {
    loadCategories: function() {
      axios
        .get(this.baseUrl + '/categorias')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.categories = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  },
}
</script>
