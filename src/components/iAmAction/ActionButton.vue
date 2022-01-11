// component to make POST request 
// button to display status of follow request
// action button to serve purpose of likes, follows, logout
<template>
  <div>
    <button
      v-if="this.action_type == 'follows'"
      @click="follow_profile"
      ref="follow_button"
    >
      {{ follow_title }}
    </button>
    <button v-else @click="user_logout">{{ action_type }}</button>
  </div>
</template>

<script>
export default {
  name: "action-button",
  props: {
    // this is used to pass down from parent what's this 'action' button's purpose
    action_type: String,
    tweet_id: Number,
    user_id: Number,
    // this will be passed down by the ProfilePage to determine if the user has followed the profile
    follow_status: Boolean,
  },
  data() {
    return {
      follow_title: undefined,
    };
  },
  methods: {
    // function to emit to parent to follow profile
    follow_profile() {
      this.$emit("follow_profile");
    },
    // function to emit to parent to logout user
    user_logout() {
      this.$emit("logout_action");
    },
    change_follow_status() {
      // change the title of the follow button
      if (
        this.follow_status &&
        this.user_id != this.$cookies.get("loginToken").userId
      ) {
        this.follow_title = "unfollow";
      } else if (
        this.follow_status == false &&
        this.user_id != this.$cookies.get("loginToken").userId
      ) {
        this.follow_title = "follow";
      } else {
        // to disable button if there is an error
        this.follow_title = "error";
        this.$refs.follow_button.disabled = true;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.change_follow_status();
    });
  },
};
</script>

<style lang="scss" scoped>
</style>