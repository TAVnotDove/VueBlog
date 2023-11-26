<script>
    export default {
        
    }
</script>

<template>
    <header>
        <nav>
            <a href="#">Home</a>
            <a href="#">Register</a>
            <a href="#">Login</a>
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

    a:hover {
        color: gray;
    }
</style>
