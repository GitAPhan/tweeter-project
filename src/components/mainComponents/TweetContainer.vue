// component to contain showtweet(s)
<template>
  <div>
    <comment-container
      class="comment_container"
      ref="comment_container"
      @close_comment_display="close_comment_display"
    ></comment-container>
    <view-content
      content_type="tweet"
      v-for="tweet of tweets"
      :key="tweet.tweetId"
      :tweet="tweet"
      @open_comment_display="open_comment_display"
    >
    </view-content>
  </div>
</template>

<script>
import CommentContainer from "@/components/mainComponents/CommentContainer.vue";
import ViewContent from "@/components/iEditContent/ViewContent.vue";

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
    open_comment_display() {
      this.$refs.comment_container.$el.style.display = "grid";
    },
    close_comment_display() {
      this.$refs.comment_container.$el.style.display = "none";
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
    this.$root.$on("close_comment_display", this.close_comment_display);
  },
  components: {
    ViewContent,
    CommentContainer,
    // InfoIcon,
  },
};
</script>

<style lang="scss" scoped>
.comment_container {
  display: none;
  position: absolute;
  place-items: center;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: rgba(201, 199, 199, 0.96);
  z-index: 3;
}
</style>