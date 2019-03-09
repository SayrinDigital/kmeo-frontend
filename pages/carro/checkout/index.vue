<template>
<div>
  <section class="header-container uk-background-cover"  uk-img data-src="/assets/bg-a.svg">
    <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex uk-flex-middle" uk-grid>
      <div uk-height-viewport>

        <div class="uk-padding-large uk-width-4-5 uk-margin-auto">
          <div class="uk-section uk-section-large">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-expand" uk-leader>
                <h4 class="uk-display-inline">Total</h4>
              </div>
              <div>
                <h4 class="uk-display-inline">{{ price | currency('$', 0) }} CLP</h4>
              </div>
            </div>

            <div class="uk-section uk-section-small">
              <form class="uk-form-stacked" @submit.stop.prevent="generatePayment()">

                <div class="uk-margin">
                  <h4 class="uk-form-label" for="form-stacked-text">Nombre</h4>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" required v-model="name" placeholder="Nombre Completo">
                  </div>
                </div>

                <div class="uk-margin">
                    <h4 class="uk-form-label" for="form-stacked-text">Email</h4>
                  <div class="uk-form-controls">
                  <input class="uk-input" id="form-stacked-text" type="email" required v-model="email" placeholder="Email">
                  </div>
                </div>

                <div class="uk-margin">
                    <h4 class="uk-form-label" for="form-stacked-text">Teléfono</h4>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" required v-model="phone" placeholder="Teléfono (+569)">
                  </div>
                </div>

                <div class="uk-margin">
                    <h4 class="uk-form-label" for="form-stacked-text">Dirección</h4>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" required v-model="address" placeholder="Calle, Avenida, Comuna">
                  </div>
                </div>

                <div v-if="!iswebpayenabled" class="uk-margin" uk-margin>
                  <h4 class="uk-form-label uk-margin-remove" for="form-stacked-text">Comprobante</h4>
                  <div  uk-form-custom="target: true">
                    <input type="file" @change="setVoucher($event.target.name, $event.target.files)" ref="voucher">
                    <input class="uk-input upload-input" type="text"  placeholder="Elegir Comprobante" disabled>
                  </div>
              </div>

                <div  v-if="despacho" class="uk-margin">
                  <div v-if="despacho.mostrar">
                     <h4><input class="uk-checkbox" type="checkbox" v-model="fastsent" checked> Despacho rápido</h4>
                     <div uk-dropdown>
                       <div><p >{{ despacho.detalles }}</p></div>
                     </div>
                  </div>
                </div>

                <div v-if="isuploading" uk-spinner></div>

                <div v-if="iswebpayenabled" class="uk-margin uk-text-right">
                  <button class="uk-button uk-button-large style-a" type="submit">Ir a Pagar</button>
                  <p class="tiny-text">Pagar por Webpay tiene un recargo de +6%.</p>
                </div>

                <div v-else class="uk-margin uk-text-right">
                  <button class="uk-button uk-button-large style-a" type="submit">Notificar Pago</button>
                  <p class="tiny-text">Max. 2MB</p>
                </div>


              </form>
            </div>

          </div>
        </div>

      </div>
      <div class="uk-flex-first">
        <div class="uk-section">
          <div class="uk-container">
            <div class="uk-width-4-5@m uk-margin-auto uk-text-center uk-text-left@s">
              <h1 class="uk-margin-top">Medios de Pago</h1>
              <p class="uk-margin">Seleccione el medio de pago que más le acomode.</p>
              <hr class="uk-hr">

              <div>
                <div class="" uk-grid>
                  <div class="uk-width-auto@m">
                    <ul class="payment-gate uk-list"  uk-switcher="animation: uk-animation-fade; toggle: > *; connect: #component-tab-left">
                      <li v-for="pay in paymentmethods">
                        <a href="#" @click="setPaymentMethod(pay.nombre)">
                              <span v-if="pay.nombre == 'Webpay'" class="uk-icon uk-margin-small-right" uk-icon="icon: credit-card"></span>
                              <span v-if="pay.nombre == 'Caja Vecina'" class="uk-icon uk-margin-small-right" uk-icon="icon: home"></span>
                              <span v-if="pay.nombre == 'Transferencia'" class="uk-icon uk-margin-small-right" uk-icon="icon: laptop"></span>
                          {{ pay.nombre }}</a>
                      </li>
                    </ul>
                  </div>
                  <div class="uk-width-expand@m">
                    <ul id="component-tab-left" class="uk-switcher">
                      <li  v-for="pay in paymentmethods">
                        <div>
                          <h2>{{ pay.nombre }}</h2>
                          <pre class="uk-margin">{{ pay.descripcion }}</pre>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>

import axios from 'axios'

let UIkit
let sgMail

if(process.browser){
  UIkit = require('uikit')
  sgMail = require('@sendgrid/mail');
}

export default {

  data(){
    return{
      baseUrl : "https://say.kmeo.cl",
      name: "",
      email: "",
      phone: "",
      address: "",
      fastsent: false,
      despacho: null,
      paymentmethods: [],
      iswebpayenabled: true,
      voucherfile: null,
      isuploading: false
    }
  },
  beforeMount() {
    this.loadDespacho()
    this.loadPaymentMethods()
  },
  computed: {
    price() {
      if(this.fastsent){
        return this.$store.getters['cart/price'] + this.despacho.precio
      }
      return this.$store.getters['cart/price']
    }
  },
  methods: {

   loadDespacho(){
     axios
     .get(this.baseUrl + '/despachos')
     .then(response =>{
         this.despacho = response.data[0]
     })
     .catch(error => {

     })
   },

   loadPaymentMethods(){

     axios
     .get(this.baseUrl + '/mediospagos')
     .then(response => {
         this.paymentmethods = response.data
        // console.log(this.paymentmethods)
     })
     .catch(error => {

     })
   },

   setVoucher(fieldName, file){
          this.voucherfile = file[0]
   },

   setPaymentMethod(method){

      switch (method) {
        case "Webpay":
           this.iswebpayenabled = true
          break;
          case "Caja Vecina":
             this.iswebpayenabled = false
            break;
            case "Transferencia":
               this.iswebpayenabled = false
              break;
        default:

      }

   },

   generatePayment(){


          this.isuploading = true

     axios
       .post(this.baseUrl + "/ordens/", {
         nombre: this.name,
         email: this.email,
         telefono: this.phone,
         direccion: this.address,
         despachorapido: this.fastsent,
         total: this.$store.getters['cart/price'],
         productos: this.$store.getters['cart/items'],
         estado: "Orden Generada"
       })
       .then(response => {
         // Handle success.
         //console.log(response.data)

         if(this.iswebpayenabled){
             this.Pay(response.data.id)
         }else{
           let data = new FormData()
              data.append('files', this.voucherfile)
              data.append('refId', response.data.id)
              data.append('ref', 'orden')
              data.append('field', 'voucher')

              this.uploadFile(data, response.data.id)

         }



       })
       .catch(error => {
         // Handle error.
         console.log('An error occurred:', error);
       });
   },

   uploadFile(data, orderId){


     axios
        .post(this.baseUrl + '/upload/',
          data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        .then(response => {
          this.$store.commit('order/add', orderId)
          this.notifyPayment(orderId)
        })
        .catch(error => {
          // Handle error.
          this.isuploading = false
          console.log('An error occurred:', error);
        });
   },

   notifyPayment(id){


     sgMail.setApiKey('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');
     var paymentdone = "d-9586ff90db154c56b1dd0cdf3ae9f52c"
     var notification = "d-c427f97c2ab44c9c95a254b9cfdd5bf8"
     var order = null
     axios
     .get('https://say.kmeo.cl/ordens/' + id)
     .then(response => {
       order = response.data
       const msg = {
           to: 'ventas@kmeo.cl',
           from: 'josepuma@kmeo.cl',
           subject: 'Notificación de Pago',
           personalizations: [
        {
          to: {
            name: 'Ventas',
            email: 'ventas@kmeo.cl'
          },
          dynamic_template_data: {
            id: order.id,
            nombre: order.nombre,
            email: order.email,
            telefono: order.telefono,
            address: order.direccion,
            total : order.total,
            productos: order.productos,
            despachorapido: order.despachorapido
          }
        }
      ],
           template_id: notification,

         };

                 sgMail.send(msg);



         const msgclient = {
             to: order.email,
             from: 'ventas@kmeo.cl',
             subject: 'Área de Ventas Kmeo',
             personalizations: [
          {
            to: {
              name: order.nombre,
              email: order.email
            },
            dynamic_template_data: {
              id: order.id
            }
          }
        ],
             template_id: paymentdone,

           };

        sgMail.send(msgclient);
                  this.isuploading = false
                  this.$store.commit('order/emptyOrder')
                  if(process.browser){
                    UIkit.notification({
                    message: 'Recibimos tu notificación de pago!',
                    status: 'primary',
                    pos: 'top-center',
                    timeout: 5000
                });
              }
     })
   },

   //sendNotificationMail(id)

    Pay(orderId){

      var price = this.$store.getters['cart/price']

      var totalprice = (price * 0.06) + price + this.despacho.precio

      this.$store.commit('order/add', orderId)

      axios
      .post('https://kmeo.cl/flow/examples/payments/create.php',{
        orderId: orderId,
        email: this.email,
        total: totalprice,
        productos: this.productos
      })
      .then(response => {

          this.isuploading = false

          var order = response.data
          if(order.url && this.despacho){
          window.location.href = order.url + "?token=" + order.token
        }
      })
      .catch(error => {
             this.isuploading = false
      })

    }
  }

}
</script>
