// component to make POST request 
// button to display status of follow request
// action button to serve purpose of likes, follows, logout
<template>
  <div>
    <button></button>
  </div>
</template>

<script>
export default {
  name: "action-button",
  props: {
    // this is used to pass down from parent what's this 'action' button's purpose
    button_type: String,
    tweet_id: Number,
    user_id: Number
  },
  data() {
    return {
      likes_data: value,
      likes_method: value,
      follows_data: value,
      follows_method: value,
      login_token: value,
    };
  },
  methods: {
    likes() {
      // a check will be done first to see if this has already been liked by the user
      this.$axiom
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          method: this.likes_method,
          data: this.likes_post_data,
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
    follows() {
      // a check will be done first to see if the user has already been followed
      this.$axiom
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: this.follows_method,
          data: this.follows_data,
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
    user_logout() {
      // this will log the user out and redirects them back to the login page
      this.$axiom
        .request({
          url: "https://tweeterest.ga/api/login",
          method: "DELETE",
          data: {
            loginToken: this.login_token,
          },
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