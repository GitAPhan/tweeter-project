<template>
  <div>
      <view-content
      content_type='tweets'
      v-for="tweet of tweets"
      :key="tweet.tweetId"
      :unfiltered_tweet="tweet"
      @edit_tweet='edit_tweet'
      ></view-content>
      <!-- submit content would have priority when active -->
        <submit-content v-if="this.tweet_edit !== undefined"
        :tweet="this.tweet_edit">
        </submit-content>
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
      edit_tweet(payload) {
        //   tweet info emitted from ViewContent will be stored in data to be passed down to SubmitContent
          this.tweet_edit = payload;
      }
    //   all actions related to storing tweets are stored here
    grab_tweets(payload) {
      // store tweets here
      var tweets = [];
      // tweet params  
      var tweet_params = {}; 

      // figure out params
      if (this.userId != "undefined") {
        // userId is a prop passed down from the container
        tweet_params = {
          params: {
            userId: this.userId,
          },
        };
      }

      // request to grab tweets
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          tweet_params,
        })
        .then((response) => {
          tweets = response.data;
          //   order tweets by time
          tweets.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          });
          //   store ordered tweets in data
          this.tweets = tweets;
        })
        .catch((error) => {
          console.log(error);
          error;
        });
    },
    // Post request tweets
    post_request(payload) {
      // variables
      var tweet = {};
      var old_tweet_index = {};
      var content = undefined;
      var imageUrl = undefined;
      var tweets = this.tweets;
      // request data
      var request_data = {};
      var request_method = undefined;

      // axios request
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: request_method,
          data: request_data,
        })
        .then((response) => {
          // tweet stored here
          tweet = response.data; // need to run a delete to view what the response looks like
        })
        .catch((error) => {
          error;
        });

      //   to only run if the request_method is POST
      if (request_method === "POST") {
        // adding tweet to this.tweet array
        tweets.unshift(tweet);
      }

      //   to only run if the request_method is PATCH
      if (request_method === "PATCH") {
        // find index of tweet
        old_tweet_index = tweets.findIndex((x) => x.tweetId === tweet.tweetId);
        // replace tweet
        tweets[old_tweet_index]['content'] = tweet.content;
        // replace tweet image only if present
        if(tweet.imageUrl !== null) {
            tweets[old_tweet_index]['tweetImageUrl'] = tweet.imageUrl;
        }
      }

      //   to only run if the request_method is DELETE
      if (request_method === "DELETE") {
        // find index of tweet
        old_tweet_index = tweets.findIndex((x) => x.tweetId === tweet.tweetId);
        // delete tweet from array
        tweets.splice(old_tweet_index, 1);
      }

      //   store ordered tweets in data
      this.tweets = tweets;
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