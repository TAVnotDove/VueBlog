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
    <input type="text" placeholder="Search" @change="changeHandler($event)" />
    <h1 v-if="posts.length === 0">No posts found</h1>
    <div v-else class="posts-container">
        <div v-for="post in posts" class="post">
            <h3>Title: {{ post?.title }}</h3>
            <h3>Author: {{ post?.author?.username }}</h3>
            <router-link :to="'/posts/' + post._id">Details</router-link>
        </div>
    </div>
</template>

<style scoped>
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
    flex-wrap: wrap;
}

.post {
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightgray;
    padding: 1rem;
}
</style>