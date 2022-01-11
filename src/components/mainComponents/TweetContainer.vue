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
    tweet_type: String,
  },
  methods: {
    get_tweets() {
      // tweets variable
      var tweets = [];
      var user_follows = [this.$cookies.get("loginToken")];
      // request to grab all users that the current profile follows
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          params: {
            userId: this.user_id,
          },
        })
        .then((response) => {
          // console.log(response);
          for (var i = 0; i < response.data.length; i++) {
            user_follows[i + 1] = response.data[i];
          }
        })
        .catch((error) => {
          error;
        })
        .then(() => {
          tweets = this.all_tweets;
          var tweets_final = [];
          var user_id = this.user_id;
          // conditional to see what type of requests to run
          if (this.tweet_type == "profile") {
            // sort through the array of tweets to only have tweets of the profile show
            tweets_final = tweets.filter((a) => {
              if (a.userId == user_id) {
                return a;
              }
            });
          } else if (this.tweet_type == "feed") {
            for (var i = 0; i < user_follows.length; i++) {
              var new_tweets = tweets.filter((a) => {
                if (a.userId == user_follows[i].userId) {
                  return a;
                }
              });
              tweets_final = tweets_final.concat(new_tweets);
            }
          } else if (this.tweet_type == "discover") {
            tweets_final = tweets;
            for (i = 0; i < user_follows.length; i++) {
              tweets_final = tweets_final.filter((a) => {
                if (a.userId != user_follows[i].userId) {
                  return a;
                }
              });
            }
          }
          // convert createdAt to a workable timestamp
          for (i = 0; i < tweets_final.length; i++) {
            // var newTimestamp = tweets[i].createdAt;
            tweets_final[i].createdAt = this.timestamp_conversion(
              tweets_final[i].createdAt
            );
          }
          tweets_final.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          });
          this.tweets = tweets_final;
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
      // an error kept popping up, read properties of undefined (reading '$el')
      // found a trick to use $nextTick that apperently waits for dom rendering, seems to work so far
      this.$nextTick(() => {
        if (this.$refs.comment_container != undefined) {
          this.$refs.comment_container.$el.style.display = "none";
        }
      });

      // this is to re-enable scrolling
      document.body.style.overflow = "";
      // empty object to replace value of tweet_comments and highlighted_tweets
      var empty_object = {};
      this.$store.commit("update_tweet_comments", empty_object);
      this.$store.commit("update_highlighted_tweet", empty_object);
      // this will reload the tweet_container
      this.$store.commit("update_refresh_key", this.refresh_key + 1);
    },
  },
  data() {
    return {
      tweets: {},
    };
  },
  created() {
    this.$store.dispatch("get_all_tweets");
  },
  mounted() {
    this.get_tweets();
  },
  updated() {
    this.$nextTick(() => {
      this.$root.$on("close_comment_display", this.close_comment_display);
    });
  },
  components: {
    ViewContent,
    CommentContainer,
    // InfoIcon,
  },
  computed: {
    all_tweets() {
      return this.$store.state["all_tweets"];
    },
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