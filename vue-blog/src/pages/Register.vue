<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
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
                username: { required: helpers.withMessage('This field cannot be empty', required) },
                email: {
                    required: helpers.withMessage('This field cannot be empty', required),
                    email: helpers.withMessage('This is not a valid email', email)
                },
                password: { required: helpers.withMessage('This field cannot be empty', required) },
                confirmPassword: { required: helpers.withMessage('This field cannot be empty', required) },
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
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent="submitHandler">
            <div class="field-container">
                <label for="username">Username</label>
                <input id="username" type="text" v-model="formData.username">
            </div>
            <div v-for="error of v$.formData.username.$errors" :key="error.$uid" class="input-errors">
                <div class="error-msg">
                    {{ error.$message }}
                </div>
            </div>
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
            <div class="field-container">
                <label for="confirmPassword">Confirm password</label>
                <input id="confirmPassword" type="password" v-model="formData.confirmPassword">
            </div>
            <div v-for="error of v$.formData.confirmPassword.$errors" :key="error.$uid" class="input-errors">
                <div class="error-msg">
                    {{ error.$message }}
                </div>
            </div>
            <button class="form-button">Register</button>
            <p class="error">{{ submitError }}</p>
        </form>
    </div>
</template>

<style scoped>
.container {
    height: -moz-fit-content;
    height: fit-content;
    margin: auto;
}

@media (max-width: 640px) {
    .container {
        min-width: unset;
        max-width: 350px;
        width: 100%;
    }

    a,
    h1 {
        font-size: 1.125rem;
    }

    input {
        font-size: 1rem;
    }

    label,
    .form-button {
        font-size: 0.875rem;
    }
}

@media (max-width: 384px) {
    .container {
        border-radius: 0;
        border-width: 1px 0;
    }
}
</style>