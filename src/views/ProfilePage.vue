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
    <tweet-container></tweet-container>
  </div>
</template>

<script>
import SubmitContent from "@/components/iEditContent/SubmitContent.vue";
import ViewContent from "@/components/iEditContent/ViewContent.vue";
import TweetContainer from "@/components/mainComponents/TweetContainer.vue";
import HeaderContainer from "@/components/mainComponents/HeaderContainer.vue";
export default {
  name: "profile-page",
  components: {
    HeaderContainer,
    TweetContainer,
    ViewContent,
    SubmitContent,
  },
  data() {
    return {
      highlighted_profile: {},
      showP: false,
    };
  },
  methods: {
    cancel_delete() {
      this.$refs.password_container.style.display = "none";
    },
    password_popup() {
      this.$refs.password_container.style.display = "block";
    },
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
          url: "https://tweeterest.ga/api/users",
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
  beforeMount() {
    //   this is to determine which profile to show based off of the params sent
    var all_users = this.$store.state["all_users"];
    // for loop and if conditional to determine which of the users match the params
    for (var i = 0; i < all_users.length; i++) {
      if (all_users[i].userId == this.$route.params.userId) {
        //   update hightlighted_profile
        this.highlighted_profile = all_users[i];
        // to return once profile has been found
        return;
      }
    }
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