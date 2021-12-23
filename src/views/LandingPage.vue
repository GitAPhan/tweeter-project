<template>
    <div>
        <register-form></register-form>
        <login-form></login-form>
    <section>
      <h4>Already a user?</h4>
      <a href="">Login Here</a>
    </section>
    </div>
</template>

<script>
    import RegisterForm from '@/components/RegisterForm.vue';
    import LoginForm from '@/components/LoginForm.vue';

    export default {
        name: 'landing-page',
        components: {
            RegisterForm,
            LoginForm,
        },
    }
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

</style>