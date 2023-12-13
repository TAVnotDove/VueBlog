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
    <div class="form-container">
        <h1>Register</h1>
        <form @submit.prevent="submitHandler">
            <div class="field-container">
                <label for="username">Username</label>
                <input id="username" v-model="formData.username">
            </div>
            <div class="field-container">
                <label for="email">Email</label>
                <input id="email" v-model="formData.email">
            </div>
            <div class="field-container">
                <label for="password">Password</label>
                <input id="password" v-model="formData.password">
            </div>
            <div class="field-container">
                <label for="confirmPassword">Confirm password</label>
                <input id="confirmPassword" v-model="formData.confirmPassword">
            </div>
            <button class="form-button">Register</button>
            <p class="error">{{ submitError }}</p>
        </form>
    </div>
</template>

<style scoped>
.error {
    color: red;
}
</style>