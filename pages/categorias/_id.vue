<template>
<div v-if="category">

  <Header :category="category"></Header>


  <div class="uk-container category-product-container">
    <div class="uk-section uk-section-small">
      <h3>Filtrar</h3>
      <p>Por las marcas más reconocidas</p>
      <div class="uk-margin">

        <div class="brands uk-text-left@m uk-text-center" v-if="brands">
       <label class="filter-button"><input class="uk-radio"  v-model="filterbrand" type="radio" value="Todas"> Todas</label>
       <label class="filter-button" v-for="brand in brandys"><input class="uk-radio"  v-model="filterbrand" type="radio" :value="brand"> {{ brand }}</label>

     </div>


      </div>
    </div>
  </div>

  <div class="uk-container">
    <div class="uk-section">
      <div class="uk-grid  uk-grid-match uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2" uk-scrollspy="cls: uk-animation-fade; target: > div > .product-container; delay: 200;" uk-grid>
        <div v-for="product in filteredProducts" :key="category.producto.id">
          <Product :product="product"></Product>
        </div>
      </div>
    </div>
  </div>

  <div class="uk-position-fixed uk-position-bottom-center">
   <div class="uk-position-relative">
     <div ref="cart"  id="cart-icon">
       <span class="uk-icon" uk-icon="icon: cart; ratio: 3;"></span>
     </div>
      <div ref="bubblePulse" class="bubble-pulse"></div>
   </div>
</div>


</div>
</template>

<script>
import axios from '~/plugins/axios'
import Product from '~/components/Product'
import Header from '~/components/Category/Header'

export default {
  data() {
    return {
      category: null,
      products: [],
      baseUrl: "https://say.kmeo.cl",
      id: null,
      brands: [],
      filterbrand: "Todas"
    }
  },
  head () {
  return {
    title: this.category.nombre + ' | Kmeo',
    meta: [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: this.category.descripcion }
    ]
  }
},
  components: {
    Product,
    Header
  },
  computed: {
     filteredProducts: function(){

       var vm = this
       var filterBrand = this.filterbrand

        if(filterBrand === "Todas"){
          return this.category.producto.sort(function(){return 0.5 - Math.random()});
        }else{
          return vm.category.producto.filter(function(product) {
            if(product.marca){
              return (filterBrand === "Todas" || product.marca.nombre === filterBrand)
            }
          })
        }
     },
     brandys: function(){
          var brands =  this.category.producto.map(a => a.marca.nombre)
          return [...new Set(brands)];
     }
  },
  beforeMount() {
    this.id = this.$route.params.id
    this.loadBrands()
  },
  mounted(){
    var vm = this

    if (process.browser) {
    this.timeline = new TimelineLite({ paused: true })
    this.cartAnimation()
   }
   this.$nuxt.$on('START_ANIMATION',function(){
     vm.startAnimation()
   })
  },
  asyncData ({ params }) {
  return axios.get('/categorias/' + params.id)
  .then((res) => {
    return { category: res.data }
  })
},
  methods: {

    cartAnimation: function(){

       const { cart } = this.$refs
       const { bubblePulse } = this.$refs

       this.timeline.to(cart, .5, {
        scale: 1,
        opacity: 1,
        x:0,
        y:-80,
       ease: Power4.easeInOut
      })

      this.timeline.to(
            bubblePulse,
            0.5,
            {
              scale: 0.9,
              opacity: 1,
              y: -80
            },
           '-=0.5'
          )

      this.timeline.to(cart, .2, {
        scale: 1.01,
        y: -91,
       ease: Power4.easeInOut
      })
      this.timeline.to(cart, .2, {
        scale: 1,
       ease: Power4.easeInOut
      })
      this.timeline.to(cart, .5, {
        opacity: 0,
        scale: 1,
         x:0,
         y:80,
       ease: Power4.easeInOut,
        display: 'none'
      })

      this.timeline.to(
       bubblePulse,
       1.1,
       {
         scale: 3,
         opacity: 0,
         ease: Expo.easeOut,
         display: 'none'
       },
       '-=1.2'
     )

    },
    startAnimation: function(){
       this.timeline.restart()
    },

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

  },
}
</script>
