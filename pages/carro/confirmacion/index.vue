<template>

    <div class="min-heightport">
      <section class="uk-section header-container  uk-width-4-5@m">
        <div class="uk-section">
          <div class="say-padding-left-container">
            <div class="uk-container uk-container-large">
              <p class="uk-width-2-5@m">Compra</p>
              <h1 class="text-responsive">Confirmación de Pago</h1>
              <div>
                <!--<h3 class="uk-margin">Pago Realizado</h3>-->
                <p class="uk-margin-bottom">Estamos a 1 paso de terminar la compra. Finaliza la compra para recibir el comprobante en tu correo provisto.</p>
                <div v-if="isspinnershown" uk-spinner></div>
                <div v-else>
                  <button  @click="endBuy" class="uk-button style-a">Finalizar Compra</button>
                  <p class="tiny-text">Al Finalizar la Compra recibirás un comprobante de pago en tu mail.</p>
                </div>

              </div>
            </div>
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
        isspinnershown: false,
        isconfirming: true,
        html: ''
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
    mounted() {
      if(this.$store.getters['order/orderId'] == null){
        console.log('shet')
      }else{
        this.getOrder(this.$store.getters['order/orderId'])
        console.log(this.$store.getters['order/orderId'])
      }
    },
    computed: {
      orderid() {
        return this.$store.getters['order/orderId']
      },
      status: function(){
        return this.$store.getters['order/status']
      }
    },
    methods: {
      endBuy(){
        this.isspinnershown = true
        this.getOrder(this.$store.getters['order/orderId'])
      },
      getStatus(value){
        switch (value) {
          case 2:
            return 'Se confirmó su pago satisfactoriamente'
          case 3:
            return 'Se rechazó el pago'
          default:
            return 'No se registro ningún pago'

        }
      },
       getOrder(id){
         axios
            .post('https://kmeo.cl/flow/examples/payments/getStatusByCommerceId.php',{
                orderId: id
            })
            .then(response => {
              this.updateOrder(response.data.commerceOrder, response.data.status)
            })
            .catch(error => {
              // Handle error.
              this.isspinnershown = false
              console.log('An error occurred:', error);
            });
       },
       updateOrder(id, value){

         var status = this.getStatus(value)
         var vm = this;
         console.log(status)

         axios
            .put('https://say.kmeo.cl/ordens/' + id,{
                estado: status
            })
            .then(response => {
              this.$store.commit('order/emptyOrder')
              this.$store.commit('cart/emptyList')
              if(value == 2){
                vm.sendMail(id)
              }
              this.$router.push('/')
              this.isspinnershown = false
            })
            .catch(error => {
              // Handle error.
              this.isspinnershown = false
              console.log('An error occurred:', error);
            });
       },
       sendmail(id){
         var order = null
         axios
         .get('https://say.kmeo.cl/ordens/' + id)
         .then(response => {
           order = response.data
          this.sendNotify(order)
            this.$store.commit('order/emptyOrder')

         })


       },
       sendMNotify(order){
            axios
            .post('/api/mail',{
              email: order.email,
              nombre: order.nombre,
              id: order.id
            })
            .then(response => {
                //console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

            axios
            .post('/api/notifyorder',{
              email: order.email,
              nombre: order.nombre,
              id: order.id,
              telefono: order.telefono,
              direccion: order.direccion,
              total: order.total,
              productos: order.productos,
              despachorapido: order.despachorapido
            })
            .then(response => {
                //console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
       },
    }
  }

</script>
