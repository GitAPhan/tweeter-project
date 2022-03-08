<template>
  <div>
    <view-content
      content_type="tweets"
      v-for="tweet of tweets"
      :key="tweet.tweetId"
      :unfiltered_tweet="tweet"
      @edit_tweet="edit_tweet"
    ></view-content>
    <!-- submit content would have priority when active -->
    <submit-content v-if="this.tweet_edit !== undefined" :tweet="this.tweet_edit"></submit-content>
  </div>
</template>

<script>
import ViewContent from "@/components/VisualElement/ViewContent.vue";
import SubmitContent from "@/components/VisualElement/SubmitContent.vue";

export default {
  name: "tweet-request",
  components: {
    ViewContent,
    SubmitContent,
  },
  methods: {
    //   all actions related to storing tweets are stored here
    // axios request for GET, POST, PATCH, DELETE
    db_request(request_data, method) {
      // variables
      var tweet = {};
      var status = undefined
      this.$axios
        .request({
          url: "http://localhost:5000/api/tweets",
          method: method,
          data: request_data,
        })
        .then((res) => {
          tweet = res.data,
            status = true
        })
        .catch((err) => {
          tweet = err.response.data,
            status = false
        }).then(() => {
          var response = {
            "tweets": tweet,
            "status": status
          }
          return response
        })
    }, // GET tweet
    get(keyname, keyvalue) {
      // tweet params  
      var tweet_params = {};

      // figure out params
      if (keyname != undefined) {
        tweet_params[keyname] = keyvalue
      }

      // axios request
      return this.db_request(tweet_params, "GET")
    }, // POST tweet
    post(payload) {
      // build request data
      var request_data = {
        "data": {
          "loginToken": this.$cookies.get('loginToken').loginToken
        }
      };
      for (var i = 1; i < payload.length; i++) {
        if (payload[i] != undefined) {
          request_data['data'][Object.keys(payload)[i]] = payload[i]
        }
      }
      // axios request
      return this.db_request(request_data, "POST")
    }, // PATCH tweet
    patch(payload) {
      // build request data
      var request_data = {
        "data": {
          "loginToken": this.$cookies.get('loginToken').loginToken
        }
      };
      for (var i = 0; i < payload.length; i++) {
        if (payload[i] != undefined) {
          request_data['data'][Object.keys(payload)[i]] = payload[i]
        }
      }
      // axios request
      return this.db_request(request_data, "PATCH")
    }, // DELETE tweet
    delete(payload) {
      // build request data
      var request_data = {
        "data": {
          "loginToken": this.$cookies.get('loginToken').loginToken
        }
      };
      for (var i = 0; i < payload.length; i++) {
        if (payload[i] != undefined) {
          request_data['data'][Object.keys(payload)[i]] = payload[i]
        }
      }
      // axios request
      return this.db_request(request_data, "DELETE")
    },
  },
  data() {
    return {
      // only ordered tweets are stored here
      tweets: [],
      loginToken: [this.$cookies.get("loginToken")],
      tweet_edit: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>