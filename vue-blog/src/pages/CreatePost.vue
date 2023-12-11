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
            console.log(isValid)
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
    <form @submit.prevent="submitHandler">
        <div>
            <label>Title</label>
            <input v-model="formData.title">
        </div>
        <div>
            <label>Text</label>
            <input v-model="formData.text">
        </div>
        <button>Post</button>
        <p class="error">{{ submitError }}</p>
    </form>
</template>

<style scoped>
.error {
    color: red;
}
</style>
