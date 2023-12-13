<script>
import { getPost, deletePost } from '../dataProviders/posts';
import { createComment, editComment, deleteComment } from '../dataProviders/comments'
import useUserStore from '../store/userStore'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            post: {},
            isLoading: true,
            text: '',
            editMode: false,
            editId: '',
            editText: '',
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
        async deletePostHandler() {
            if (window.confirm(`Are you sure you want to delete ${this.post.title}?`)) {
                const res = await deletePost(this.userData.jwt, this.$route.params.postId)

                if (!res.message) {
                    this.$router.push('/posts')
                }
            }
        },
        async commentHandler() {
            const res = await createComment(this.userData.jwt, this.text, this.$route.params.postId)

            if (!res.message) {
                const res2 = await getPost(this.userData.jwt, this.$route.params.postId)

                if (!res2.message) {
                    this.post = res2.post
                }
            }
        },
        async deleteCommentHandler(commentId, comment) {
            if (window.confirm(`Are you sure you want to delete ${comment}?`)) {
                const res = await deleteComment(this.userData.jwt, this.$route.params.postId, commentId)

                if (res.message = "Comment deleted") {
                    const res2 = await getPost(this.userData.jwt, this.$route.params.postId)

                    if (!res2.message) {
                        this.post = res2.post
                    }
                }
            }
        },
        showEdit(text, id) {
            this.editMode = true
            this.editText = text
            this.editId = id
        },
        async editCommentHandler() {
            const res = await editComment(this.userData.jwt, this.editText, this.$route.params.postId, this.editId)

            if (res.message === "Comment changed") {
                const res2 = await getPost(this.userData.jwt, this.$route.params.postId)
                if (!res2.message) {
                    this.post = res2.post
                    this.editMode = false
                }

            }
        }
    }
}
</script>

<template>
    <slot v-if="!isLoading">
        <div class="container">
            <div class="post">
                <p>Title: {{ post.title }}</p>
                <p>Text: {{ post.text }}</p>
                <p>Author: {{ post.author.username }}</p>
                <div class="buttons-container">
                    <router-link v-if="userData.user.id === post.author._id" :to="`/posts/${post._id}/edit`">Edit</router-link>
                    <button class="dlt" v-if="userData.user.id === post.author._id" @click="deletePostHandler">Delete</button>
                </div>
            </div>
            <div class="flex-center" style="flex-direction: column;">
                <slot v-if="!editMode">
                    <label for="write-comment">Text:</label>
                    <input id="write-comment" v-model="text">
                    <button @click="commentHandler">Comment</button>
                </slot>
                <slot v-else>
                    <label for="write-comment">Text:</label>
                    <input id="write-comment" v-model="editText">
                    <button @click="editCommentHandler">Edit</button>
                    <button @click="editMode = false">Cancel</button>
                </slot>
            </div>
            <div style="flex-direction: column;" class="flex-center">
                <p>Comments</p>
                <div v-for="comment in post.comments" class="comment">
                    <p>{{ comment.author.username }}: {{ comment.text }}</p>
                    <div class="buttons-container">
                        <button class="dlt" v-if="userData.user.id === comment.author._id"
                        @click="showEdit(comment.text, comment._id)">Edit</button>
                        <button class="dlt" v-if="userData.user.id === comment.author._id"
                        @click="deleteCommentHandler(comment._id, comment.text)">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </slot>
</template>

<style scoped>
.buttons-container {
    display: flex;
    justify-content: space-between;
}

div.post {
    background-color: rgba(0, 255, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

div.comment {
    background-color: rgba(0, 255, 0, 0.2);
    padding: 1rem;
    border-radius: 10px;
}

a {
    text-decoration: none;
    color: black;
}

a:hover {
    color: gray;
}

button.dlt {
    background: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    text-align: start;
    cursor: pointer;
    font-size: 1rem;
}

button.dlt:hover {
    color: gray;
}

p {
    font-size: 2rem;
}
</style>