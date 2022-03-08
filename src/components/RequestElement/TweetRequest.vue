<template>
  <div>
    <h1>tweet request</h1>
  </div>
</template>

<script>

export default {
  name: "tweet-request",

  components: {
  },
  data() {
    return {
    };
  },
  props: {
    request_type: String,
  },
  methods: {
    // all actions related to storing tweets are stored here
    // axios request for GET, POST, PATCH, DELETE
    db_request(request_data, method) {
      // variables
      var tweets = {};
      var status = undefined
      this.$axios
        .request({
          url: "http://localhost:5000/api/tweets",
          method: method,
          data: request_data,
        })
        .then((res) => {
          tweets = res.data;
          status = true
        })
        .catch((err) => {
          tweets = err.response.data;
          status = false
        }).then(() => {
          // status check
          if (status && method === "DELETE") {
            // for delete just display the message
            this.$emit("update_status_message", tweets, 3000)
          } else if (status) {
            this.$emit("tweet_response", tweets)
          } else {
            // update status message with error message from database
            this.$emit("update_status_message", tweets, 3000)
          }
        })
    }, // GET tweet
    get(keyname, keyvalue) {
      // tweet params  
      var tweet_params = {};

      // figure out params
      if (keyname != undefined) {
        tweet_params[keyname] = keyvalue
      }
      // axios 
      this.db_request(tweet_params, "GET")
    },
    // POST tweet
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
    }, 
    // PATCH tweet
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
    }, 
    // DELETE tweet
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
    get_feed() {
      // update status message
      this.$emit("update_status_message", "loading tweets..", 3000)
      // call function to prepare data for request from database
      this.get("feedId, this.$cookies.get('loginToken').userId")
    },
    get_discover() {
      // update status message
      this.$emit("update_status_message", "loading tweets..", 3000)
      // call function to prepare data for request from database
      this.get("discoverId, this.$cookies.get('loginToken').userId")
    }
  },
  mounted() {
    if (this.request_type === "feed") {
      this.get_feed()
    } else if (this.request_type === 'discover') {
      this.get_discover()
    } else {
      console.log(this.request_type)
    }
  }

};
</script>

<style lang="scss" scoped>
</style>