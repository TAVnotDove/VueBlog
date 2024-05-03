<script>
import useUserStore from "../store/userStore";

export default {
    computed: {
        isDarkTheme() {
            const userStore = useUserStore();

            return userStore.theme === 'Dark'
        }
    },
}
</script>

<template>
    <div class="flex-center">
        <h1 :class="{ dark: isDarkTheme }">Welcome to VueBlog!</h1>
    </div>
</template>

<style scoped>
@media (max-width: 640px) {
    h1 {
        font-size: 1.125rem;
    }
}
</style>