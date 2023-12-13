<script>
import useUserStore from "../store/userStore";
import { mapState } from "pinia";

export default {
    data() {
        return {
            user: {}
        }
    },
    computed: {
        ...mapState(useUserStore, ['userData'])
    },
    mounted() {
        this.user = { ...this.userData.user }
    }
}
</script>

<template>
    <div class="form-container">
        <h1>Profile</h1>
        <form>
            <div class="field-container">
                <label for="username">Username</label>
                <input disabled id="username" type="text" :value="user.username">
            </div>
            <div class="field-container">
                <label for="email">Email</label>
                <input disabled id="email" type="text" :value="user.email">
            </div>
            <div class="field-container">
                <label for="cretedOn">Created on</label>
                <input disabled id="cretedOn" type="text" :value="new Date(user.createDate).toString().substring(4, 24)">
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped></style>