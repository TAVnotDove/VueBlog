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
    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="submitHandler">
            <div class="field-container">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="formData.email">
            </div>
            <div v-for="error of v$.formData.email.$errors" :key="error.$uid" class="input-errors">
                <div class="error-msg">
                    {{ error.$message }}
                </div>
            </div>
            <div class="field-container">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="formData.password">
            </div>
            <div v-for="error of v$.formData.password.$errors" :key="error.$uid" class="input-errors">
                <div class="error-msg">
                    {{ error.$message }}
                </div>
            </div>
            <button class="form-button">Login</button>
            <p class="error">{{ submitError }}</p>
        </form>
    </div>
</template>

<style scoped></style>