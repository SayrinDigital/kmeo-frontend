<template>
  <div>
    <no-ssr><Navigator></Navigator></no-ssr>
    <nuxt />
    <no-ssr><Footer></Footer></no-ssr>
    <div class="uk-position-fixed uk-position-bottom-right uk-overlay" style="z-index: 99;">
      <div>
        <a href="https://api.whatsapp.com/send?phone=+56941639399&amp;text=Hola%20tengo%20una%20duda%20por%20un%20producto%20que%20vi%20en%20la%20pagina" class="uk-icon-button whatsapp-icon" uk-icon="icon: whatsapp; ratio: 2"></a>
    </div>
    </div>

    <div class="uk-position-fixed uk-position-bottom-left uk-overlay">
      <a class="uk-icon-button  uk-margin-small-right" uk-icon="social"></a>
      <div class="uk-width-large" uk-dropdown>
        <div  >
          <h5 class="uk-margin">Nuestras Redes Sociales</h5>
          <a href="https://www.instagram.com/kmeo.cl/" class="uk-icon-button uk-margin-small-right" uk-icon="instagram"></a>
          <a href="https://www.facebook.com/kmeo.cl" class="uk-icon-button" uk-icon="facebook"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Navigator from '~/components/Navigator'
import Footer from '~/components/Footer'

  export default{
    components: {
      Navigator,
      Footer
    }
  }
</script>
