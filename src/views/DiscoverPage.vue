<template>
  <div>
    <h1>Discover Page Page</h1>
    <header-container />

    <article>
      <h2>discover new tweets here</h2>
      <tweet-container :view_category="'discover'" />
    </article>
  </div>
</template>

<script>
import TweetContainer from "@/components/ContainerElement/TweetContainer.vue";
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