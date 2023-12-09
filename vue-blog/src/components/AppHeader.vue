<script>
    import useUserStore from "../store/userStore";
    import { mapState } from "pinia";

    export default {
        setup() {
            const userStore = useUserStore()
            return { userStore }
        },
        computed: {
            ...mapState(useUserStore, ['isAuth'])
        }
    }
</script>

<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
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
