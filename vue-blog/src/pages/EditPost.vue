<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { editPost, getPost } from '../dataProviders/posts'
import useUserStore from '../store/userStore'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            formData: {
                title: '',
                text: '',
            },
            submitError: '',
            isLoading: true
        }
    },
    computed: {
        ...mapState(useUserStore, ['userData'])
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            formData: {
                title: { required },
                text: { required },
            }
        }
    },
    async mounted() {
        const result = await getPost(this.userData.jwt, this.$route.params.postId)

        this.isLoading = false
        if (result.post) {
            this.formData = { title: result.post.title, text: result.post.text }
        }
    },
    methods: {
        async submitHandler() {
            const isValid = await this.v$.$validate()

            if (isValid) {
                const res = await editPost(this.userData.jwt, this.formData, this.$route.params.postId)

                if (!res.message) {
                    this.$router.push('/posts')
                } else {
                    this.submitError = res.message
                }
            }
        }
    }
}
</script>

<template>
    <div v-if="!isLoading" class="form-container">
        <h1>Edit Post</h1>
        <form @submit.prevent="submitHandler">
            <div class="field-container">
                <label for="title">Title</label>
                <input id="title" v-model="formData.title">
            </div>
            <div class="field-container">
                <label for="text">Text</label>
                <input id="text" v-model="formData.text">
            </div>
            <button class="form-button">Edit</button>
            <p class="error">{{ submitError }}</p>
        </form>
    </div>
</template>

<style scoped>
.error {
    color: red;
}
</style>
