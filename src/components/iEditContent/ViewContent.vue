// component to make GET request 
// show content
<template>
  <div>
    <!-- tweet format -->
    <article
      class="tweetCard"
      :tweetId="tweet.tweetId"
      v-if="this.content_type == 'tweet'"
      ref="tweetCard"
    >
      <h3 class="tweetContent">{{ tweet.content }}</h3>
      <img
        class="tweetImage"
        v-if="this.tweet.tweetImageUrl !== null"
        :src="tweet.tweetImageUrl"
        alt="tweeted picture"
      />
      <div class="action_container">
        <info-icon
          :tweet_info="tweet"
          icon_type="like"
          url="http://localhost:5000/api/tweet_likes"
          content_type="tweet"
        ></info-icon>
        <info-icon
          :tweet_info="tweet"
          v-if="this.view_comment !== undefined"
          icon_type="comment"
          content_type="tweet"
          @open_comment_display="open_comment_display"
        ></info-icon>
        <info-icon
          v-if="this.view_comment === undefined"
          :tweet_info="tweet"
          icon_type="close"
        ></info-icon>
      </div>
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
    <article
      class="comment_card"
      v-else-if="
        this.content_type == 'comment' && JSON.stringify(this.comment) != '{}'
      "
    >
      <h4>{{ comment.content }}</h4>
      <div class="action_container">
        <info-icon
          :tweet_info="comment"
          icon_type="like"
          url="http://localhost:5000/api/comment_likes"
          content_type="comment"
        ></info-icon>
      </div>
      <div class="userInfo">
        <h6 @click="go_to_comment_profile">
          {{ comment.username }}, {{ new Date(comment.createdAt) }}
        </h6>
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
      <h5>{{ profile.birthdate }}</h5>
    </article>
  </div>
</template>
 
<script>
import InfoIcon from "@/components/iAmAction/InfoIcon.vue";

export default {
  name: "view-content",
  props: {
    content_type: String,
    //   tweets
    tweet: Object,
    // profile
    profile: Object,
    // comment
    comment: Object,
    view_comment: Boolean,
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
    go_to_comment_profile() {
      // go to profile when the username of comment is clicked
      this.$router.push({
        name: "ProfilePage",
        params: {
          // userId is passed to the profilePage to determine which profile to show
          userId: this.comment.userId,
        },
      })
        .catch(() => {
          this.$router
            .push({
              name: "FeedPage",
            })
            .then(() => {
              this.$router.push({
                name: "ProfilePage",
                params: {
                  // userId is passed to the profilePage to determine which profile to show
                  userId: this.comment.userId,
                },
              });
            });
        });
    },
    open_comment_display() {
      // this will emit to parent to set comment container display grid
      this.$emit("open_comment_display");
    },
  },
  components: {
    InfoIcon,
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.comment_card {
  position: relative;
  display: grid;
  place-items: center;
  border: 1px black solid;
  padding: 5px;
  margin: 5px;
}

.action_container {
  position: absolute;
  right: 2px;
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
  position: relative;
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