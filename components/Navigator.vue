<template>
<div uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: active-sticky; cls-inactive: uk-navbar-transparent; top: 200">
  <nav  class="uk-position-relative uk-navbar-container  uk-navbar-transparent" id="mainnav" uk-navbar="mode: click">

    <div class="uk-navbar-left">
      <div class="uk-navbar-item">
        <nuxt-link to="/">
          <img uk-img width="70" src="/logopink.svg" />
        </nuxt-link>
      </div>
    </div>

    <div class="uk-navbar-right">

      <div class="uk-navbar-item  uk-visible@s">
        <div>
          <a class="uk-navbar-toggle" uk-search-icon href="#"></a>
          <div class="uk-drop" uk-drop="mode: click; pos: left-center; offset: 0">
            <form v-on:submit.prevent="searchsubmit" class="uk-search uk-search-navbar">
              <div class="uk-display-inline-block">
                <input v-model="search" class="uk-search-input" type="search" placeholder="Buscar..." autofocus>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="uk-navbar-item uk-visible@m">
        <nuxt-link to="/" class="uk-button-text">Inicio</nuxt-link>
      </div>

      <div class="uk-navbar-item uk-visible@m">
        <nuxt-link to="/faq" class="uk-button-text">Preguntas Frecuentes</nuxt-link>
      </div>

      <div class="uk-navbar-item uk-visible@m">
        <a class="uk-button-text">Categorías <span class="uk-icon uk-margin-small-left" uk-icon="icon: chevron-down"></span></a>
        <div class="dropdown-categories uk-width-large" uk-dropdown="animation: uk-animation-slide-top-small; duration: 500">
          <ul class="uk-nav uk-list-large uk-dropdown-nav">
            <li v-for="category in categories" :key="category.id">

              <nuxt-link v-if="category.mostrar" tag="a" :to="{ name: 'categorias-id', params: { id: category.id }}" >
                <div class="category-container">
                  <div class="image-container uk-position-center-right uk-height-1-1 uk-width-3-5 uk-background-cover " uk-img :data-src="baseUrl + category.imagen.url">
                  </div>
                  <div class="content nav">
                       <div class="uk-width-2-5@l">
                         <p>{{ category.nombre }}</p>
                       </div>
                  </div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="uk-navbar-item"  z-index="99999">
        <div class="uk-position-relative">
          <nuxt-link to="/carro" uk-icon="icon: cart">
            <div class="quantity-container">
              <div class="quantity-cart uk-text-center uk-position-relative">
                <div class="uk-position-center">
                  <transition name="slide-fade" mode="out-in">
                              <p :key="numberOfItems">{{ numberOfItems }}</p>
                  </transition>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="uk-navbar-item uk-hidden@s">
        <a class="uk-navbar-toggle" uk-navbar-toggle-icon href="#nav-mobile" uk-toggle></a>
        <div id="nav-mobile" uk-offcanvas="mode: push; overlay: true">
          <div class="uk-offcanvas-bar">

            <button class="uk-offcanvas-close" type="button" uk-close></button>

            <ul class="uk-nav uk-nav-default">
            <li class="uk-active"><nuxt-link to="/" class="uk-button-text">Inicio</nuxt-link></li>
            <li class="uk-parent">
                <a href="#">Categorías</a>
                <ul class="uk-nav-sub">
                  <li v-for="category in categories" :key="category.id">
                    <nuxt-link :to="{ name: 'categorias-id', params: { id: category.id }}">{{ category.nombre }}</nuxt-link>
                  </li>
                </ul>
            </li>
            <li class="uk-nav-divider"></li>
            <nuxt-link to="/faq" class="uk-button-text">Preguntas Frecuentes</nuxt-link>
        </ul>

          </div>
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
      baseUrl: "https://say.petschile.cl",
      interface: "",
      search: ""
    }
  },

  mounted() {
    this.loadCategories()
  },
  computed: {
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    },
    orderid() {
      return this.$store.getters['order/orderId']
    }
  },
  methods: {
    searchsubmit() {
      this.$router.push({
        name: 'busqueda-term',
        params: {
          term: this.search
        }
      })
      console.log(this.search)
    },
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
