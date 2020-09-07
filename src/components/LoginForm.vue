<template>
  <div class="login-form" v-if="!isRegistering">
      <h2>Welcome back!</h2>
      <p v-if="errorMessage">{{errorMessage}}</p>
      
      <form @submit.prevent="onSubmit">
          <label for="login-username">Username</label>
          <input type="text" id="login-username" v-model.lazy.trim="username" ref="usernameField" required>

          <label for="login-password">Password</label>
          <input type="password" id="login-password" v-model.lazy.trim="password" ref="passwordField" required>

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
                        this.$emit('user-logged-in', this.username);
                        this.cleanForm();
                        return;
                    }
                    this.errorMessage = "No matching user found";
                    return;
                }
                this.errorMessage = "Please fill out all fields"

            },
            onRegisterLinkClicked() {
                this.cleanForm();
                this.isRegistering = true;
            },
            registrationCompleted(username) {
                this.isRegistering = false;
                this.username = username;
                this.focusOnPasswordField();
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
            },
            focusOnPasswordField() {
                this.$nextTick(() => {
                    const passwordFieldRef = this.$refs.passwordField;
                    passwordFieldRef.focus();
                });
            }
        },
        data() {
            return {
                isRegistering: false,
                errorMessage: "",
                username: "",
                password: ""
            }
        }

    }
</script>

<style>

</style>