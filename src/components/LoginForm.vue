<template>
  <div>
    <h1>Sign in to Tweeter</h1>
    <form action="javascript:void(0)">
      <input
        type="email"
        placeholder="email"
        title="Please fill out your email"
        ref="email"
        required
      />
      <!-- password input: required, auto-complete new-password to activate password manager's suggest password, password limited to 8-20 hexadecimal digits -->
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
  name: "login-form",
  data() {
    return {
      login_status_message: undefined,
    };
  },
  methods: {
    login_user() {
      this.login_status_message = "Please wait while we sign you in...";
      //   key values for login POST
      var login_request = {
        email: this.$refs.email.value,
        password: this.$refs.password.value,
      };

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/login",
          method: "POST",
          data: login_request,
        })
        .then((response) => {
          // grabbed response
          var login_success = response.data;
          var cookie = {
            loginToken: login_success.loginToken,
            userId: login_success.userId,
          };
          // set loginToken in cookie
          this.$cookies.set("loginToken", JSON.stringify(cookie));
          // store information to log user out
          var user_info = {
            loginToken: login_success.loginToken,
            password: login_success.password,
          };
          this.$store.commit("update_user_profile", user_info);
          this.register_status_message = 'Login successful, we will redirect you shortly... ';
          // add redirect to feed page
          this.$router.push({
            name: "FeedPage",
          });
        })
        .catch((error) => {
          this.register_status_message = error.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>