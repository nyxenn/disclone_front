<template>
  <div class="login-form" v-if="!isRegistering">
      <h2>Welcome back!</h2>
      <p v-if="errorMessage">{{errorMessage}}</p>

      <div class="premade-logins">
          <button @click="login('A')">A</button>
          <button @click="login('B')">B</button>
          <button @click="login('C')">C</button>
      </div>
      
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
    import RegistrationForm from './RegistrationForm.vue';
    import axios from 'axios';

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
                    axios.post("/user/login", {
                        "username": this.username,
                        "password": this.password
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.$emit('user-logged-in', res.data);
                            this.cleanForm();
                            return;
                        }
                        this.errorMessage = "Something went wrong. Please try again.";
                        return;
                    })
                    .catch(err => console.error(err));
                }
                this.errorMessage = "Please fill out all fields"

            },
            onRegisterLinkClicked() {
                this.cleanForm();
                this.isRegistering = true;
            },
            registrationCompleted(user) {
                this.isRegistering = false;
                this.username = user.username;
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
            },
            login(name) {
                if (name === "A") {
                    this.username = "a";
                    this.password = "a"
                }
                if (name === "B") {
                    this.username = "b";
                    this.password = "b";
                }
                if (name === "C") {
                    this.username = "c";
                    this.password = "c";
                }

                this.onSubmit();
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