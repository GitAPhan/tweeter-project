import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import cookies from 'vue-cookies'

// axios.defaults.headers.common['X-Api-Key'] = 'l7m1CECxo7f0im9UAyKkvD1xq0xo9zON4tdzKx5jYxot8'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookies = cookies

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

