// component to contain submitlogout, navigation buttons, submittweet
<template>
  <div>
    <button @click="goTo_home">Home</button>
    <button @click="goTo_discover">Discover</button>
    <button @click="goTo_myProfile">Profile</button>
    <action-button
      :action_type="logout_status"
      @logout_action="logout"
    ></action-button>
    <submit-content
      :submit_status="submit_status"
      :submit_type="submit_type"
      :unique_key="key"
      @tweet_submit_data="submit_tweet"
    ></submit-content>
  </div>
</template>

<script>
import ActionButton from "@/components/iAmAction/ActionButton.vue";
import SubmitContent from "@/components/iEditContent/SubmitContent.vue";

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
      submit_type: 2,
      submit_status: "Tweet",
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
      this.$router
        .push({
          name: "ProfilePage",
          params: {
            // userId is passed to the profilePage to determine which profile to show
            userId: userId,
          },
        })
        .catch(() => {
          this.$router
            .push({
              name: "FeedPage",
            })
            .then(() => {
              this.$router.push({
                name: "ProfilePage",
                params: {
                  // userId is passed to the profilePage to determine which profile to show
                  userId: userId,
                },
              });
            });
        });
    },
    logout() {
      this.logout_status = "logging out, please wait...";
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
        .then(() => {
          // delete cookies and redirect to LandingPage
          this.$cookies.remove("loginToken");
          this.$router.push({
            name: "LandingPage",
          });
        })
        .catch((error) => {
          // write error code here
          this.logout_status = "logout unsuccessful, try again!";
          error;
          setTimeout(() => {
            this.logout_status = "logout";
          }, 2000);
        });
    },
    submit_tweet(data) {
      this.submit_status = "Please wait...";
      // this function is to submit tweets
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "POST",
          data: data,
        })
        .then((response) => {
          this.submit_status = "Tweet successful!";

          //   this is to force refresh the component
          setTimeout(() => {
            this.submit_status = "Tweet";
            this.key++;
            this.$store.commit("update_refresh_key", this.refresh_key++);
          }, 1000);
          console.log(response);
        })
        .catch((error) => {
          this.submit_status = "Tweet unsuccessful, please try again!";
          //   this is to force refresh the component
          setTimeout(() => {
            this.submit_status = "Tweet";
            this.key++;
          }, 1000);
          //   error code neeeded here
          error;
        });
    },
  },
  computed: {
    user_profile() {
      return this.$store.state["user_profile"];
    },
    refresh_key() {
      return this.$store.state["refresh_key"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>