// this component will display content in an editable format
<template>
  <div>
    <!-- to edit/submit profile -->
    <form v-if="this.submit_type == 3" action="javascript:void(0)">
      <input type="email" name="email" />
      <input type="text" name="username" />
      <input type="password" name="password" />
      <input type="text" name="bio" />
      <input type="date" name="birthdate" />
      <input type="url" name="profilePicture" />
      <input type="url" name="profileBanner" />
      <input type="submit" name="edit profile submit" />
    </form>
    <!-- to edit/submit comment and tweets -->
    <form
      v-else-if="this.submit_type == 2"
      :key="unique_key + 1"
      action="javascript:void(0)"
    >
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
    <!-- to submit login info -->
    <form v-else action="javascript:void(0)">
      <input
        type="email"
        placeholder="email"
        title="Please fill out your email"
        ref="email"
        required
      />
      <input
        type="password"
        placeholder="password"
        ref="password"
        required
        autocomplete="new-password"
        pattern="[0-9a-zA-Z]{8,20}"
        title="Enter a password consisting of 8-20 digits"
      />
      <input type="submit" value="Sign in" @click="login_user" />
      <p>{{ login_status_message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "submit-content",
  data() {
    return {
      submit_content_url: value,
    };
  },
  props: {
    submit_type: Number,
    unique_key: Number,
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

      this.$emit("tweet_submit_data", tweet_request);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>