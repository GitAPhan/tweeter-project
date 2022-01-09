// this component will display content in an editable format
<template>
  <div>
    <!-- to edit/submit profile -->
    <form v-if="this.submit_type == 3" action="javascript:void(0)">
      <input
        type="email"
        ref="profile_email"
        name="email"
        :value="this.highlighted_profile.email"
      />
      <input
        type="text"
        ref="profile_username"
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
        :value="this.highlighted_profile.imageUrl"
      />
      <input
        type="url"
        ref="profile_banner"
        name="profileBanner"
        :value="this.highlighted_profile.bannerUrl"
      />
      <input type="submit" name="edit profile submit" @click="submit_profile" />
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
    submit_profile() {
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
          request_data.bannerUrl = this.$refs.profile_banner;
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
          this.$store.commit("update_user_profile", response.data);
          // if this is a POST request, conditional to create loginToken cookie
          if (request_method == "POST") {
            var loginToken = {
              loginToken: response.data.loginToken,
              userId: response.data.userId,
            };
            this.$cookies.set("loginToken", JSON.stringify(loginToken));
          } else {
            // emit to parent to hide edit form and show profile
            this.$emit("show_new_profile", response.data);
          }
        })
        .catch((error) => {
          error;
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