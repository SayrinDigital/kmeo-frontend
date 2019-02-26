<template>
<div>

  <div  z-index="0" class="uk-position-relative uk-section uk-section-large category-header uk-background-cover" uk-img data-src="https://images.unsplash.com/photo-1461039088886-b5c863279a0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
   <div class="overlay uk-position-cover"></div>
   <div class="uk-section uk-section-small uk-position-relative">
     <div class="uk-container">
       <p>Categorías</p>
       <h1 class="text-responsive">Preguntas Frecuentes</h1>
       <p class="uk-width-large@m">Resuelva las dudas más comunes que podría llegar a tener con nuestro portal.</p>
     </div>
   </div>
  </div>

  <section class="uk-section  category-product-container">

    <div class="uk-container uk-container-small ">
      <div>
        <ul class="faq-list uk-list" uk-accordion>
          <li v-for="faq in faqs" class="uk-open">
            <a class="uk-accordion-title" href="#">{{ faq.pregunta }}</a>
            <div class="uk-accordion-content">
              <p>{{ faq.respuesta }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </section>

</div>
</template>

<script>
import axios from 'axios'

export default {
  head () {
  return {
    title: 'FAQ | Kmeo',
    meta: [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Resuelva las dudas más comunes que podría llegar a tener con nuestro portal.' }
    ]
  }
},
  data() {
    return {
      faqs: []
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.id = this.$route.params.id
    this.loadFaq()
  },
  methods: {
    loadFaq: function() {
      axios
        .get(this.baseUrl + '/faqs/')
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.faqs = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
  },
}
</script>
