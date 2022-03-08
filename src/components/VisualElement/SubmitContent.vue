<template>
    <div>
        <form ref="login_form" v-if="this.submit_type === 'login'" action="javascript:void(0)">
            <input
                type="text"
                placeholder="Enter your email or username"
                name="email/username"
                ref="login_user"
            />
            <input
                type="password"
                placeholder="Enter your password"
                name="password"
                ref="login_password"
            />
            <input type="submit" value="login" @click="submit_login" />
        </form>
        <!-- to edit/submit profile -->
        <form ref="user_form" v-else-if="this.submit_type === 'users'" action="javascript:void(0)">
            <input
                type="email"
                ref="email"
                placeholder="email"
                name="email"
                :value="this.highlighted_profile.email"
            />
            <input
                type="text"
                ref="username"
                placeholder="username"
                name="username"
                :value="this.highlighted_profile.username"
            />
            <input
                type="password"
                ref="password"
                name="password"
                placeholder="Enter your new password"
            />
            <input
                type="text"
                ref="bio"
                name="bio"
                placeholder="profile bio"
                :value="this.highlighted_profile.bio"
            />
            <input
                type="date"
                ref="birthdate"
                name="birthdate"
                :value="this.highlighted_profile.birthdate"
            />
            <input
                type="url"
                ref="imageUrl"
                name="profilePicture"
                placeholder="URL for profile picture"
                :value="this.highlighted_profile.imageUrl"
            />
            <input
                type="url"
                ref="bannerUrl"
                name="profileBanner"
                placeholder="URL for profile banner"
                :value="this.highlighted_profile.bannerUrl"
            />
            <input
                v-if="this.submit_method === 'post'"
                type="submit"
                value="register"
                @click="create_user"
            />
            <input
                v-else-if="this.submit_method === 'patch'"
                type="submit"
                value="edit profile"
                @click="edit_user"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: 'submit-content',
    methods: {
        edit_profile() {
            if (this.submit_method === 'patch') {
                this.highlighted_profile = this.$cookies.get(loginToken);
            }
        },
        submit_login() {
            this.$emit('update_status_message', "Please wait while we attempt to log you in...", 5000)
            // prepare user input info for request
            var password = this.$refs.login_password.value
            var response = {
                "password": password
            }
            var user_id = this.$refs.login_user.value
            if (user_id.search("@") > 0) {
                response['email'] = user_id
            } else {
                response['username'] = user_id
            }
            // emit to user request
            this.$emit('submit_login', response)
            this.$refs.login_form.reset()
        },
        create_user() {
            this.$emit('update_status_message', "Please wait while we create a new profile for you...", 5000)
            var request_data = {
                email: this.$refs.email.value,
                username: this.$refs.username.value,
                password: this.$refs.password.value,
                bio: this.$refs.bio.value,
                birthdate: this.$refs.birthdate.value,
            };
            // conditional to see if user has inputted a url and if a default url should be used instead
            if (this.$refs.profile_picture.value != undefined) {
                request_data.imageUrl = this.$refs.imageUrl.value;
            }
            if (this.$refs.profile_banner != undefined) {
                request_data.bannerUrl = this.$refs.bannerUrl.value;
            }
            // emit to user request
            this.$emit('create_user', request_data)
            this.$refs.user_form.reset()
        },
        edit_user() {
            this.$emit('update_status_message', "Please wait while we update your profile...", 5000)
            var request_data = {};
            // conditional to determine if the new value is different than the previous value
            for (var i = 0; i < highlighted_profile.length; i++) {
                compare_keyname = Object.keys(highlighted_profile[i])
                // skip if value is undefined
                if (this.$refs[compare_keyname].value != undefined) {
                    // pass if the keyname is loginToken
                    if (compare_keyname === 'loginToken') { }
                    // add password
                    else if (compare_keyname === 'password') {
                        request_data[compare_keyname] = this.$refs[compare_keyname].value
                    }
                    // add any keyvalue that is different than what is stored
                    else if (this.highlighted_profile[compare_keyname] != this.highlighted_profile[compare_keyname].value) {
                        request_data[compare_keyname] = this.$refs[compare_keyname].value
                    }
                }
            }
            // emit to user request
            this.$emit('edit_user', request_data)
            this.$refs.user_form.reset()
        }
    },
    props: {
        submit_type: String,
        submit_method: String,
    },
    computed: {
        default_profile_banner() {
            return this.$store.state["default_profile_banner"];
        },
        default_profile_picture() {
            return this.$store.state["default_profile_picture"];
        },
    },
    mounted() {
        this.edit_profile();
    },
    data() {
        return {
            user_profile: {}
        }
    },
}
</script>

<style lang="scss" scoped>
</style>