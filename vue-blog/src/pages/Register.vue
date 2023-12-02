<script>
    import { useVuelidate } from '@vuelidate/core'
    import { required, email } from '@vuelidate/validators'

    export default {
        setup() {
            return { v$: useVuelidate() }
        },
        validations() {
            return {
                data: {
                    username: { required },
                    email: { required, email },
                    password: { required },
                    confirmPassword: { required },
                }
            }
        }
    }
</script>

<template>
    <form>
        <div>
            <label>Email</label>
            <input>
        </div>
        <div>
            <label>Username</label>
            <input>
        </div>
        <div>
            <label>Password</label>
            <input>
        </div>
        <div>
            <label>Confirm password</label>
            <input>
        </div>
        <button>Register</button>
    </form>
</template>

<style scoped>

</style>