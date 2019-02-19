<template>
  <div>
    <no-ssr><Navigator></Navigator></no-ssr>
    <nuxt />
    <no-ssr><Footer></Footer></no-ssr>
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
