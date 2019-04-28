<template>
<footer>
  <div>
    <div uk-grid>
      <div class="uk-width-4-5@m left-container">
        <div class="say-padding-left-container">
          <div class="uk-section">
            <div class="uk-container">
              <h1>PetsChile</h1>
              <p class="uk-width-2-5@m uk-margin">{{ interface.piedescripcion }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-5@m uk-text-center ">
        <div class="uk-section uk-text-center">
          <div>
            <a href="https://www.instagram.com/petschile.cl/" class="uk-icon-button uk-margin-small-right" uk-icon="instagram"></a>
            <a href="https://www.facebook.com/petschile.cl" class="uk-icon-button  uk-margin-small-right" uk-icon="facebook"></a>
</div>
        </div>
      </div>
    </div>
  </div>
</footer>
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
    this.loadContent()
  },
  methods: {
    loadContent: function() {
      axios
        .get(this.baseUrl + '/interfazs', {
          params: {
            _limit: 1
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.interface = response.data[0]
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
  }
}
</script>
