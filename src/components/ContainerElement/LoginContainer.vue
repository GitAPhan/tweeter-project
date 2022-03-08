// component to contain submitlogin and submitregistration
<template>
    <div>
        <user-request/>
    </div>
</template>

<script>
import UserRequest from "@/components/RequestElement/UserRequest.vue";

export default {
    name: 'login-container',
    methods: {

    },
    components: {
        UserRequest,

    }
}
</script>

<style lang="scss" scoped>
</style>