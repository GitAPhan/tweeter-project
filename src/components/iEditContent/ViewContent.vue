// component to make GET request 
// show content
<template>
  <div>
    <!-- tweet format -->
    <article>
      <h3>tweet content</h3>
      <img src="" alt="tweeted picture" />
      <div>
        <img src="" alt="user profile picture" />
        <h6>username, timestamp</h6>
      </div>
    </article>
    <!-- comment format -->
    <article>
      <h4>comment</h4>
      <div>
        <img src="" alt="user profile picture" />
        <h6>username, timestamp</h6>
      </div>
    </article>
    <!-- user profile format -->
    <article>
      <img
        ref="profileBanner"
        class="profileBanner"
        :src="highlighted_profile.bannerUrl"
        alt="user's profile banner"
      />
      <img
        ref="profilePicture"
        class="profilePicture"
        :src="highlighted_profile.imageUrl"
        alt="user's profile picture"
      />
      <h2>{{ highlighted_profile.username }}</h2>
      <p>bio: {{ highlighted_profile.bio }}</p>
      <h5>user birthdate</h5>
    </article>
  </div>
</template>
 
<script>
export default {
  name: "view-content",
};
</script>

<style lang="scss" scoped>
</style>