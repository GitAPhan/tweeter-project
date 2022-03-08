<template>
    <div>
        <button v-if="this.submit_type === 'login'" @click="submit_logout"/>
    </div>
</template>

<script>
export default {
    name: "icon-button",
    methods: {
        submit_logout() {
            // request to log user out
            this.$emit('submit_logout')
        }
    },
    props: {
        submit_type: String,
    },
}
</script>

<style lang="scss" scoped>
</style>