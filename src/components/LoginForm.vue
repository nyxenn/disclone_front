<template>
  <div class="login-form" v-if="!isRegistering">
      <h2>Welcome back!</h2>
      <form @submit.prevent="onSubmit">
          <label for="login-username">Username</label>
          <input type="text" id="login-username" v-model.lazy.trim="username" ref="usernameField" required>

          <label for="login-password">Password</label>
          <input type="password" id="login-password" v-model.lazy.trim="password" required>

          <button class="btn btn-confirm" type="submit">Login</button>
          <p>Need an account? <a @click.prevent="onRegisterLinkClicked" id="register-form-link">Register</a></p>
      </form>
  </div>

  <registration-form v-else @register-submitted="registrationCompleted" @register-cancelled="registrationCancelled" />
</template>

<script>
    import {login} from '../helpers/helpers.js';
    import RegistrationForm from './RegistrationForm.vue';

    export default {
        components: {
            RegistrationForm
        },
        methods: {
            cleanForm() {
                this.username = "";
                this.password = "";
            },
            onSubmit() {
                if (this.username && this.password) {
                    if (login(this.username, this.password)) {
                        console.log('Succesfully logged in', [{'u': this.username}, {'p': this.password}]);
                        this.cleanForm();
                        return;
                    }
                    console.log('No matching user found');
                    return;
                }
                console.log('Fill out form')

            },
            onRegisterLinkClicked() {
                this.isRegistering = true;
                this.cleanForm();
            },
            registrationCompleted() {
                this.isRegistering = false;
                this.focusOnUsernameField();
            },
            registrationCancelled() {
                this.isRegistering = false;
                this.focusOnUsernameField();
            },
            focusOnUsernameField() {
                this.$nextTick(() => {
                    const usernameFieldRef = this.$refs.usernameField;
                    usernameFieldRef.focus();
                });
            }
        },
        data() {
            return {
                isRegistering: false,
                username: "",
                password: ""
            }
        }

    }
</script>

<style>

</style>