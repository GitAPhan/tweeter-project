// component to make POST request 
// button to display status of follow request
// action button to serve purpose of likes, follows, logout
<template>
  <div>
    <button v-if="this.action_type == 'follows'"></button>
    <button v-else @click="user_logout">{{ action_type }}</button>
  </div>
</template>

<script>
export default {
  name: "action-button",
  props: {
    // this is used to pass down from parent what's this 'action' button's purpose
    action_type: String,
    tweet_id: Number,
    user_id: Number,
  },
  data() {
    return {
      
    };
  },
  methods: {
    // function to emit to parent
    user_logout() {
      this.$emit("logout_action", true);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>