<template>
  <div>
    <h1>Feed Page</h1>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "feed-page",
  components: {
    NavBar,
  },
  created() {
    //   grab all users and store in $store.state
    this.$store.dispatch("get_all_users");
    // check to see if there is a loginToken present
    // if not then user will be redirected to the landing page
    if (this.$cookies.get("loginToken") == null) {
      this.$router.push({
        name: "LandingPage",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>