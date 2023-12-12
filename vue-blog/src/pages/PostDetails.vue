<script>
import { getPost, deletePost } from '../dataProviders/posts';
import useUserStore from '../store/userStore'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            post: {},
            isLoading: true
        }
    },
    computed: {
        ...mapState(useUserStore, ['userData'])
    },
    async mounted() {
        const result = await getPost(this.userData.jwt, this.$route.params.postId)

        this.isLoading = false
        if (result.post) {
            this.post = result.post
        }
    },
    methods: {
        async deleteHandler() {
            if (window.confirm(`Are you sure you want to delete ${this.post.title}?`)) {
                const res = await deletePost(this.userData.jwt, this.$route.params.postId)

                if (!res.message) {
                    this.$router.push('/posts')
                }
            }
        }
    }
}
</script>

<template>
    <div v-if="!isLoading">
        <p>Title: {{ post.title }}</p>
        <p>Text: {{ post.text }}</p>
        <p>Author: {{ post.author.username }}</p>
        <router-link v-if="userData.user.id === post.author._id" :to="`/posts/${post._id}/edit`">Edit</router-link>
        <button v-if="userData.user.id === post.author._id" @click="deleteHandler">Delete</button>
    </div>
</template>

<style scoped>
div {
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

a {
    text-decoration: none;
    color: black;
}

a:hover {
    color: gray;
}

button {
    background: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    text-align: start;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    color: gray;
}

p {
    font-size: 2rem;
}
</style>