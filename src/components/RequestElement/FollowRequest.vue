<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'follow-request',
        methods: {
            // database request
            db_request(request_data, request_method, url) {
                var users = undefined
                var status = undefined
                var link = {
                    "follows": "http://localhost:5000/api/follows",
                    "followers": "http://localhost:5000/api/followers"
                }
                // request
                this.$axios.request({
                    url: link['url'],
                    method: request_method,
                    request_data
                }).then((res) => {
                    users = res.data
                    status = true
                }).catch((err) => {
                    users = err.response.data
                    status = false
                }).then(() => {
                    var response = {
                        // keyname will be either follows or followers depending on request type
                        url: users,
                        "status": status
                    }
                    return response
                })

            },
            get_follow(userId) {
                var request_param = {
                    "params": {
                        "userId": userId
                    }
                }
                // axios request
                return this.db_request(request_param, "GET", "follows")
            },
            get_follower(userId) {
                var request_param = {
                    "params": {
                        "userId": userId
                    }
                }
                // axios request
                return this.db_request(request_param, "GET", "followers")
            },
            post(followId) {
                var request_data = {
                    "data": {
                        "loginToken": this.$cookies.get('loginToken').loginToken,
                        "followId": followId
                    }
                }
                // axios request
                return this.db_request(request_data, "POST", "follows")
            },
            delete(followId) {
                var request_data = {
                    "data": {
                        "loginToken": this.$cookies.get('loginToken').loginToken,
                        "followId": followId
                    }
                }
                // axios request
                return this.db_request(request_data, "DELETE", "follows")
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>