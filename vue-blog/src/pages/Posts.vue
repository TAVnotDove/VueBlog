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
        ...mapState(useUserStore, ['userData']),
        isDarkTheme() {
            const userStore = useUserStore();

            return userStore.theme === 'Dark'
        }
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
    <div class="container" :class="{ dark: isDarkTheme }">
        <h1 :class="{ dark: isDarkTheme }">Posts</h1>
        <input class="search-bar" type="text" placeholder="Search" @change="changeHandler($event)"
            :class="{ dark: isDarkTheme }" />
        <h1 v-if="posts.length === 0">No posts found</h1>
        <div v-else class="posts-container" :class="{ dark: isDarkTheme }">
            <div v-for="post in posts" class="post" :class="{ dark: isDarkTheme }">
                <h3>{{ post?.title }}</h3>
                <p>Author: {{ post?.author?.username }}</p>
                <router-link :to="'/posts/' + post._id">Details</router-link>
            </div>
        </div>
    </div>
</template>

<style>
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
    margin-top: 0.5rem;
}

a:hover {
    color: gray;
}

.posts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding-bottom: 4px;
}

.post {
    max-width: 500px;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgba(0, 255, 0, 0.2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.post h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.25rem;
}

@media (max-width: 640px) {
    h1 {
        font-size: 1.25rem;
        margin-bottom: unset;
    }

    .search-bar {
        font-size: 1rem;
    }

    .container {
        min-width: unset;
        width: 100%;
        border-radius: unset;
    }

    .post {
        max-width: unset;
        width: calc(100% - 64px);
    }

    .posts-container {
        align-items: center;
    }
}
</style>