import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'
import axios from 'axios'


axios.defaults.headers.common['X-Api-Key'] = 'l7m1CECxo7f0im9UAyKkvD1xq0xo9zON4tdzKx5jYxot8'
axios
cookies

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    all_users: {},
    user_profile: {}
  },
  mutations: {
    update_all_users(state, payload) {
      state.all_users = payload;
    },
    update_user_profile(state, payload) {
      state.user_profile = payload;
    }
  },
  actions: {
    // function to get all users and update all_users($store.state)
    get_all_users(store) {
      axios.request({
        url: "https://tweeterest.ga/api/users",
      }).then((response) => {
        // console.log(response);
        store.commit('update_all_users', response.data)
      }).catch((error) => {
        console.log(error);
        // need to write an error code that makes sense for this request
        error
      })
    }
  },
})
