<template>
<div>

  <section class="uk-section header-container  uk-width-4-5@m background-blue">
    <div class="uk-section uk-section-large">
      <div class="say-padding-left-container">
        <div class="uk-container uk-container-large">
          <p class="uk-width-2-5@m">FAQ</p>
          <h1 class="text-responsive">Preguntas Frecuentes</h1>
          <p class="uk-margin">Resuelva las dudas más comunes que podría llegar a tener con nuestro portal.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="uk-section uk-section-large">

    <div class="uk-container uk-container-small">
      <div>
        <ul class="faq-list" uk-accordion>
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
