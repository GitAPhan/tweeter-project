<template>
  <div>
    <article v-for="tweet in tweets" :key="tweet.tweetId">
      <h3>{{ tweet.content }}</h3>
      <img
        class="tweetImage"
        v-if="tweet.tweetImageUrl != null"
        :src="tweet.tweetImageUrl"
        alt="tweeted picture"
      />
      <div class="userInfo">
        <img
          class="profileImage"
          :src="tweet.userImageUrl"
          alt="user profile image"
          :userId="tweet.userId"
          @click="goTo_profile"
        />
        <h6>{{ tweet.username }} - {{ tweet.createdAt }}</h6>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "posted-tweets",
  data() {
    return {
      tweets: undefined,
    //   this variable will be updated when only a certain user's tweets are shown
      post_specifications: {'userId': this.user_id},
    };
  },
  props: {
    user_id: Number,
  },
  methods: {
    get_all_posts() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          params: this.post_specifications,
        })
        .then((response) => {
          this.tweets = response.data;
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goTo_profile(value) {
      value;
      // go to profile function.
      this.$router.push({
        name: "ProfilePage",
        params: {
          // userId is passed to the profilePage to determine which profile to show
          userId: value.currentTarget.attributes.userid.value,
        },
      });
    },
  },
  mounted() {
    this.get_all_posts();
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
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: black 4px solid;
}
</style>