<script>
    export default {
        
    }
</script>

<template>
    <footer class="flex-center">
        <p>TAVnotDove 2023</p>
    </footer>
</template>

<style scoped>
    footer {
        height: 10%;
        background-color: var(--main-bg-color);
    }

    p {
        color: var(--main-text-color);
        font-size: 2rem;
        font-weight: 600;
    }

    @media (max-width: 640px) {
        p {
            font-size: 1.25rem;
        }
    }
</style>
