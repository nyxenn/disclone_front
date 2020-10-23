<template>
  <div class="register-form">
      <h2 class="welcome">Welcome <span class="strike-through">back</span>!</h2>
      <p class="error" v-if="errorMessage">{{errorMessage}}</p>

      <form id="register-form" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="register-username">Username</label>
            <input type="text" id="register-username" min="2" max="20" v-model.trim="username" autocomplete="off" required>
          </div>

          <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" v-model.trim="password" autocomplete="off" required>
          </div>

          <button class="btn btn-confirm" type="submit" :disabled="!this.username || !this.password || !this.checkLength()">Sign up</button>
          <p><a @click.prevent="returnToLoginForm" id="login-form-link">Already have an account?</a></p>
      </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
    methods: {
        onSubmit() {
            if (this.username && this.password) {
                axios.post("http://84.194.175.102:3000/user/register", {
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    if (res.status === 200) {
                        this.$emit("register-submitted", res.data);
                        return;
                    }
                    this.errorMessage = "Something went wrong. Please try again."
                })
                .catch(err => {
                    if (err.response.data) {
                        this.errorMessage = err.response.data;
                        return;
                    }
                    console.error(err);
                });
            }

            this.errorMessage = "Please fill in all fields";
        },
        returnToLoginForm() {
            this.$emit("register-cancelled");
        },
        checkLength() {
            if (this.username.length > 20 || this.username.length < 2) return false;
            return true;
        }
    },
    data() {
        return {
            username: "",
            password: "",
            errorMessage: ""
        }
    }
}
</script>

<style>
    .register-form {
        padding: 30px 0;
        user-select: none;
    }

    .welcome, .error {
        margin-bottom: 20px;
    }

    .welcome {
        font-size: 32px;
    }

    .error {
        font-size: 18px;
        color: #b22;
    }

    .register-form {
        background: #333;
        border-radius: 3px;
        box-shadow: 10px 10px 30px rgb(41, 41, 41);
        width: 60%;
        max-width: 700px;
        margin: auto;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: inline-block;
        width: 80%;
        text-align: left;
        margin-bottom: 4px;
        user-select: none;
    }

    .btn {
        border: none;
        color: #ccc;
        width: 80%;
        height: 40px;
        font-size: 20px;
        border-radius: 3px;
        margin-bottom: 10px;
    }

    .btn-confirm {
        background-color: #66E;
    }

    .btn-confirm:disabled {
        background-color: #559;
        color: #888;
    }

    .btn-confirm:hover {
        background-color: #55D;
        cursor: pointer;
    }

    .btn-confirm:disabled:hover {
        background-color: #559;
        cursor: default;
    }
</style>