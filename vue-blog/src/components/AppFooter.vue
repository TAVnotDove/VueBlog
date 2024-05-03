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
    <footer class="flex-center" :class="{ dark: isDarkTheme }">
        <p>TAVnotDove 2023</p>
    </footer>
</template>

<style>
footer {
    height: 10%;
    background-color: var(--main-bg-color);
}

footer p {
    color: var(--main-text-color);
    font-size: 2rem;
    font-weight: 600;
}

@media (max-width: 640px) {
    footer p {
        font-size: 1.25rem;
    }
}
</style>
