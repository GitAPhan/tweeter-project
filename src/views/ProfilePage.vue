<template>
  <div>
    <h1>Profile Page</h1>
    <nav-bar> </nav-bar>
    <img ref="profileBanner" class="profileBanner" :src="highlighted_profile.bannerUrl" alt="user's profile banner" />
    <img ref="profilePicture" class="profilePicture" :src="highlighted_profile.imageUrl" alt="user's profile picture" />
    <h2>{{ highlighted_profile.username }}</h2>
    <p>bio: {{highlighted_profile.bio}}</p>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "profile-page",
  components: {
    NavBar,
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
.profileBanner {
    height: 300px;
    width: 100%;
}

.profilePicture {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: black 4px solid;
}
</style>