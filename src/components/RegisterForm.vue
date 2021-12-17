<template>
    <div>
 <form action="javascript:void(0)">
     <input type="email" placeholder="email" required>
     <input type="text" placeholder="username" required>
     <input type="password" placeholder="password" required autocomplete="new-password" pattern="[0-9a-fA-F]{8,20}" title="Enter a password consisting of 8-20 hexadecimal digits">
     <input type="date" placeholder="birthday" required>
 </form>
    </div>
</template>

<script>
    export default {
        name: 'register-form',
    }
</script>

<style lang="scss" scoped>

</style>