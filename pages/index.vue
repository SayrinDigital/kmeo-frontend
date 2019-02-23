<template>
<div>

  <demo-adaptive-modal />
  <section class="uk-section">
    <div class="uk-section uk-section-large header-container">
      <div class="uk-container uk-container-large">
        <div>
          <h1 class="text-responsive">{{ interfaces.tituloencabezado }}</h1>
          <p class="uk-width-2-5@m uk-margin">{{ interfaces.descripcion }}</p>
        </div>
      </div>
    </div>

    <section class="uk-section uk-section-small">
      <div uk-grid>
        <div class="uk-width-4-5@m">
          <div class="uk-position-relative">
            <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="autoplay: true; autoplay-interval: 2000">

              <ul class="uk-slideshow-items">
                <li v-for="header in headers">
                  <a :href="header.link" class="imagen-link-container">
                    <img v-if="header.imagen" uk-img :src="baseUrl + header.imagen.url" alt="" uk-cover>
                  </a>
                </li>
              </ul>

              <div class="uk-position-bottom-right arrows-sliders-a">
                <a class=" uk-position-small uk-hidden-hover uk-link" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                <a class="uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
              </div>

            </div>
            <div class="uk-position-top-left link-container uk-width-4-5@m uk-text-right@m uk-text-left">
              <nuxt-link class="uk-button-text" to="/faq">Visíta nuestra seccion de preguntas y respuestas. <span class="uk-icon uk-margin-small-left" uk-icon="icon: arrow-right;"></span> </nuxt-link>
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
            <div class="uk-container">
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


    <section class="uk-section uk-background-cover"  id="categories-section" uk-img data-src="/assets/bg-a.svg">

      <div class="uk-container uk-container-large">

        <div class=" uk-section">
          <div class="uk-container">
            <h1><span class="text-highlight">Categorías</span></h1>
            <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
          </div>
        </div>

    </div>

       <div class="uk-container">

        <div class="uk-section" >
          <div class="uk-position-relative uk-visible-toggle " tabindex="-1">
            <div uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div > div ; delay: 200;" class="uk-child-width-1-2@m uk-grid-medium uk-grid" uk-grid>
                  <Category v-for="category in categories" :key="category.id" :category="category"></Category>
             </div>
          </div>
        </div>

        </div>

    </section>

    <section class="uk-section">
      <div class="uk-container">

        <div class="uk-section">
          <div class="uk-child-width-1-2@m uk-flex uk-flex-middle" uk-grid>
            <div>
              <div>
                <h1 class="uk-text-capitalize"><span class="text-highlight">últimos Productos</span></h1>
                <p class="uk-text-capitalize uk-width-large@m uk-margin">Encuentra el producto a tu medida.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-section">
          <div class="uk-grid uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2 uk-grid-match" uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div > div; delay: 200;" uk-grid>
            <div v-for="product in randomizedProducts" :key="product.id">
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
import axios from '~/plugins/axios'
import Product from '~/components/Product'
import Category from '~/components/Category'
import DemoAdaptiveModal from '~/components/ModalProduct'

export default {
  data() {
    return {
      baseUrl: "https://say.kmeo.cl/",
    }
  },
  components: {
    Product,
    DemoAdaptiveModal,
    Category
  },
  computed: {
     randomizedProducts: function(){
       return this.products.sort(function(){return 0.5 - Math.random()});
     }
  },
  async asyncData({
    params
  }) {
    // We can use async/await ES6 feature
    const interfaces = await axios.get(
      '/interfazs', {
        params: {
          _limit: 1
        }
      }
    );
    const headers = await axios.get(
      '/encabezados'
    );

    const products = await axios.get(
      '/productos/', {
        params: {
          _limit: 20,
          _sort: "id:DESC"
        }
      }
    );

    const categories = await axios.get(
      '/categorias'
    );

    const hlcategory = await axios.get(
      '/categorias', {
        params: {
          nombre: "Destacados"
        }
      }
    );

    return {
      interfaces: interfaces.data[0],
      headers: headers.data,
      products: products.data,
      categories: categories.data,
      hlcategory: hlcategory.data[0],
      hlproducts: hlcategory.data.producto
    };
  },
}
</script>
