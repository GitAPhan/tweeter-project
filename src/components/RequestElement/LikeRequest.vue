<template>
    <div></div>
</template>

<script>
export default {
    name: "like-request",
    methods: {
        db_request(request_data, request_method, request_url) {
            var response = undefined
            var status = undefined

            var url = {
                "comment_likes": "http://localhost:5000/api/comment_likes",
                "tweet_likes": "http://localhost:5000/api/tweet_likes"
            }
            // axios request
            this.$axios.request({
                url: url[request_url],
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
                    request_url: response,
                    "status": status
                }
                return response
            })
        },
        get(payload, type) {
            var request_params = {
                "params": {}
            }
            for (var i = 0; i < payload.length; i++) {
                if (payload[i] != undefined) {
                    request_params['params'][Object.keys(payload)[i]] = payload[i]
                }
            }
            // axios request
            return this.db_request(request_params, "GET", type)
        },
        post(payload, type) {
            var request_data = {
                "data": {
                    "loginToken": this.$cookies.get('loginToken').loginToken
                }
            }
            for (var i = 0; i < payload.length; i++) {
                if (payload[i] != undefined) {
                    request_data['data'][Object.keys(payload)[i]] = payload[i]
                }
            }
            // axios request
            return this.db_request(request_data, "POST", type)
        },
        delete(payload, type) {
            var request_data = {
                "data": {
                    "loginToken": this.$cookies.get('loginToken').loginToken
                }
            }
            for (var i=0; i < payload.length; i++) {
                if (payload[i] != undefined) {
                    request_data['data'][Object.keys(payload)[i]] = payload[i]
                }
            }
            // axios request
            return this.db_request(request_data, "DELETE", type)
        }
    },
}
</script>

<style lang="scss" scoped>
</style>