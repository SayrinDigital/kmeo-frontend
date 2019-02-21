import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let cart = []
    let orderId = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      //orderId = (parsed.order) || null
      cart = (parsed.cart && JSON.parse(parsed.cart)) || []
    }
    commit('cart/setItems', cart)
    //commit('order/setOrderId', orderId)
  }
}
