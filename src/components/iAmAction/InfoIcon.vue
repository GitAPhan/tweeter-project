// component to make GET request
// display follows, likes, 
<template>
  <div>
    <img
      v-if="this.icon_type == 'like' && this.like_indicator == false"
      src="@/assets/heartOff.png"
      alt="empty heart-shaped like icon"
      @click="like_request"
    />
    <img
      v-if="this.icon_type == 'like' && this.like_indicator"
      src="@/assets/heartOn.png"
      alt="red heart-shaped liked icon"
      @click="like_request"
    />
    <img
      v-else-if="this.icon_type == 'comment'"
      src="@/assets/commentIcon.png"
      alt="speech bubble shaped comment icon"
    />
  </div>
</template>

<script>
export default {
  name: "info-icon",
  props: {
    tweet_info: Object,
    commentId: Number,
    userId: Number,
    icon_type: String,
  },
  data() {
    return {
      like_indicator: false,
    };
  },
  methods: {
    display_likes_counter() {
      // this ICON will be used to diplay number of likes on specific product
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          params: {
            tweetId: this.tweet_info.tweetId,
          },
        })
        .then((response) => {
          var user_like = response.data;
          if (JSON.stringify(user_like) != "[]") {
            for (var i = 0; i < user_like.length; i++) {
              if (
                user_like[i].userId == this.$cookies.get("loginToken").userId
              ) {
                // change the like icon to liked
                this.like_indicator = true;
              }
            }
          }
        })
        .catch((error) => {
          error;
        });
    },
    like_request() {
      if (this.like_indicator == false) {
        this.$axios
          .request({
            url: "https://tweeterest.ga/api/tweet-likes",
            method: "POST",
            data: {
              loginToken: this.$cookies.get("loginToken").loginToken,
              tweetId: this.tweet_info.tweetId,
            },
          })
          .then((response) => {
            this.like_indicator = true;
            response;
          })
          .catch((error) => {
            error;
          });
      } else {
         this.$axios
          .request({
            url: "https://tweeterest.ga/api/tweet-likes",
            method: "DELETE",
            data: {
              loginToken: this.$cookies.get("loginToken").loginToken,
              tweetId: this.tweet_info.tweetId,
            },
          })
          .then((response) => {
            this.like_indicator = false;
            response;
          })
          .catch((error) => {
            error;
          });
      }
    },
    display_followers_counter() {
      // this ICON will be used to display the number of followers a user has
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/followers",
          method: "GET",
          data: this.followers_data,
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
  },
  created() {
    this.display_likes_counter();
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 15px;
}
</style>