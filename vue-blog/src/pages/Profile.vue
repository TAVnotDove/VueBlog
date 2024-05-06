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
        ...mapState(useUserStore, ['userData']),
        isDarkTheme() {
            const userStore = useUserStore();

            return userStore.theme === 'Dark'
        }
    },
    mounted() {
        this.user = { ...this.userData.user }
        this.theme = this.userData.theme
    },
    methods: {
        toggleTheme() {
            const userStore = useUserStore();
            userStore.toggleTheme();

            localStorage.setItem('theme', JSON.stringify(userStore.theme))
        }
    }
}
</script>

<template>
    <div class="container" :class="{ dark: isDarkTheme }">
        <h1 :class="{ dark: isDarkTheme }">Profile</h1>
        <form>
            <div class="field-container">
                <label for="username" :class="{ dark: isDarkTheme }">Username</label>
                <input disabled id="username" type="text" :value="user.username" :class="{ dark: isDarkTheme }">
            </div>
            <div class="field-container">
                <label for="email" :class="{ dark: isDarkTheme }">Email</label>
                <input disabled id="email" type="text" :value="user.email" :class="{ dark: isDarkTheme }">
            </div>
            <div class="field-container">
                <label for="cretedOn" :class="{ dark: isDarkTheme }">Created on</label>
                <input disabled id="cretedOn" type="text" :value="new Date(user.createDate).toString().substring(4, 24)"
                    :class="{ dark: isDarkTheme }">
            </div>
            <div class="field-container">
                <label for="theme" :class="{ dark: isDarkTheme }">Theme</label>
                <input id="theme" type="button" @click="toggleTheme" :value="isDarkTheme ? 'Dark' : 'Light'"
                    :class="{ dark: isDarkTheme }">
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    height: -moz-fit-content;
    height: fit-content;
    margin: auto 0;
}

@media (max-width: 640px) {
    .container {
        min-width: unset;
        max-width: 350px;
        width: 100%;
    }

    h1 {
        font-size: 1.125rem;
    }

    input {
        font-size: 1rem;
    }

    label {
        font-size: 0.875rem;
    }
}

@media (max-width: 384px) {
    .container {
        border-radius: 0;
        border-width: 1px 0;
    }
}
</style>