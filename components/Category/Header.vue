<template>

  <div v-if="category">

   <div v-if="category.imagen" z-index="0" class="uk-position-relative uk-section uk-section-large category-header uk-background-cover" uk-img :data-src="baseUrl + category.imagen.url">
    <div class="overlay uk-position-cover"></div>
    <div class="uk-section uk-section-small uk-position-relative">
      <div class="uk-container">
        <p>Categorías</p>
        <h1 class="text-responsive">{{ category.nombre }}</h1>
        <p class="uk-width-large@m">Podrás encontrar una larga variedad de productos e igualmente filtrar tu búsqueda en base a las marcas más reconocidas.</p>
      </div>
    </div>
   </div>

  </div>

</template>

<script>
export default {
  data(){
    return{
       baseUrl: 'https://say.petschile.cl'
    }
  },
  props: ['category']
}
</script>

<style lang="css">
</style>
