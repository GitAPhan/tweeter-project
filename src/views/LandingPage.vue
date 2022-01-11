<template>
  <div>
    <h1>Welcome to the wonderful world of TWEETER</h1>

    <h3 ref="form_title">Join TWEETER today!</h3>
    <submit-content :submit_type="this.submit_type"></submit-content>
    <section>
      <h4 ref="alternative_route">Already a user?</h4>
      <button ref="alternative_route_button" @click="reg_login_swap">
        click here to login
      </button>
    </section>
  </div>
</template>

<script>
import SubmitContent from "@/components/iEditContent/SubmitContent.vue";

export default {
  name: "landing-page",
  data() {
    return {
      submit_type: 3,
    };
  },
  methods: {
    reg_login_swap() {
      if (this.submit_type == 3) {
        this.submit_type = 0;
        this.$refs.form_title.innerText = "Sign in to TWEETER";
        this.$refs.alternative_route.innerText = "Go back to Register";
        this.$refs.alternative_route_button.innerText = "click to register";
      } else {
        this.submit_type = 3;
        this.$refs.form_title.innerText = "Join TWEETER today!";
        this.$refs.alternative_route.innerText = "Already a user?";
        this.$refs.alternative_route_button.innerText = "click to login";
      }
    },
    // function to check if the user is already logged in
    login_check() {
      if(this.$cookies.get('loginToken') != undefined) {
        // user will be redirected to the FeedPage if a loginToken is present
        this.$router.push({
          name: "FeedPage",
        })
      }
    }
  },
  components: {
    // RegisterForm,
    // LoginForm,
    SubmitContent,
  },
  mounted () {
    this.login_check();
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>