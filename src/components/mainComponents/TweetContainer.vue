// component to contain showtweet(s)
<template>
  <div>
    <view-content
      content_type="tweet"
      v-for="tweet of tweets"
      :key="tweet.tweetId"
      :tweet="tweet"
    >
    <!-- <info-icon ></info-icon> -->
    </view-content>
  </div>
</template>

<script>
import ViewContent from "@/components/iEditContent/ViewContent.vue";
// import InfoIcon from "@/components/iAmAction/InfoIcon.vue";

export default {
  name: "tweet-container",
  props: {
    user_id: Number,
  },
  methods: {
    get_tweets() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          params: {
            userId: this.user_id,
          },
        })
        .then((response) => {
          var tweets = response.data;
          // convert createdAt to a workable timestamp
          for (var i = 0; i < tweets.length; i++) {
            // var newTimestamp = tweets[i].createdAt;
            tweets[i].createdAt = this.timestamp_conversion(
              tweets[i].createdAt
            );
          }

          tweets.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          });
          this.tweets = tweets;
        })
        .catch((error) => {
          error;
        });
    },
    timestamp_conversion(payload) {
      var timestamp = new Date(payload).getTime();
      return timestamp;
    },
  },
  data() {
    return {
      content_type: "tweet",
      tweets: {},
    };
  },
  mounted() {
    this.get_tweets();
  },
  components: {
    ViewContent,
    // InfoIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>