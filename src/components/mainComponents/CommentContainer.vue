// component to contain ShowComment(s)
// 
<template>
  <div>
    <article>
      <view-content
        :tweet="this.highlighted_tweet"
        :view_comment="undefined"
        content_type="tweet"
      ></view-content>
      <view-content
        v-for="tweet_comment of tweet_comments"
        :key="tweet_comment.commentId"
        :comment="tweet_comment"
        content_type="comment"
      ></view-content>
      <submit-content
        :unique_key="this.unique_key"
        @post_comment="post_comment"
        :submit_type="1"
      ></submit-content>
    </article>
  </div>
</template>

<script>
import SubmitContent from "@/components/iEditContent/SubmitContent.vue";
import ViewContent from "@/components/iEditContent/ViewContent.vue";

export default {
  name: "comment-container",
  methods: {
    post_comment(payload) {
      // adding in the tweetId to the post_data to be sent in request
      var post_data = payload;
      post_data.tweetId = this.highlighted_tweet.tweetId;
      // POST request to submit comment
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          method: "POST",
          data: post_data,
        })
        .then((response) => {
          // this is to update the unique_key to force the form to reload
          this.unique_key = this.unique_key + 2;
          // this is to dynamically inject posted comment
          var tweet_comments = this.tweet_comments;
          // this will push the new object into the array at the position of the length of tweet_comments
          tweet_comments[tweet_comments.length] = response.data;
          this.$store.commit("update_tweet_comments", tweet_comments);
        })
        .catch((error) => {
          error;
        });
    },
  },
  components: {
    ViewContent,
    SubmitContent,
  },
  data() {
    return {
      comments: {},
      unique_key: 2,
    };
  },
  props: {
    tweet: Object,
  },
  computed: {
    tweet_comments() {
      return this.$store.state["tweet_comments"];
    },
    highlighted_tweet() {
      return this.$store.state["highlighted_tweet"];
    },
  },
};
</script>

<style lang="scss" scoped>
article {
    position: relative;
}
</style>