<template>
  <div>
    <h1>Feed Page</h1>
    <header-container></header-container>
    
    <article>
      <h2>all followed tweets sent here</h2>
      <posted-tweets :key="key"></posted-tweets>
    </article>
  </div>
</template>

<script>
import PostedTweets from "@/components/PostedTweets.vue";
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderContainer from '../components/mainComponents/HeaderContainer.vue';
export default {
  name: "feed-page",
  components: {
    HeaderContainer,
    PostedTweets,
  },
  data() {
      return {
        //   used to force refresh component when key is changed
          key: 0
      }
  },
  methods: {
    post_tweet() {
      var tweet_request = {
        loginToken: this.$cookies.get("loginToken").loginToken,
        content: this.$refs.tweet_content.value,
      };
      // conditional to add imageUrl keypair when value isn't ""
      if (this.$refs.imageUrl.value != "") {
        tweet_request.imageUrl = this.$refs.imageUrl.value;
      }

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "POST",
          data: tweet_request,
        })
        .then((response) => {
          console.log(response);
        //   this is to force refresh the component
        this.key++
        })
        .catch((error) => {
          //   error code neeeded here
          error;
        });
    },
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