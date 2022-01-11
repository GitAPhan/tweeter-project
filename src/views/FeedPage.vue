<template>
  <div>
    <h1>Feed Page</h1>
    <header-container></header-container>

    <article>
      <h2>all followed tweets sent here</h2>
      <tweet-container tweet_type="feed" :user_id="this.$cookies.get('loginToken').userId" :key="this.refresh_key"></tweet-container>
    </article>
  </div>
</template>

<script>
import TweetContainer from "@/components/mainComponents/TweetContainer.vue";
import HeaderContainer from "@/components/mainComponents/HeaderContainer.vue";
export default {
  name: "feed-page",
  components: {
    HeaderContainer,
    TweetContainer,
  },
  computed: {
    refresh_key() {
      return this.$store.state["refresh_key"];
    },
  },
  created() {
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