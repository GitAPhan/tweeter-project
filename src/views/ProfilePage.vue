<template>
  <div>
    <h1>Profile Page</h1>
    <header-container> </header-container>

    <transition name="fade">
      <submit-content
        v-if="showP"
        :submit_type="3"
        :profile="highlighted_profile"
        :user_id="highlighted_profile.userId"
        :editable="true"
        @show_new_profile="update_highlighted_profile"
      ></submit-content>
      <view-content
        v-else
        :content_type="'profile'"
        :profile="highlighted_profile"
      ></view-content>
    </transition>
    <button
      v-if="
        this.highlighted_profile.userId ==
          this.$cookies.get('loginToken').userId && !showP
      "
      @click="showP = !showP"
    >
      Edit Profile
    </button>
    <!-- delete profile button -->
    <button
      v-if="
        this.highlighted_profile.userId ==
          this.$cookies.get('loginToken').userId && showP
      "
      @click="password_popup"
    >
      Delete Profile
    </button>
    <!-- password input popup prompt -->
    <div class="password_popup" ref="password_container">
      <h3>Enter Password:</h3>
      <input
        ref="password_verify"
        placeholder="verify your password"
        type="password"
      />
      <p ref="delete_message">
        This will permanently delete you user profile. Be sure before you click!
      </p>
      <input type="submit" value="DELETE PROFILE" @click="delete_profile" />
      <input type="submit" value="CANCEL" @click="cancel_delete" />
    </div>
    <!-- follow button that only appears if the userId of the page doesn't match the userId in the cookies -->
    <action-button
      v-if="
        this.highlighted_profile.userId !=
        this.$cookies.get('loginToken').userId
      "
      :action_type="'follows'"
      :user_id="this.highlighted_profile.userId"
      :follow_status="this.follow_status"
      :key="this.refresh_key"
      @follow_profile="follow_profile"
    ></action-button>
    <!-- <tweet-container tweet_type="profile" :user_id="this.highlighted_profile.userId"></tweet-container> -->
  </div>
</template>

<script>
import ActionButton from "@/components/iAmAction/ActionButton.vue";
import SubmitContent from "@/components/iEditContent/SubmitContent.vue";
import ViewContent from "@/components/iEditContent/ViewContent.vue";
// import TweetContainer from "@/components/mainComponents/TweetContainer.vue";
import HeaderContainer from "@/components/mainComponents/HeaderContainer.vue";
export default {
  name: "profile-page",
  components: {
    HeaderContainer,
    // TweetContainer,
    ViewContent,
    SubmitContent,
    ActionButton,
  },
  data() {
    return {
      highlighted_profile: {},
      showP: false,
      // follow status of profile to be stored here
      follow_status: false,
      // all followers of this profile will be stored here
      profile_followers: {},
      // key to help refresh follow button to reflect changes
      refresh_key: 0,
    };
  },
  methods: {
    // function to check the follow status of the current profile
    follow_status_check() {
      // GET request to get all users that follow this profile
      this.$axios
        .request({
          url: "http://localhost:5000/api/followers",
          params: {
            userId: this.highlighted_profile.userId,
          },
        })
        .then((response) => {
          this.profile_followers = response.data;
        })
        .catch((error) => {
          // need error code here
          error;
        })
        .then(() => {
          // conditional to only run if profile isn't the logged in user's profile
          if (
            this.highlighted_profile.userId !=
            this.$cookies.get("loginToken").userId
          ) {
            // loop through profile_followers to see if there is a match with the userId in the cookie
            for (var i = 0; i < this.profile_followers.length; i++) {
              // conditional to set follow_status to true if the userId matches
              if (
                this.profile_followers[i].id ==
                this.$cookies.get("loginToken").userId
              ) {
                this.follow_status = true;
              }
            }
          }
        });
    },
    // function to allow user to follow profile
    follow_profile() {
      // variable to store method for request
      var follow_request_method;
      // conditional to determine follow status
      if (this.follow_status == true) {
        follow_request_method = "DELETE";
      } else {
        follow_request_method = "POST";
      }
      // follow request
      this.$axios.request({
        url: 'http://localhost:5000/api/follows',
        method: follow_request_method,
        data: {
          loginToken: this.$cookies.get('loginToken').loginToken,
          followId: this.highlighted_profile.userId,
        }
      }).then((response) => {
        this.follow_status = !this.follow_status;
        this.refresh_key = this.refresh_key + response.data.status;
      }).catch((error) => {
        // insert error code here
        error;
      })
    },
    // this will close the password popup
    cancel_delete() {
      this.$refs.password_container.style.display = "none";
    },
    // this will make the password popup visible
    password_popup() {
      this.$refs.password_container.style.display = "block";
    },
    // this will update the variable highlighted profile in data and hide the edit profile form
    update_highlighted_profile(payload) {
      this.highlighted_profile = payload;
      this.showP = false;
    },
    delete_profile() {
      // wait message
      this.$refs.delete_message.innerText = "attempting to delete profile...";

      // request to delete user profile
      this.$axios
        .request({
          url: "http://localhost:5000/api/users",
          method: "DELETE",
          data: {
            loginToken: this.$cookies.get("loginToken").loginToken,
            password: this.$refs.password_verify.value,
          },
        })
        .then(() => {
          // success message
          this.$refs.delete_message.innerText =
            "you have successfully deleted your profile. We are sad to see you go. We hope you enjoyed the site. We will now log you out for the last time...";
          // delay to allow user to read success message
          setTimeout(() => {
            // delete cookie
            this.$cookies.remove("loginToken");
            // redirect the user to the landing page
            this.$router.push({
              name: "LandingPage",
            }),
              3000;
          });
        })
        .catch((error) => {
          this.$refs.delete_message.innerText = `We seem to have ran into a problem with your request
            Error: ${error.response.data}
            Please check to see if you have entered the correct password and try again`;
        });
    },
  },
  created() {
    // conditional to check if all_users in the store is empty then run the action get_all_users (mainly for refreshing of page)
    if (JSON.stringify(this.$store.state["all_users"]) == "{}") {
      this.$store.dispatch("get_all_users");
    }
    //   this is to determine which profile to show based off of the params sent
    var all_users = this.$store.state["all_users"];
    // for loop and if conditional to determine which of the users match the params
    for (var i = 0; i < all_users.length; i++) {
      if (all_users[i].userId == this.$route.params.userId) {
        //   update hightlighted_profile
        this.highlighted_profile = all_users[i];
      }
    }
    // conditional to use userId saved in cookies if highlighted_profile is empty
    // this helps with the refresh of the page and there are no params present
    if (JSON.stringify(this.highlighted_profile) == "{}") {
      // loop to add user profile to highlighted_profile
      this.highlighted_profile = this.$cookies.get("loginToken");
    }
    // lets check for followers
    this.follow_status_check();
  },
  computed: {
    user_profile() {
      return this.$store.state["user_profile"];
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateX(50vw);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50vw);
}
.fade-leave-active {
  transition: all 1s ease;
}

.password_popup {
  width: 100vw;
  height: 100vh;
  padding: auto;
  text-align: center;
  background-color: rgba(128, 128, 128, 0.96);
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  z-index: 5;
}
</style>