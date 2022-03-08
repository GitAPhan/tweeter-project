<template>
    <div>
        <section v-if="this.submit_type === 'login'">
            <!-- login and logout user -->
            <icon-button
                @submit_logout="submit_logout"
                v-if="this.$cookies.get('loginToken') != undefined"
                submit_type="login"
            />
            <submit-content
                @update_status_message="update_status_message"
                @submit_login="submit_login"
                v-else
                submit_type="login"
            />
            <p>{{ status_message }}</p>
        </section>
        <section v-else-if="this.submit_type === 'users'">
            <!-- create/edit/delete user -->
            <submit-content
                @update_status_message="update_status_message"
                @create_user="create_user"
                @edit_user="edit_user"
                submit_type="users"
                :submit_method="this.submit_method"
            />
            <p>{{ status_message }}</p>
        </section>
    </div>
</template>

<script>
import IconButton from "@/components/VisualElement/IconButton.vue";
import SubmitContent from "@/components/VisualElement/SubmitContent.vue";

export default {
    name: "user-request",
    methods: {
        login_user(user_login_info) {
            // variables
            var users = []
            var status = undefined
            // data
            var request_data = {
                "password": user_login_info['password']
            }
            request_data[user_login_info['keyname']] = user_login_info['keyvalue']
            // request
            this.$axios.request({
                url: "http://localhost:5000/api/login",
                method: "POST",
                data: request_data
            }).then((res) => {
                users = res.data
                status = true
            }).catch((err) => {
                users = err.response.data
                status = false
            }).then(() => {
                var response = {
                    "users": users,
                    "status": status
                }
                return response
            })

        },
        logout_user() {
            // variable
            var response = undefined
            var status = undefined
            // data
            var request_data = {
                "loginToken": this.$cookies.get('loginToken').loginToken
            }
            // request
            this.$axios.request({
                url: "http://localhost:5000/api/login",
                method: "DELETE",
                data: request_data
            }).then((res) => {
                response = res.data
                status = true
            }).catch((err) => {
                response = err.response.data
                status = false
            }).then(() => {
                response = {
                    "users": response,
                    "status": status
                }
                return response
            })

        },
        get_user(user_id) {
            // variables
            var users = []
            var status = undefined
            // params
            if (user_id === undefined) {
                var params = undefined
            } else {
                var params = {
                    "userId": user_id
                }
            }
            // request
            this.$axios.request({
                url: "http://localhost:5000/api/users",
                params
            }).then((res) => {
                users = res.data
                status = true
            }).catch((err) => {
                users = err.response.data
                status = false
            }).then(() => {
                var response = {
                    "users": users,
                    "status": status
                }
                return response
            })

        },
        post_user(user) {
            // variables
            var users = undefined
            var status = undefined
            // data
            var request_data = {
                email: user.email,
                username: user.username,
                password: user.password,
                bio: user.bio,
                birthdate: user.birthdate,
                imageUrl: 'https://images.unsplash.com/photo-1530842128367-9e448d986a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', // default profile image
                bannerUrl: 'https://images.unsplash.com/photo-1605778336713-0a7fb1b80c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80' // default image for profile banner
            }
            // if input was present - imageUrl, bannerUrl
            if (user.imageUrl != undefined) {
                request_data[imageUrl] = user.imageUrl
            }
            if (user.bannerUrl != undefined) {
                request_data[bannerUrl] = user.bannerUrl
            }
            // request
            this.$axios.request({
                url: "http://localhost:5000/api/users",
                method: "POST",
                data: request_data
            }).then((res) => {
                users = res.data
                status = true
            }).catch((err) => {
                users = err.response.data
                status = false
            }).then(() => {
                var response = {
                    "users": users,
                    "status": status
                }
                return response
            })
        },
        patch_user(user) {
            // variables
            var users = undefined
            var status = undefined
            // data
            var request_data = {
                loginToken: this.$cookies.get("loginToken").loginToken,
            }
            for (var i = 0; i < user.length; i++) {
                if (user[i] != undefined) {
                    request_data[Object.keys(user)[i]] = user[i]
                }
            }
            // request
            this.$axios.request({
                url: "http://localhost:5000/api/users",
                method: "PATCH",
                data: request_data
            }).then((res) => {
                users = res.data
                status = true
            }).catch((err) => {
                users = err.response.data
                status = false
            }).then(() => {
                var response = {
                    "users": users,
                    "status": status
                }
                return response
            })
        },
        delete_user(user) {
            // variables
            var response = undefined
            var status = undefined
            // data
            var request_data = {
                loginToken: this.$cookies.get("loginToken").loginToken,
                password: user.password
            }
            // request
            this.$axios.request({
                url: "http://localhost:5000/api/users",
                method: "DELETE",
                data: request_data
            }).then((res) => {
                response = res.data
                status = true
            }).catch((err) => {
                response = err.response.data
                status = false
            }).then(() => {
                response = {
                    "users": response,
                    "status": status
                }
                return response
            })
        },
        update_status_message(message, timeout) {
            // update status message
            this.status_message = message
            // reset message after timeout
            setTimeout(() => {
                this.status_message = undefined
            }, timeout)
        }, // function for login request
        submit_login(payload) {
            // login request from database
            var response = this.login_user(payload)
            // status check
            if (response.status) {
                // set cookies and $store with user profile and update status message to inform user
                this.$cookies.set('loginToken', JSON.stringify(response.users))
                this.update_status_message('login successful', 3000)
                this.$store.commit("update_user_profile", response.users);

            } else {
                this.update_status_message(response.users, 3000)
            }
        },
        submit_logout() {
            // change status message to inform user
            this.update_status_message("Please wait while we attempt to log you out...", 5000)
            var response = this.logout_user()
            // status check
            if (response.status) {
                this.$cookies.remove('loginToken')
                this.update_status_message(response.users, 3000)
            } else {
                this.update_status_message(response.users, 3000)
            }
        },
        create_user(payload) {
            // post request to database
            var response = this.post_user(payload)
            // status check
            if (response.status) {
                // set cookies and $store with user profile and update status message to inform user
                this.$cookies.set('loginToken', JSON.stringify(response.users))
                this.update_status_message('profile successfully created', 3000)
                this.$store.commit("update_user_profile", response.users)
            } else {
                this.update_status_message(response.users, 3000)
            }
        },
        edit_user(payload) {
            // patch request to database
            var response = this.patch_user(payload)
            // status check
            if (response.status) {
                // update cookie with new profile info
                var new_cookie = response.users
                new_cookie['loginToken'] = this.$cookies.get('loginToken').loginToken
                this.$cookies.remove('loginToken')
                this.$cookies.set('loginToken', JSON.stringify(new_cookie))
                // update message
                this.update_status_message("profile successfully updated", 3000)
                // update $store user_profile
                this.$store.commit("update_user_profile", new_cookie)
            } else {
                this.update_status_message(response.users, 3000)
            }
        },
        remove_user() {
            // delete request to database
            var response = this.delete_user()
        }

    },
    components: {
        IconButton,
        SubmitContent,
    },
    props: {
        submit_type: String,
    },
    data() {
        return {
            status_message: undefined
        }
    },
}
</script>

<style lang="scss" scoped>
</style>