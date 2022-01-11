// this component will display content in an editable format
<template>
  <div>
    <!-- to edit/submit profile -->
    <form v-if="this.submit_type == 3" action="javascript:void(0)">
      <input
        type="email"
        ref="profile_email"
        placeholder="email"
        name="email"
        :value="this.highlighted_profile.email"
      />
      <input
        type="text"
        ref="profile_username"
        placeholder="username"
        name="username"
        :value="this.highlighted_profile.username"
      />
      <input
        type="password"
        ref="profile_password"
        name="password"
        placeholder="Enter your new password"
      />
      <input
        type="text"
        ref="profile_bio"
        name="bio"
        placeholder="profile bio"
        :value="this.highlighted_profile.bio"
      />
      <input
        type="date"
        ref="profile_birthdate"
        name="birthdate"
        :value="this.highlighted_profile.birthdate"
      />
      <input
        type="url"
        ref="profile_picture"
        name="profilePicture"
        placeholder="URL for profile picture"
        :value="this.highlighted_profile.imageUrl"
      />
      <input
        type="url"
        ref="profile_banner"
        name="profileBanner"
        placeholder="URL for profile banner"
        :value="this.highlighted_profile.bannerUrl"
      />
      <p ref="profile_reg_status_message"></p>
      <input type="submit" value="register" @click="submit_profile" />
    </form>
    <!-- to edit/submit tweets -->
    <form
      v-else-if="this.submit_type == 2"
      :key="unique_key + 1.589123751356"
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
      <input type="submit" :value="submit_status" @click="post_tweet" />
    </form>
    <!-- to edit/submit comment -->
    <form
      v-else-if="this.submit_type == 1"
      :key="unique_key + 2.1341531"
      action="javascript:void(0)"
    >
      <input
        type="text"
        maxlength="140"
        required
        placeholder="Leave a comment"
        ref="comment_content"
      />
      <input
        ref="comment_button"
        type="submit"
        :value="submit_status"
        @click="post_comment"
      />
    </form>
    <!-- to submit login info -->
    <form v-else action="javascript:void(0)">
      <input
        type="email"
        placeholder="email"
        title="Please fill out your email"
        ref="login_email"
        required
      />
      <input
        type="password"
        placeholder="password"
        ref="login_password"
        required
        autocomplete="new-password"
        pattern="[0-9a-zA-Z]{8,20}"
        title="Enter a password consisting of 8-20 digits"
      />
      <input type="submit" value="Sign in" @click="login_user" />
      <p ref="login_status"></p>
    </form>
  </div>
</template>

<script>
export default {
  name: "submit-content",
  data() {
    return {
      submit_content_url: undefined,
      highlighted_profile: {},
    };
  },
  props: {
    // used to determine which form to show
    submit_type: Number,
    submit_status: String,
    unique_key: Number,
    editable: Boolean,
    profile: Object,
  },
  mounted() {
    this.make_editable();
  },
  methods: {
    login_user() {
      // update status message
      this.$refs.login_status.innerText =
        "Attempting to log you in. Please wait...";
      // grabbing login info
      var request_data = {
        email: this.$refs.login_email.value,
        password: this.$refs.login_password.value,
      };
      // login request
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/login",
          method: "POST",
          data: request_data,
        })
        .then((response) => {
          var user_profile = response.data;
          // update user profile in the store and cookies
          this.$store.commit("update_user_profile", user_profile);
          this.$cookies.set("loginToken", JSON.stringify(user_profile));
          // add redirect to feed page
          this.$router.push({
            name: "FeedPage",
          });
        })
        .catch((error) => {
          this.$refs.login_status.innerText = `Oops, looks like you ran into a problem: ${error.response.data}
            Please check your login info and try again`;
        });
    },
    // this is for registering a new profile and updating profile
    submit_profile() {
      this.$refs.profile_reg_status_message.innerText =
        "Please wait while we submit your request";
      // conditional to determine if this is a POST or a PATCH request
      if (this.editable) {
        var request_method = "PATCH";
        var request_data = {
          loginToken: this.$cookies.get("loginToken").loginToken,
        };
        // conditional to determine if the new value is different than the previous value
        if (this.highlighted_profile.email != this.$refs.profile_email.value) {
          request_data.email = this.$refs.profile_email.value;
        }
        if (
          this.highlighted_profile.username != this.$refs.profile_username.value
        ) {
          request_data.username = this.$refs.profile_username.value;
        }
        if (this.highlighted_profile.bio != this.$refs.profile_bio.value) {
          request_data.bio = this.$refs.profile_bio.value;
        }
        if (
          this.highlighted_profile.birthdate !=
          this.$refs.profile_birthdate.value
        ) {
          request_data.birthdate = this.$refs.profile_birthdate.value;
        }
        if (
          this.highlighted_profile.imageUrl != this.$refs.profile_picture.value
        ) {
          request_data.imageUrl = this.$refs.profile_picture.value;
        }
        if (
          this.highlighted_profile.bannerUrl != this.$refs.profile_banner.value
        ) {
          request_data.bannerUrl = this.$refs.profile_banner.value;
        }
        if (this.$refs.profile_password.value != undefined) {
          request_data.password = this.$refs.profile_password.value;
        }
      } else {
        // POST request data
        request_method = "POST";
        request_data = {
          email: this.$refs.profile_email.value,
          username: this.$refs.profile_username.value,
          password: this.$refs.profile_password.value,
          bio: this.$refs.profile_bio.value,
          birthdate: this.$refs.profile_birthdate.value,
        };

        // conditional to see if user has inputted a url and if a default url should be used instead
        if (this.$refs.profile_picture.value != undefined) {
          request_data.imageUrl = this.$refs.profile_picture.value;
        } else {
          request_data.imageUrl = this.default_profile_picture;
        }
        if (this.$refs.profile_banner != undefined) {
          request_data.bannerUrl = this.$refs.profile_banner.value;
        } else {
          request_data.bannerUrl = this.default_profile_banner;
        }
      }

      // here lies the axios request
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: request_method,
          data: request_data,
        })
        .then((response) => {
          // if this is a POST request, conditional to create loginToken cookie
          if (request_method == "POST") {
            // add user_profile to state and cookies
            this.$cookies.set("loginToken", JSON.stringify(response.data));
            this.$store.commit("update_user_profile", response.data);
            // add redirect to feed page
            this.$router.push({
              name: "FeedPage",
            });
          } else {
            // emit to parent to hide edit form and show profile
            this.$emit("show_new_profile", response.data);
          }
        })
        .catch((error) => {
          this.$refs.profile_reg_status_message.innerText = `We seem to have ran into a problem.
          ERROR: ${error.response.data}
          Please check your profile details and try again`;
        });
    },
    make_editable() {
      if (this.editable) {
        this.highlighted_profile = this.profile;
      }
    },
    post_tweet() {
      var tweet_request = {
        loginToken: this.$cookies.get("loginToken").loginToken,
        content: this.$refs.tweet_content.value,
      };
      // conditional to add imageUrl keypair when value isn't ""
      if (this.$refs.imageUrl.value != "") {
        tweet_request.imageUrl = this.$refs.imageUrl.value;
      }
      // this will emit to parent where the code to request is
      this.$emit("tweet_submit_data", tweet_request);
    },
    post_comment() {
      this.$refs.comment_button.value = "Please wait...";
      // the start of putting together the data to be sent for the POST request
      var comment_content = {
        content: this.$refs.comment_content.value,
        loginToken: this.$cookies.get("loginToken").loginToken,
      };
      // this will emit to parent, request will be done there
      this.$emit("post_comment", comment_content);
    },
  },
  computed: {
    default_profile_banner() {
      return this.$store.state["default_profile_banner"];
    },
    default_profile_picture() {
      return this.$store.state["default_profile_picture"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>