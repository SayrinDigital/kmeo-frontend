<template>

<div>

    <modal
        name="modal-product-card"
        transition="nice-modal-fade"
        :min-width="100"
        :min-height="200"
        :max-height="1300"
        :delay="100"
        :scrollable="true"
        :pivotY="0.5"
        width="90%"
        height="auto"
        @before-open="beforeOpen"
        :adaptive="true"
        >

        <div>

        <div class="uk-background-default" v-if="product">
          <section class="header-container">
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
              <div class="uk-position-relative uk-visible-toggle uk-light responsive-heightport" v-if="product.fotos" tabindex="-1" uk-slideshow="ratio: false;">

            <ul class="uk-slideshow-items responsive-heightport">
                <li v-if="product.fotos.frontal">
                    <img :src="baseUrl + product.fotos.frontal.url" alt="" uk-cover>
                </li>
                <li v-if="product.fotos.extra">
                    <img :src="baseUrl + product.fotos.extra.url" alt="" uk-cover>
                </li>
            </ul>

            <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
            <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>

        </div>
              <!--<div class="uk-background-cover" v-if="product.imagen" uk-img :data-src="baseUrl + product.imagen.url" uk-height-viewport></div>-->
              <div class="uk-padding-large">
                <div class="uk-width-3-5@m uk-margin-auto">

                  <h1>{{ product.nombre }} | Detalles</h1>
                  <p class="uk-margin uk-visible@s">{{ product.descripcion }}</p>
                <div class="uk-margin">
                  <p class="uk-margin-remove tiny-text text-strike"><span class="text-bold">Precio Referencial:</span> {{ product.precioreferencial | currency('$', 0) }} CLP</p>
                  <p class="uk-margin-remove"><span class="text-bold">Precio:</span> {{ product.preciofinal | currency('$', 0) }} CLP</p>
                </div>
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
        </div>

      </modal>

</div>

</template>

<script>

import { mapMutations } from 'vuex'

export default {
  data(){
    return{
       product: null,
       baseUrl : ""
    }
  },
  methods: {
    ...mapMutations({
          addToCart: 'cart/add',
          removeFromCart: 'cart/remove',
          emptyCart: 'cart/emptyList'
        }),
    beforeOpen(event){
        this.baseUrl =  this.$axios.defaults.baseURL
      this.product = event.params.product
    }

  }
}
</script>

<style lang="css">
</style>
