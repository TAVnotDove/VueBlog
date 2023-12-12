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
    <form v-if="!isLoading" @submit.prevent="submitHandler">
        <div>
            <label>Title</label>
            <input v-model="formData.title">
        </div>
        <div>
            <label>Text</label>
            <input v-model="formData.text">
        </div>
        <button>Edit</button>
        <p class="error">{{ submitError }}</p>
    </form>
</template>

<style scoped>
.error {
    color: red;
}
</style>
