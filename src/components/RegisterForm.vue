<template>
  <div>
    <form action="javascript:void(0)">
      <input
        type="email"
        placeholder="email"
        title="Please fill out your email"
        required
      />
      <input
        type="text"
        placeholder="username"
        title="Please fill out your username"
        required
      />
      <!-- password input: required, auto-complete new-password to activate password manager's suggest password, password limited to 8-20 hexadecimal digits -->
      <input
        type="password"
        placeholder="password"
        required
        autocomplete="new-password"
        pattern="[0-9a-zA-Z]{8,20}"
        title="Enter a password consisting of 8-20 digits"
      />

      <input
        type="text"
        name="bio"
        placeholder="profile bio..."
        maxlength="200"
        minlength="50"
        required
      />
      <!-- birthday: required, dates shown for birthdays are 13 years and older -->
      <input type="date" title="birthday" required :max="min_age_calculator" />
      <!-- optional picture URL inputs for profile images -->
      <input
        type="url"
        placeholder="profile picture (optional)"
        title="Please input picture URL here"
        name="profile picture"
        id=""
      />
      <input
        type="url"
        placeholder="banner picture (optional)"
        title="Please input picture URL here"
        name="banner picture"
        id=""
      />
      <input type="submit" value="register" @click="register_user" />
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
    };
  },
  methods: {
    register_user(button) {
      var email = button.path[1][0].value;
      var username = button.path[1][1].value;
      var password = button.path[1][2].value;
      var bio = button.path[1][3].value;
      var birthdate = button.path[1][4].value;
      var imageUrl = button.path[1][5].value;
      var bannerUrl = button.path[1][6].value;

      if (
        email == "" ||
        username == "" ||
        password == "" ||
        bio == "" ||
        birthdate == ""
      ) {
        return false;
      } else if (email.includes("@") && bio.length > 50) {
        email, username, password, bio, birthdate, imageUrl, bannerUrl;
        console.log(button.path[1]);
      }
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