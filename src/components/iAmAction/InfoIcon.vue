// component to make GET request
// display follows, likes, 
<template>
  <div ref="icon_container">
    <p v-if="this.icon_type === 'like'" class="badge">
      {{ this.like_quantity }}
    </p>
    <p v-else-if="this.icon_type === 'comment'" class="comment_badge">
      {{ this.comment_quantity }}
    </p>
    <img
      v-if="this.icon_type === 'like' && this.like_indicator === false"
      src="@/assets/heartOff.png"
      alt="empty heart-shaped like icon"
      @click="like_request"
    />
    <img
      v-else-if="this.icon_type === 'like' && this.like_indicator"
      src="@/assets/heartOn.png"
      alt="red heart-shaped liked icon"
      @click="like_request"
    />
    <img
      v-else-if="this.icon_type === 'comment'"
      src="@/assets/commentIcon.png"
      alt="speech bubble shaped comment icon"
      @click="open_comment_display"
    />
    <img
      v-else-if="this.icon_type === 'close'"
      src="@/assets/cancelIcon.png"
      alt="black and white 'X' close icon"
      @click="close_comment_display"
    />
    <img
      v-else-if="this.icon_type === 'edit'"
      src="@/assets/editIcon.png"
      alt="black and white edit icon"
      @click="edit_content"
    />
  </div>
</template>

<script>
export default {
  name: "info-icon",
  props: {
    tweet_info: Object,
    icon_type: String,
    url: String,
    content_type: String,
  },
  data() {
    return {
      like_indicator: false,
      like_quantity: undefined,
      comment_quantity: undefined,
    };
  },
  methods: {
    close_comment_display() {
      // global emit to hide tweet_container
      this.$root.$emit("close_comment_display");
    },
    // this will emit to parent to trigger events
    open_comment_display() {
      // request to grab all comments relating to the content
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          params: {
            tweetId: this.tweet_info.tweetId,
          },
        })
        .then((response) => {
          this.$store.commit("update_tweet_comments", response.data);
          this.$store.commit("update_highlighted_tweet", this.tweet_info);
          // emit to parent to hide highlighted tweet
          this.$emit("open_comment_display");
        })
        .catch((error) => {
          error;
        })
        .then(() => {
          // this is to scroll the window to the top and lock scrolling
          window.scrollTo({ top: 0, behavior: "smooth" });
          document.body.style.overflow = "hidden";
        });
    },
    display_likes_counter() {
      // disable like button here
      this.$nextTick(() => {
        if (this.$refs.icon_container != undefined) {
          this.$refs.icon_container.style.opacity = 0;
          this.$refs.icon_container.style.pointerEvents = "none";
        }
      });
      // this will determine which params to use
      if (this.content_type == "tweet") {
        var params = {
          tweetId: this.tweet_info.tweetId,
        };
      } else if (this.content_type == "comment") {
        params = {
          commentId: this.tweet_info.commentId,
        };
      }
      this.$axios
        .request({
          url: this.url,
          params: params,
        })
        .then((response) => {
          var user_like = response.data;
          for (var i = 0; i < user_like.length; i++) {
            if (user_like[i].userId == this.$cookies.get("loginToken").userId) {
              // change the like icon to liked
              this.like_indicator = true;
            }
          }
          if (user_like.length > 0) {
            this.like_quantity = user_like.length;
          }
        })
        .catch((error) => {
          error;
        })
        .then(() => {
          // re-enable like button
          this.$nextTick(() => {
            if (this.$refs.icon_container != undefined) {
              this.$refs.icon_container.style.pointerEvents = "";
              this.$refs.icon_container.style.opacity = "";
            }
          });
        });
    },
    display_comment_counter() {
      if (this.content_type === "tweet") {
        // disable like button here
        this.$nextTick(() => {
          if (this.$refs.icon_container != undefined) {
            this.$refs.icon_container.style.opacity = 0;
            this.$refs.icon_container.style.pointerEvents = "none";
          }
        });
        // GET request to get comment counter
        this.$axios
          .request({
            url: "https://tweeterest.ga/api/comments",
            params: {
              tweetId: this.tweet_info.tweetId,
            },
          })
          .then((response) => {
            var comments = response.data;
            if (comments.length > 0) {
              this.comment_quantity = comments.length;
            }
          })
          .catch((error) => {
            error;
          })
          .then(() => {
            // re-enable like button
            this.$nextTick(() => {
              if (this.$refs.icon_container != undefined) {
                this.$refs.icon_container.style.pointerEvents = "";
                this.$refs.icon_container.style.opacity = "";
              }
            });
          });
      }
    },
    // this will take care of sending request of POST or DELETE, depending on the status of like_indicator(data)
    like_request() {
      // data for request
      var request_data = {
        loginToken: this.$cookies.get("loginToken").loginToken,
      };
      if (this.content_type == "tweet") {
        request_data.tweetId = this.tweet_info.tweetId;
      } else if (this.content_type == "comment") {
        request_data.commentId = this.tweet_info.commentId;
      }

      if (this.like_indicator == false) {
        this.$axios
          .request({
            url: this.url,
            method: "POST",
            data: request_data,
          })
          .then((response) => {
            // changing the value of like_indicator will determine which heart icon to show
            this.like_indicator = true;
            // this will dynamically increase the counter without making new request
            this.like_quantity++;
            response;
          })
          .catch((error) => {
            error;
          });
      } else {
        // the DELETE request
        this.$axios
          .request({
            url: this.url,
            method: "DELETE",
            data: request_data,
          })
          .then((response) => {
            this.like_indicator = false;
            // this will dynamically decrease the counter without making new request
            this.like_quantity--;
            response;
          })
          .catch((error) => {
            error;
          });
      }
    },
  },
  mounted() {
    this.display_likes_counter();
    if (this.icon_type === "comment") {
      this.display_comment_counter();
    }
  },
  computed: {
    refresh_key() {
      return this.$store.state["refresh_key"];
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 25px;
}

.badge {
  text-align: center;
  font-size: 0.7em;
  position: absolute;
  top: -5px;
  right: 9px;
  pointer-events: none;
}

.comment_badge {
  text-align: center;
  font-size: 0.7em;
  position: absolute;
  top: 24px;
  right: 9px;
  pointer-events: none;
}
</style>