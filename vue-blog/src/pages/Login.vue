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
                    email: { required, email },
                    password: { required },
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
            <label>Password</label>
            <input>
        </div>
        <button>Login</button>
    </form>
</template>

<style scoped>

</style>