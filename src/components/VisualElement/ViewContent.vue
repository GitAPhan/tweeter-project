<template>
  <div>
    <!-- tweet format -->
    <article class="tweetCard" v-if="this.content_type == 'tweet'">
      <h3 class="tweetContent">{{ tweet.content }}</h3>
      <img
        class="tweetImage"
        v-if="this.tweet.imageUrl !== null || this.tweet.tweetImageUrl !== null"
        :src="tweet.tweetImageUrl"
        alt="tweeted picture"
      />

      <div class="userInfo">
        <img
          @click="go_to_profile"
          class="profileImage"
          :src="tweet.userImageUrl"
          alt="user profile picture"
        />
        <h6 @click="go_to_profile" class="tweetInfo">
          {{ tweet.username }}, {{ new Date(tweet.createdAt) }}
        </h6>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "view-content",
  props: {
    // choice of 'tweet', 'comment' & 'profile'
    content_type: String,
    // tweet content
    tweet: Object,
  },
  methods: {
    reformat_tweet() {
      var tweet = this.unfiltered_tweet;
      // change key name from imageUrl to tweetImageUrl to match GET data return
      if (tweet.imageUrl !== null) {
        tweet[tweetImageUrl] = tweet.imageUrl;
      }
    },
    go_to_profile() {
      // go to profile function.
      this.$router
        .push({
          name: "ProfilePage",
          params: {
            // userId is passed to the profilePage to determine which profile to show
            userId: this.tweet.userId,
          },
        })
        .catch(() => {
            // if user is already on a profile page
            // this will send the user to the feed page and then back to profile page with new params
          this.$router
            .push({
              name: "FeedPage",
            })
            .then(() => {  
              this.$router.push({
                name: "ProfilePage",
                params: {
                  // userId is passed to the profilePage to determine which profile to show
                  userId: this.tweet.userId,
                },
              });
            });
        });
    },
  },
  mounted() {
    this.reformat_tweet();
  },
};
</script>

<style lang="scss" scoped>
</style>