<template>

  <div v-if="category">
      <div>
        <div class="category-container">
          <div class="image-container uk-position-center-right uk-height-1-1 uk-width-3-5 uk-background-cover " :style="'background-image: url('+baseUrl + category.imagen.url+');'">
          </div>
          <div class="content">
               <div class="uk-width-2-5@l">
                 <p class="tag">Categorías</p>
                 <h3>{{ category.nombre }}</h3>
                 <p class="uk-margin text">Tenemos {{ category.producto.length }} productos en esta categoría.</p>
                 <div class="uk-margin">
                   <nuxt-link tag="a" :to="{ name: 'categorias-id', params: { id: category.id }}" class="uk-button">Ver Productos <span class="uk-icon uk-margin-small-left" uk-icon="icon: arrow-right;"></span></nuxt-link>
                 </div>
               </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
export default {

  data(){
    return{
       baseUrl: 'https://say.kmeo.cl'
    }
  },
  props: ['category'],


}
</script>
