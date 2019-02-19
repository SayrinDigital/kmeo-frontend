<template>
  <div>
    <Navigator></Navigator>
    <nuxt />
    <Footer></Footer>
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
