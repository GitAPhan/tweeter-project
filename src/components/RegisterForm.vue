<template>
  <div>
    <form action="javascript:void(0)">
      <input
        type="email"
        placeholder="email"
        title="Please fill out your email"
        ref="email"
        required
      />
      <input
        type="text"
        placeholder="username"
        title="Please fill out your username"
        ref="username"
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
<!-- bio input: min length and max length limited here -->
      <input
        type="text"
        name="bio"
        ref="bio"
        placeholder="profile bio..."
        maxlength="200"
        minlength="50"
        required
      />
      <!-- birthday: required, dates shown for birthdays are 13 years and older -->
      <input type="date" title="birthday" ref="birthdate" required :max="min_age_calculator" />
      <!-- optional picture URL inputs for profile images -->
      <input
        type="url"
        placeholder="profile picture (optional)"
        title="Please input picture URL here"
        name="profile picture"
        ref="profilePicture"
      />
      <input
        type="url"
        placeholder="banner picture (optional)"
        title="Please input picture URL here"
        name="banner picture"
        ref="profileBanner"
      />
      <!-- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, neque consequuntur. Repellendus molestias minima, in, exercitationem sint qui illo est natus earum, expedita nulla dicta sit repudiandae iure. Provident, quaerat? -->
      <input type="submit" value="register" @click="register_user" />
      <p>{{ register_status_message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "register-form",
  data() {
    return {
      // variable to change min age requirement. Placed here for easy 'update' if needed
      min_age_for_signup: 13,
      // variable used to display current status
      register_status_message: undefined,
      test_axios: "birthdate:1900-12-12",
    };
  },
  methods: {
    register_user() {
      this.register_status_message = "Please wait...";
      // key values for POST request
      var username = this.$refs.username.value;
      var email = this.$refs.email.value;
      var password = this.$refs.password.value;
      var bio = this.$refs.bio.value;
      var birthdate = this.$refs.birthdate.value;
      var imageUrl = this.$refs.profilePicture.value;
      var bannerUrl = this.$refs.profileBanner.value;

      // test conditional
      if (
        email == "" ||
        username == "" ||
        password == "" ||
        bio == "" ||
        birthdate == ""
      ) {
        this.register_status_message =
          "Please fill out required fields to continue";
        return false;
      }

      // TO CONTINUE WRITING VALIDATION CHECKS LATER
      // // email validation check
      //       if (email.includes("@")) {

      //       }

      // determine the keypairs that would be included
      var data_request = {
        email: email,
        username: username,
        password: password,
        bio: bio,
        birthdate: birthdate,
      };
      // if variable is not empty then run code
      if (imageUrl != "") {
        data_request.imageUrl = imageUrl;
      }
      if (bannerUrl != "") {
        data_request.bannerUrl = bannerUrl;
      }

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: "POST",
          data: data_request,
        })
        .then((response) => {
          // grabbed response
          var login_success = response.data;
          // set loginToken in cookie
          this.$cookies.set("loginToken", login_success.loginToken);
          this.register_status_message =
            "User has been successfully created. Please wait while we log you in";
          // add redirect to feed page
          this.$router.push({
            name: "FeedPage",
          });
        })
        .catch((error) => {
          this.register_status_message = error.message;
        });
      // console.log(button.path[1]);
    },
  },
  computed: {
    // to calculate minimum age requirement to sign up
    min_age_calculator() {
      var min_date = new Date();
      var mm = min_date.getMonth() + 1; // January is 0 +1 for
      var dd = min_date.getDate();
      var yyyy = min_date.getFullYear() - this.min_age_for_signup; // subtract X years to account for minimum age
      // below 2 conditionals are to add a '0' in front of a single digit
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      // format of min_date for input date max attribute
      min_date = yyyy + "-" + mm + "-" + dd;
      return min_date;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>