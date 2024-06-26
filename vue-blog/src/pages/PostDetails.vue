<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
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
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            text: { required: helpers.withMessage('This field cannot be empty', required) },
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
        const result = await getPost(this.userData.jwt, this.$route.params.postId)

        if (result.post) {
            this.isLoading = false
            this.post = result.post
        } else {
            this.$router.push('/posts')
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
            const isValid = await this.v$.$validate()

            if (isValid) {
                const res = await createComment(this.userData.jwt, this.text, this.$route.params.postId)

                if (!res.message) {
                    const res2 = await getPost(this.userData.jwt, this.$route.params.postId)

                    if (!res2.message) {
                        this.post = res2.post
                        this.text = ''
                        this.v$.$reset()
                    }
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
            if (this.editText !== '') {
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
}
</script>

<template>
    <slot v-if="!isLoading">
        <div class="container" :class="{ dark: isDarkTheme }">
            <div class="post-details">
                <p class="post-title" :class="{ dark: isDarkTheme }">{{ post.title }}</p>
                <p class="post-author" :class="{ dark: isDarkTheme }">By <strong>{{ post.author.username }}</strong></p>
                <p class="post-text" :class="{ dark: isDarkTheme }">{{ post.text }}</p>
                <div class="buttons-container">
                    <router-link v-if="userData.user.id === post.author._id"
                        :to="`/posts/${post._id}/edit`">Edit</router-link>
                    <button class="dlt" v-if="userData.user.id === post.author._id"
                        @click="deletePostHandler">Delete</button>
                </div>
            </div>
            <div style="flex-direction: column;" class="flex-center">
                <label for="write-comment" :class="{ dark: isDarkTheme }">Comments</label>
                <div class="flex-center" style="flex-direction: column;">
                    <div class="field-container" v-if="!editMode">
                        <input id="write-comment" v-model.trim="text" :class="{ dark: isDarkTheme }">
                        <div v-for="error of v$.text.$errors" :key="error.$uid" class="input-errors">
                            <div class="error-msg">
                                {{ error.$message }}
                            </div>
                        </div>
                        <input type="button" @click="commentHandler" :class="{ dark: isDarkTheme }" value="Comment" />
                    </div>
                    <div class="field-container" v-else>
                        <label for="write-comment" :class="{ dark: isDarkTheme }">Text:</label>
                        <input id="write-comment" v-model="editText" :class="{ dark: isDarkTheme }">
                        <input type="button" @click="editCommentHandler" :class="{ dark: isDarkTheme }" value="Edit" />
                        <input type="button" @click="editMode = false" :class="{ dark: isDarkTheme }" value="Cancel" />
                    </div>
                </div>
                <div class="comments-container">
                    <div v-for="comment in post.comments" class="comment">
                        <p :class="{ dark: isDarkTheme }"><strong>{{ comment.author.username }}:</strong> {{
                            comment.text }}</p>
                        <div class="buttons-container">
                            <button class="dlt" v-if="userData.user.id === comment.author._id"
                                @click="showEdit(comment.text, comment._id)"
                                :class="{ dark: isDarkTheme }">Edit</button>
                            <button class="dlt" v-if="userData.user.id === comment.author._id"
                                @click="deleteCommentHandler(comment._id, comment.text)"
                                :class="{ dark: isDarkTheme }">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </slot>
</template>

<style>
.comments-container {
    min-height: 220px;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.container {
    max-width: 750px;
    overflow: hidden;
    overflow-y: auto;
}

.buttons-container {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}

div.post-details {
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

p,
label {
    font-size: 2rem;
}

p.post-title {
    font-weight: bold;
}

.field-container input[type='button'].dark {
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding: 1px 6px;
}
</style>