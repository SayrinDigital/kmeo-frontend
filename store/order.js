import Cookies from 'js-cookie'
import axios from 'axios'

export const state = () => ({
  orderId: null,
  orderStatus: null
})

export const mutations = {
   setOrderId(state, orderId){
     state.orderId = orderId
   },
   setStatus(state, status){
     state.orderStatus = status
   },
   add(state, orderId){
     state.orderId = orderId
     Cookies.set('order', state.orderId)
   },
   emptyOrder(state){
     state.orderId = null
     Cookies.set('order', state.orderId)
   }
}

export const actions = {
  async getStatus({state, commit}, id) {

    if(state.orderId){
      await this.$axios.post('https://kmeo.cl/flow/examples/payments/getStatusByCommerceId.php',{
          orderId: state.orderId
      })
        .then((res) => {
            commit('setStatus', res.data)
        })
    }
  },
}

export const getters = {
  orderId: state => {
    return state.orderId
  },
  status: state => {
    return state.orderStatus
  }
}
