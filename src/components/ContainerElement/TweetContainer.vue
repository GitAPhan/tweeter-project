<template>
  <div>
    <p>{{ status_message }}</p>
    <article v-if="this.view_category === 'feed' || this.view_category === 'discover'" >
      <h1>TweetContainer</h1>
      <section v-for="tweet in tweets" :key="tweet.tweetId">
        <view-content class="tweet" :tweet="tweet" content_type="tweet" />
        <!-- likes -->
        <icon-button class="tweet_like" :tweetId="tweet.tweetId" />
        <!-- comments -->
        <icon-button class="tweet_comment" :tweetId="tweet.tweetId" />
        <!-- follow -->
        <icon-button class="tweet_follow" :userId="tweet.userId" />
        <!-- <comment-container /> -->
      </section>
    </article>
    <tweet-request
      @tweet_response="response_from_tweet_request"
      @update_status_message="update_status_message"
      :request_type="this.view_category"
    />
  </div>
</template>

<script>
import TweetRequest from "@/components/RequestElement/TweetRequest.vue";
import ViewContent from "@/components/VisualElement/ViewContent.vue";
import IconButton from "@/components/VisualElement/IconButton.vue";
// import CommentContainer from "@/mainComponents/CommentContainer.vue";

export default {
  name: "tweet-container",
  data() {
    return {
      tweets: [],
      feed_key: 0,
      status_message: undefined
    }
  },
  methods: {
    update_status_message(payload, timeOut) {
      this.status_message = payload
      setTimeout(() => {
        this.status_message = undefined
      }, timeOut)
    },
    response_from_tweet_request(payload) {
      this.tweets = payload
    }
  },
  props: {
    view_category: String,
  },
  components: {
    TweetRequest,
    ViewContent,
    IconButton
  },
  mounted() {
    if (this.view_category === "feed") {
      console.log(this.view_category)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>