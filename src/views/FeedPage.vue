<template>
  <div>
    <h1>Feed Page</h1>
    <nav-bar></nav-bar>
    <section>
      <h2>send tweets here</h2>
      <form :key="key+1" action="javascript:void(0)">
        <input
          type="text"
          maxlength="140"
          required
          placeholder="What's happening?"
          ref="tweet_content"
        />
        <input
          type="url"
          placeholder="image url here"
          title="Please input picture URL here"
          ref="imageUrl"
        />
        <input type="submit" value="Tweet" @click="post_tweet" />
      </form>
    </section>
    <article>
      <h2>all followed tweets sent here</h2>
      <posted-tweets :key="key"></posted-tweets>
    </article>
  </div>
</template>

<script>
import PostedTweets from "@/components/PostedTweets.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "feed-page",
  components: {
    NavBar,
    PostedTweets,
  },
  data() {
      return {
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