<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createPost } from '../dataProviders/posts'
import useUserStore from '../store/userStore'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            formData: {
                title: '',
                text: '',
            },
            submitError: ''
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
    methods: {
        async submitHandler() {
            const isValid = await this.v$.$validate()

            if (isValid) {

                const res = await createPost(this.userData.jwt, this.formData)

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
    <div class="form-container">
        <h1>Create Post</h1>
        <form @submit.prevent="submitHandler">
            <div class="field-container">
                <label for="title">Title</label>
                <input id="title" v-model="formData.title">
            </div>
            <div class="field-container">
                <label for="text">Text</label>
                <input id="text" v-model="formData.text">
            </div>
            <button class="form-button">Post</button>
            <p class="error">{{ submitError }}</p>
        </form>
    </div>
</template>

<style scoped>
.error {
    color: red;
}
</style>
