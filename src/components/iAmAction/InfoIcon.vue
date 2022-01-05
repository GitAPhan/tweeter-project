// component to make GET request
// display follows, likes, 
<template>
  <div>
    <button></button>
  </div>
</template>

<script>
export default {
  name: "info-icon",
  props: {
    tweetId: Number,
    commentId: Number,
    userId: Number,
  },
  data() {
    return {
      likes_url: value,
      likes_data: value,
      followers_data: value,
    };
  },
  methods: {
    display_likes_counter() {
      // this ICON will be used to diplay number of likes on specific product
      this.$axiom
        .request({
          url: this.likes_url,
          method: "GET",
          data: this.likes_data,
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
    display_followers_counter() {
      // this ICON will be used to display the number of followers a user has
      this.$axiom
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
};
</script>

<style lang="scss" scoped>
</style>