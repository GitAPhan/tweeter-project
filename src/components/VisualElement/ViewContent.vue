<template>
  <div>
    <!-- tweet format -->
    <article class="tweetCard" v-if="this.content_type == 'tweet'">
      <h3 class="tweetContent">{{ tweet.content }}</h3>
      <img
        class="tweetImage"
        v-if="this.tweet.imageUrl != null || this.tweet.tweetImageUrl != null"
        :src="this.tweet.tweetImageUrl"
        alt="tweeted picture"
      />

      <div class="userInfo">
        <img
          @click="go_to_profile"
          class="profileImage"
          :src="this.tweet.userImageUrl"
          alt="user profile picture"
        />
        <h6
          @click="go_to_profile"
          class="tweetInfo"
        >{{ this.tweet.username }}, {{ new Date(this.tweet.createdAt) }}</h6>
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
          // this will send the user to the feed page and then back to ProfilePage with new params
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
    data() {
      return {
        // tweet: {},
      };
    },
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.profileImage {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 1px black solid;
  border-radius: 30px;
}
.userInfo {
  display: grid;
  grid-template-columns: 55px 1fr;
  align-items: center;
  grid-area: c;
}
.tweetCard {
  display: grid;
  grid-template-areas: 
  "a b"
  "c b";
  border: 1px black solid;
  margin: 15px;
  padding: 25px;
}
.tweetImage {
  height: 120px;
  justify-self: end;
  grid-area: b;
}
.tweetContent {
  grid-area: a;
}
</style>