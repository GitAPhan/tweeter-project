// component to contain submitlogout, navigation buttons, submittweet
<template>
  <div>
    <button @click="goTo_home">Home</button>
    <button @click="goTo_discover">Discover</button>
    <button @click="goTo_myProfile">Profile</button>
    <submit-content
      submit_type="2"
      :unique_key="key"
      @tweet_submit_data="submit_tweet"
    ></submit-content>
    <action-button
      :action_type="logout_status"
      @logout_action="logout"
    ></action-button>
  </div>
</template>

<script>
import ActionButton from "@/component/iAmAction/ActionButton.vue";
import SubmitContent from "@/component/iEditContent/SubmitContent.vue";

export default {
  name: "header-container",
  components: {
    ActionButton,
    SubmitContent,
  },
  data() {
    return {
      currentProfile: undefined,
      //   used to force refresh component when key is changed
      key: 0,
      logout_status: "logout",
    };
  },
  methods: {
    goTo_home() {
      this.$router.push({
        name: "FeedPage",
      });
    },
    goTo_discover() {
      this.$router.push({
        name: "DiscoverPage",
      });
    },
    goTo_myProfile() {
      // go to profile function.
      var userId = this.$cookies.get("loginToken").userId;
      this.$router.push({
        name: "ProfilePage",
        params: {
          // userId is passed to the profilePage to determine which profile to show
          userId: userId,
        },
      });
    },
    logout() {
      // logout axios request
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/login",
          method: "DELETE",
          data: {
            //   grabbed the loginToken from cookies
            loginToken: this.$cookies.get("loginToken").loginToken,
          },
        })
        .then((response) => {
          // delete cookies and redirect to LandingPage
          this.$cookies.remove("loginToken");
          this.$router.push({
            name: "LandingPage",
          });
          this.logout_status = "logout successful";
          response;
        })
        .catch((error) => {
          // write error code here
          this.logout_status = "logout unsuccessful, try again!";
          error;
          setTimeout(function () {
            this.logout_status = "logout";
          }, 2000);
        });
    },
    submit_tweet(data) {
      // this function is to submit tweets
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "POST",
          data: data,
        })
        .then((response) => {
          console.log(response);
          //   this is to force refresh the component
          this.key++;
        })
        .catch((error) => {
          //   error code neeeded here
          error;
        });
    },
  },
  computed: {
    user_profile() {
      return this.$store.state["user_profile"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>