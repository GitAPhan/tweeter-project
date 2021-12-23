<template>
  <div>
    <button @click="goTo_home">Home</button>
    <button @click="goTo_discover">Discover</button>
    <button @click="goTo_myProfile">Profile</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      currentProfile: undefined,
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
          response;
        })
        .catch((error) => {
          // write error code here
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