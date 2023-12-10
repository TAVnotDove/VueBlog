<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { register } from '../dataProviders/auth'
import useUserStore from '../store/userStore'
import { mapActions } from 'pinia'

export default {
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            submitError: ''
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            formData: {
                username: { required },
                email: { required, email },
                password: { required },
                confirmPassword: { required },
            }
        }
    },
    methods: {
        ...mapActions(useUserStore, ['loginUser']),
        async submitHandler() {
            const isValid = await this.v$.$validate()

            if (isValid) {
                const { username, email, password } = this.formData

                const res = await register({
                    username,
                    email,
                    password
                })

                if (!res.message) {
                    localStorage.setItem('user-data', JSON.stringify(res.data))

                    this.loginUser(res.data)

                    this.$router.push('profile')
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
            <label>Username</label>
            <input v-model="formData.username">
        </div>
        <div>
            <label>Email</label>
            <input v-model="formData.email">
        </div>
        <div>
            <label>Password</label>
            <input v-model="formData.password">
        </div>
        <div>
            <label>Confirm password</label>
            <input v-model="formData.confirmPassword">
        </div>
        <button>Register</button>
        <p class="error">{{ submitError }}</p>
    </form>
</template>

<style scoped>
.error {
    color: red;
}
</style>