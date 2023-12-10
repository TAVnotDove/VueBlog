<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { mapActions } from 'pinia'
import useUserStore from '../store/userStore'
import { login } from '../dataProviders/auth'

export default {
    data() {
        return {
            formData: {
                email: '',
                password: '',
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
                email: { required, email },
                password: { required },
            }
        }
    },
    methods: {
        ...mapActions(useUserStore, ['loginUser']),
        async submitHandler() {
            const isValid = await this.v$.$validate()

            if (isValid) {

                const res = await login(this.formData)

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
            <label>Email</label>
            <input v-model="formData.email">
        </div>
        <div>
            <label>Password</label>
            <input v-model="formData.password">
        </div>
        <button>Login</button>
        <p class="error">{{ submitError }}</p>
    </form>
</template>

<style scoped>
.error {
    color: red;
}
</style>