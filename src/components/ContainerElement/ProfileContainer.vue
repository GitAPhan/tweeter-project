// this will contain the user profile component
<template>
    <div>
        <article>
            <img
                ref="profileBanner"
                class="profileBanner"
                :src="profile.bannerUrl"
                alt="user's profile banner"
            />
            <img
                ref="profilePicture"
                class="profilePicture"
                :src="profile.imageUrl"
                alt="user's profile picture"
            />
            <h2>{{ profile.username }}</h2>
            <p>bio: {{ profile.bio }}</p>
            <h5>{{ profile.birthdate }}</h5>
        </article>
    </div>
</template>

<script>
export default {
    name: 'profile-container',
    props: {
        profile: Object,
    },
}
</script>

<style lang="scss" scoped>
.profileBanner {
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.profilePicture {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: black 4px solid;
}
</style>