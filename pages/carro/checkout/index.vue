<template>
<div>
  <section class="header-container uk-background-cover"  uk-img data-src="/assets/bg-a.svg">
    <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
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

                <div  v-if="despacho" class="uk-margin">
                  <div v-if="despacho.mostrar">
                     <h4><input class="uk-checkbox" type="checkbox" v-model="fastsent" checked> Despacho rápido</h4>
                     <div uk-dropdown>
                       <div><p >{{ despacho.detalles }}</p></div>
                     </div>
                  </div>
                </div>


                <div class="uk-margin uk-text-right">
                  <button class="uk-button uk-button-large style-a" type="submit">Ir a Pagar</button>
                  <p class="tiny-text">Pagar por Webpay tiene un recargo de +6%.</p>
                </div>


              </form>
            </div>

          </div>
        </div>

      </div>
      <div class="uk-flex-first">
        <div class="uk-section uk-section-large">
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
                        <a href="#">
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
                          <p class="uk-margin">{{ pay.descripcion }}</p>
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
      paymentmethods: []
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
         console.log(this.paymentmethods)
     })
     .catch(error => {

     })
   },

   generatePayment(){

    console.log('owo')

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
         console.log('weewewewew')
         this.Pay(response.data.id)
       })
       .catch(error => {
         // Handle error.
         console.log('An error occurred:', error);
       });
   },

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
          var order = response.data
          if(order.url && this.despacho){
          window.location.href = order.url + "?token=" + order.token
        }
      })
      .catch(error => {

      })

    }
  }

}
</script>
