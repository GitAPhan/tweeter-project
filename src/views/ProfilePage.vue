<template>
  <div>
    <h1>Profile Page</h1>
    <header-container> </header-container>

    <view-content :content_type="'profile'" :profile="highlighted_profile"></view-content>

    
    <tweet-container :user_id="highlighted_profile.userId"></tweet-container>
  </div>
</template>

<script>
import ViewContent from "@/components/iEditContent/ViewContent.vue";
import TweetContainer from "@/components/mainComponents/TweetContainer.vue";
import HeaderContainer from "@/components/mainComponents/HeaderContainer.vue";
export default {
  name: "profile-page",
  components: {
    HeaderContainer,
    TweetContainer,
    ViewContent,
  },
  data() {
    return {
      highlighted_profile: {},
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

</style>