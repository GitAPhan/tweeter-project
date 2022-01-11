<template>
  <div>
    <h1>Discover Page Page</h1>
    <header-container></header-container>

    <article>
      <h2>all followed tweets sent here</h2>
      <tweet-container
        tweet_type="discover"
        :user_id="this.$cookies.get('loginToken').userId"
        :key="this.refresh_key"
      ></tweet-container>
    </article>
  </div>
</template>

<script>
import TweetContainer from "@/components/mainComponents/TweetContainer.vue";
import HeaderContainer from "@/components/mainComponents/HeaderContainer.vue";
export default {
  name: "discover-page",
  components: {
    HeaderContainer,
    TweetContainer,
  },
  computed: {
    refresh_key() {
      return this.$store.state["refresh_key"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>