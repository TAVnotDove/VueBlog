<script>
import { getAllPosts, searchPosts } from '../dataProviders/posts'
import useUserStore from '../store/userStore'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            posts: []
        }
    },
    computed: {
        ...mapState(useUserStore, ['userData'])
    },
    async mounted() {
        this.posts = await getAllPosts(this.userData.jwt)
    },
    methods: {
        async changeHandler(event) {
            const res = await searchPosts(this.userData.jwt, event.currentTarget.value)

            if (!res.message) {
                this.posts = res.posts
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <h1>Posts</h1>
        <input class="search-bar" type="text" placeholder="Search" @change="changeHandler($event)" />
        <h1 v-if="posts.length === 0">No posts found</h1>
        <div v-else class="posts-container">
            <div v-for="post in posts" class="post">
                <h3>{{ post?.title }}</h3>
                <p>Author: {{ post?.author?.username }}</p>
                <router-link :to="'/posts/' + post._id">Details</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.search-bar {
    outline: none;
    font-size: 1.25rem;
    padding: 0.25rem;
    align-self: center;
}

a {
    text-decoration: none;
    color: black;
}

a:hover {
    color: gray;
}

.posts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 454px;
    overflow: hidden;
    overflow-y: auto;
}

.post {
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightgray;
    padding: 1rem;
}
</style>