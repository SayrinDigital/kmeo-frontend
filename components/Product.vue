<template>

  <div  @click="openModal()" class="cursor-pointer uk-position-relative product-container" v-if="product.fotos">

    <div class="content uk-height-1-1">
      <div>
        <img v-if="product.fotos.frontal" :src="baseUrl + product.fotos.frontal.url" alt="">
      </div>
      <div class="uk-card-body">
        <div class="brand">
          <p v-if="product.marca.nombre" >{{ product.marca.nombre }}</p>
          <p class="uk-visible@s" v-else>Novedades</p>
        </div>
        <h5>{{ product.nombre }}</h5>
        <div class="uk-margin">
          <p class="price uk-display-inline-block">{{ product.preciofinal | currency('$', 0)}} CLP</p>
            <p class="price-strike uk-display-inline-block">{{ product.precioreferencial | currency('$', 0)}} CLP</p>
        </div>
      </div>

    </div>


  </div>

</template>

<script>


export default {
  data(){
    return{
      baseUrl: "https://say.kmeo.cl"
    }
  },
  components: {

  },
  props: ['product'],
  computed:{
     discountPercetange: function(){
       var decrease = this.$props.product.precioreferencial - this.$props.product.preciofinal
       return Math.round((decrease / this.$props.product.precioreferencial) * 100)
     }
  },
  methods: {
    openModal: function(){
       this.$modal.show('modal-product-card', { product: this.product })
    }
  }
}
</script>

<style lang="css">
</style>
