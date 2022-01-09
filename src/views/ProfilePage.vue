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
          this.$cookies.get('loginToken').userId
          
      "
      @click="showP = !showP"
    >
      Edit Profile
    </button>
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
</style>