// component to make GET request 
// show content
<template>
  <div>
    <!-- tweet format -->
    <article
      class="tweetCard"
      :tweetId="tweet.tweetId"
      v-if="this.content_type == 'tweet'"
    >
      <h3 class="tweetContent">{{ tweet.content }}</h3>
      <img
        class="tweetImage"
        v-if="this.tweet.tweetImageUrl != null"
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
    <!-- comment format -->
    <article v-else-if="this.content_type == 'comment'">
      <h4>comment</h4>
      <div>
        <img src="" alt="user profile picture" />
        <h6>username, timestamp</h6>
      </div>
    </article>
    <!-- user profile format -->
    <article v-else-if="this.content_type == 'profile'">
      <img
        ref="profileBanner"
        class="profileBanner"
        :src="profile.bannerUrl"
        alt="user's profile banner"
      />
      <img
        ref="profilePicture"
        class="profilePicture"
        :src="profile.imageUrl"
        alt="user's profile picture"
      />
      <h2>{{ profile.username }}</h2>
      <p>bio: {{ profile.bio }}</p>
      <h5>{{profile.birthdate}}</h5>
    </article>
  </div>
</template>
 
<script>
export default {
  name: "view-content",
  props: {
    content_type: String,
    //   tweets
    tweet: Object,
    // profile
    profile: Object,
  },
  methods: {
    go_to_profile() {
      // go to profile function.
      this.$router.push({
        name: "ProfilePage",
        params: {
          // userId is passed to the profilePage to determine which profile to show
          userId: this.tweet.userId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.profileImage {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
  border: black 4px solid;
  grid-area: b;
}

.tweetImage {
  max-width: 100px;
  max-height: 100px;
  grid-area: d;
}

.tweetInfo {
  grid-area: c;
}

.tweetCard {
  border: black 1px solid;
  padding: 15px;
  display: grid;
  grid-template-areas:
    "a a a"
    "b c d";
  margin: 10px;
}

.tweetContent {
  grid-area: a;
}

.profileBanner {
    height: 300px;
    width: 100%;
    object-fit: cover;
}

.profilePicture {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: black 4px solid;
}
</style>