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
    <h1>Profile</h1>
    <div>
        <p>Username - {{ user.username }}</p>
        <p>Email - {{ user.email }}</p>
        <p>Created - {{ new Date(user.createDate).toString().substring(4, 24) }}</p>
    </div>
</template>

<style lang="scss" scoped></style>