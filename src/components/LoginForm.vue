<template>
  <div class="login-form" v-if="!isRegistering">
      <h2 class="welcome">Welcome back!</h2>
      <p class="error" v-if="errorMessage">{{errorMessage}}</p>

      <div class="premade-logins">
          <p>Premade logins</p>
          <button @click="login('A')">A</button>
          <button @click="login('B')">B</button>
          <button @click="login('C')">C</button>
      </div>
      
      <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="login-username">Username</label>
            <input type="text" id="login-username" v-model.trim="username" ref="usernameField" required>
          </div>

          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" v-model.trim="password" ref="passwordField" autocomplete="off" required>
          </div>

          <button class="btn btn-confirm" type="submit" :disabled="!this.username || !this.password">Login</button>
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
        computed: {
            baseUrl() { return this.$store.state.baseip; }
        },
        methods: {
            cleanForm() {
                this.username = "";
                this.password = "";
            },
            onSubmit() {
                if (this.username && this.password) {
                    axios.post(this.baseUrl + "/user/login", {
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
                else {
                    this.errorMessage = "Please fill out all fields"
                }
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
    .login-form {
        padding: 30px 0;
        user-select: none;
    }

    .login-form {
        background: #333;
        border-radius: 3px;
        box-shadow: 10px 10px 30px rgb(41, 41, 41);
        width: 60%;
        max-width: 700px;
        margin: auto;
    }

    .premade-logins {
        color: #aaa;
        margin-bottom: 30px;
    }

    .premade-logins p {
        margin: 5px 0;
    }

    .premade-logins button {
        width: 10%;
        height: 30px;
        margin: 0 5px;
        border: none;
        border-radius: 4px;
        background-color: #222;
        color: #aaa;
        font-family: 'Whitney Medium';
        font-size: 16px;
    }

    .premade-logins button:hover {
        color: #55D;
        cursor: pointer;
    }
</style>