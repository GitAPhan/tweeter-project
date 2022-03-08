<template>
    <div></div>
</template>

<script>
export default {
    name: "comment-request",
    methods: {
        db_request(request_data, request_method) {
            var response = undefined
            var status = undefined
            // axios request
            this.$axios.request({
                url: "http://localhost:5000/api/comments",
                method: request_method,
                request_data
            }).then((res) => {
                response = res.data
                status = true
            }).catch((err) => {
                response = err.response.data
                status = false
            }).then(() => {
                response = {
                    "comments": response,
                    "status": status
                }
                return response
            })
        },
        get(keyname, keyvalue) {
            var request_params = {
                "params": {}
            }
            request_params['params'][keyname] = keyvalue

            // axios request
            return this.db_request(request_params, "GET")
        },
        post(comment_data) {
            var request_data = {
                "data": {
                    "loginToken": this.$cookies.get('loginToken').loginToken
                }
            };
            for (var i = 0; i < comment_data.length; i++) {
                if (comment_data[i] != undefined) {
                    request_data['data'][Object.keys(comment_data)[i]] = comment_data[i]
                }
            }
            // axios request
            return this.db_request(request_data, "POST")
        },
        patch(comment_data) {
            var request_data = {
                "data": {
                    "loginToken": this.$cookies.get('loginToken').loginToken
                }
            };
            for (var i = 0; i < comment_data.length; i++) {
                if (comment_data[i] != undefined) {
                    request_data['data'][Object.keys(comment_data)[i]] = comment_data[i]
                }
            }
            // axios request
            return this.db_request(request_data, "PATCH")
        },
        delete(comment_data) {
            var request_data = {
                "data": {
                    "loginToken": this.$cookies.get('loginToken').loginToken
                }
            };
            for (var i = 0; i < comment_data.length; i++) {
                if (comment_data[i] != undefined) {
                    request_data['data'][Object.keys(comment_data)[i]] = comment_data[i]
                }
            }
            // axios request
            return this.db_request(request_data, "DELETE")
        },
    },
}
</script>

<style lang="scss" scoped>
</style>