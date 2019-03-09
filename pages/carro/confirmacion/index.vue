<template>

    <div class="min-heightport">
      <section class="uk-section header-container  uk-width-4-5@m">
        <div class="uk-section">
          <div class="say-padding-left-container">
            <div class="uk-container uk-container-large">
              <p class="uk-width-2-5@m">Compra</p>
              <h1 class="text-responsive">Confirmación de Pago</h1>
              <div>
                <h3 class="uk-margin">Pago Realizado</h3>
                <div v-if="isspinnershown" uk-spinner></div>
                <button v-else @click="endBuy" class="uk-button style-a">Finalizar Compra</button>
                <button type="button" @click="sendmail('josepuma@sayrin.cl')">send</button>
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
         console.log(status)

         axios
            .put('https://say.kmeo.cl/ordens/' + id,{
                estado: status
            })
            .then(response => {
              this.$store.commit('order/emptyOrder')
              this.$store.commit('cart/emptyList')
              this.sendMail('josepuma@sayrin.cl')
              this.$router.push('/')
              this.isspinnershown = false
            })
            .catch(error => {
              // Handle error.
              this.isspinnershown = false
              console.log('An error occurred:', error);
            });
       },
       sendmail(to){

         const sgMail = require('@sendgrid/mail');
         sgMail.setApiKey('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');
         var paymentdone = "d-1f579c58b94a4ae48d0a72ef4f87411b"
         var notification = "d-bf8d8e54e7c3452ca4f2b3e7b236a57f"
         /*var order = null
         axios
         .get('https://say.kmeo.cl/ordens/' + '5c83086da9ff9d1c28be2515')
         .then(response => {
           order = response.data
           console.log(order)
         })*/


         /*const msg = {
             to: 'josepuma@sayrin.cl',
             from: 'ventas@kmeo.cl',
             dynamic_template_data:{
                name: order.nombre,
                total: order.total,
                productos: order.productos,
                phone: order.telefono,
                mail: order.email,
                address: order.direccion,
             },
             template_id: notification,

           };*/

           const msg = {
               to: 'josepuma@sayrin.cl',
               from: 'ventas@kmeo.cl',
               personalizations: [{
                 dynamic_template_data: {
                    name: "José Puma",
                    total: "10990",
                    productos: [],
                    phone: "+56940444172",
                    mail: "josepuma@sayrin.cl",
                    address: "Monjitas 550",
                 }}],
               template_id: notification,

             };

         sgMail.send(msg);


       }
    }
  }

</script>
