<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
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
        ...mapState(useUserStore, ['userData']),
        isDarkTheme() {
            const userStore = useUserStore();

            return userStore.theme === 'Dark'
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            formData: {
                title: { required: helpers.withMessage('This field cannot be empty', required) },
                text: { required: helpers.withMessage('This field cannot be empty', required) },
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
    <div class="container" :class="{ dark: isDarkTheme }">
        <h1 :class="{ dark: isDarkTheme }">Create Post</h1>
        <form @submit.prevent="submitHandler">
            <div class="field-container">
                <label :class="{ dark: isDarkTheme }" for="title">Title</label>
                <input :class="{ dark: isDarkTheme }" id="title" v-model="formData.title">
            </div>
            <div v-for="error of v$.formData.title.$errors" :key="error.$uid" class="input-errors">
                <div class="error-msg">
                    {{ error.$message }}
                </div>
            </div>
            <div class="field-container">
                <label :class="{ dark: isDarkTheme }" for="text">Text</label>
                <input :class="{ dark: isDarkTheme }" id="text" v-model="formData.text">
            </div>
            <div v-for="error of v$.formData.text.$errors" :key="error.$uid" class="input-errors">
                <div class="error-msg">
                    {{ error.$message }}
                </div>
            </div>
            <button class="form-button">Post</button>
            <p class="error">{{ submitError }}</p>
        </form>
    </div>
</template>

<style scoped>
.container {
    height: -moz-fit-content;
    height: fit-content;
    margin: auto 0;
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
