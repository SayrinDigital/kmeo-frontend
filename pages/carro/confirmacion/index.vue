<template>

    <div class="min-heightport">
      <section class="uk-section header-container  uk-width-4-5@m background-blue">
        <div class="uk-section uk-section-large">
          <div class="say-padding-left-container">
            <div class="uk-container uk-container-large">
              <p class="uk-width-2-5@m">Compra</p>
              {{ getOrderId }}
              <h1 class="text-responsive">Confirmación de Pago</h1>
              <p class="uk-margin">Resuelva las dudas más comunes que podría llegar a tener con nuestro portal.</p>
            </div>
          </div>
        </div>
      </section>



      <section class="uk-section uk-section-small">
        <div  class="uk-container uk-container-large">
          <div uk-spinner v-if="isconfirming"></div>
          <div v-else>
            <h3>{{ order.status | paymentStatus }}</h3>
            <p>Se envío una confirmación de pago de la misma manera a {{ order.payer }}</p>
          </div>
        </div>
      </section>
    </div>

</template>

<script>
  import axios from '~/plugins/axios'

  export default{
    data(){
      return{
        order: null,
        isconfirming: true
      }
    },
    filters: {
      paymentStatus: function(value){
        switch (value) {
          case 2:
            return 'Se confirmó su pago satisfactoriamente'
          case 3:
            return 'Se rechazó el pago'
          default:
            return 'No se registro ningún pago'

        }
      }
    },
    computed: {
      getOrderId: function(){
        return this.$store.getters['order/orderId']
      }
    },
    beforeMount(){
        this.getOrder()
    },
    methods: {
      getOrder(){

         var id = this.$store.getters['order/orderId']

         if(id){

             axios
             .post('https://kmeo.cl/flow/examples/payments/getStatusByCommerceId.php',{
               orderId: this.$store.getters['order/orderId']
             })
             .then(response => {
               console.log(response.data)
               this.order = response.data
               this.isconfirming = false
               //this.$store.commit('order/emptyOrder')
             })
             .catch(error => {

             })
         }

      }
    }
  }

</script>
