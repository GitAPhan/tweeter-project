<template>
  <div>
    <h1>Feed Page</h1>
    <header-container @key_change="key_change"></header-container>

    <article>
      <h2>all followed tweets sent here</h2>
      <tweet-container :key="key"></tweet-container>
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
  data() {
    return {
      //   used to force refresh component when key is changed
      key: 0,
      followed_tweets: {},
    };
  },
  methods: {
    key_change(data) {
      this.key = data;
    },
    get_all_followed_users() {
      // this will grab all the followed users
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          params: {
            userId: this.$cookies.get("loginToken").userId,
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
  mounted() {
    this.get_all_followed_users();
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