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
    refresh_key: 0,
    all_users: [],
    user_profile: {},
    tweet_comments: {},
    highlighted_tweet: {},
    all_tweets: [],
    default_profile_banner: 'https://images.unsplash.com/photo-1605778336713-0a7fb1b80c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80',
    default_profile_picture: 'https://images.unsplash.com/photo-1530842128367-9e448d986a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  mutations: {
    update_refresh_key(state, payload) {
      state.refresh_key = payload;
    },
    update_all_tweets(state, payload) {
      state.all_tweets = payload;
    },
    update_all_users(state, payload) {
      state.all_users = payload;
    },
    update_user_profile(state, payload) {
      state.user_profile = payload;
    },
    update_tweet_comments(state, payload) {
      state.tweet_comments = payload;
    },
    update_highlighted_tweet(state, payload) {
      state.highlighted_tweet = payload;
    }
  },
  actions: {
    // // function to get all users and update all_users($store.state)
    // get_all_users(store) {
    //   axios.request({
    //     url: "http://localhost:5000/api/users",
    //   }).then((response) => {
    //     // console.log(response);
    //     store.commit('update_all_users', response.data)
    //   }).catch((error) => {
    //     console.log(error);
    //     // need to write an error code that makes sense for this request
    //     error
    //   })
    // },
    // get_all_tweets(store) {
    //   // request to get all tweets store it in state
    //   axios.request({
    //     url: 'http://localhost:5000/api/tweets'
    //   }).then((response) => {
    //     store.commit('update_all_tweets', response.data)
    //   }).catch((error) => {
    //     // need to write error code here
    //     error
    //   })
    // }
  },
})
