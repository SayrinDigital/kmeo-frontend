import Cookies from 'js-cookie'

export const state = () => ({
  orderId: null
})

export const mutations = {
   setOrderId(state, orderId){
     state.orderId = orderId
   },
   add(state, orderId){
     state.orderId = orderId
     Cookies.set('order', state.orderId)
   },
   emptyOrder(state){
     state.orderId = 0
     Cookies.set('order', state.orderId)
   }
}

export const getters = {
  orderId: state => {
    return state.orderId
  }
}
