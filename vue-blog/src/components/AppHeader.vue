<script>
import useUserStore from "../store/userStore";
import { mapState, mapActions } from "pinia";

export default {
    setup() {
        const userStore = useUserStore()

        return { userStore }
    },
    data() {
        return {
            notAuthLinks: [{
                isAuth: false,
                to: "/",
                title: 'Home'
            }, {
                isAuth: false,
                to: "/login",
                title: 'Login'
            }, {
                isAuth: false,
                to: "/register",
                title: 'Register'
            }],
            isAuthLinks: [{
                isAuth: true,
                to: "/posts",
                title: 'Posts'
            }, {
                isAuth: true,
                to: "/posts/create",
                title: 'Create post'
            }, {
                isAuth: true,
                to: "/profile",
                title: 'Profile'
            }],
        }
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
        },
    }
}
</script>

<template>
    <header>
        <nav>
            <template v-if="!isAuth">
                <router-link v-for="routerData of notAuthLinks" :key="routerData.title" :to="routerData.to">
                    {{ routerData.title }}
                </router-link>
            </template>

            <template v-if="isAuth">
                <router-link v-for="routerData of isAuthLinks" :key="routerData.title" :to="routerData.to">
                    {{ routerData.title }}
                </router-link>

                <button v-if="isAuth" @click="logoutHandler">Logout</button>
            </template>
        </nav>
    </header>
</template>

<style scoped>
header {
    height: 10%;
    background-color: var(--main-bg-color);
}

nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
}

a {
    text-decoration: none;
    color: var(--main-text-color);
    font-size: 2rem;
    padding: 0.5rem;
    transition-duration: 300ms;
}

a:hover {
    transform: translateY(-0.5rem);
    color: gray;
}

a.router-link-active {
    transform: translateY(-0.5rem);
    color: gray;
}

button {
    color: var(--main-text-color);
    border: 0;
    background-color: transparent;
    font-size: 2rem;
    padding: 0.5rem;
    transition-duration: 300ms;
}

button:hover {
    transform: translateY(-0.5rem);
    color: gray;
    cursor: pointer;
}
</style>
