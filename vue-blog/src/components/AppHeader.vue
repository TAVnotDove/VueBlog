<script>
import useUserStore from "../store/userStore";
import { mapState, mapActions } from "pinia";

export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    computed: {
        ...mapState(useUserStore, ['isAuth'])
    },
    methods: {
        ...mapActions(useUserStore, ['logoutUser']),
        logoutHandler() {
            if (window.confirm("Are you sure you want to logout?")) {
                localStorage.clear()

                this.logoutUser()

                this.$router.push('/')
            }
        }
    }
}
</script>

<template>
    <header>
        <nav>
            <router-link v-if="!isAuth" to="/">Home</router-link>
            <router-link v-if="!isAuth" to="/login">Login</router-link>
            <router-link v-if="!isAuth" to="/register">Register</router-link>
            <router-link v-if="isAuth" to="/posts">Posts</router-link>
            <router-link v-if="isAuth" to="/posts/create">Create post</router-link>
            <router-link v-if="isAuth" to="/profile">Profile</router-link>
            <button v-if="isAuth" @click="logoutHandler">Logout</button>
        </nav>
    </header>
</template>

<style scoped>
header {
    height: 10%;
}

nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
}

button {
    border: 0;
    background-color: transparent;
    font-size: 2rem;
    padding: 0.5rem;
}

button:hover {
    color: gray;
    cursor: pointer;
}

a {
    text-decoration: none;
    color: black;
    font-size: 2rem;
    padding: 0.5rem;
}

a.router-link-active {
    color: gray;
}

a:hover {
    color: gray;
}
</style>
