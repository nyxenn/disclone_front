<template>
  <div class="register-form">
      <h2>Welcome <span class="strike-through">back</span>!</h2>
      <p v-if="errorMessage">{{errorMessage}}</p>

      <form @submit.prevent="onSubmit">
          <label for="register-username">Username</label>
          <input type="text" id="register-username" v-model.lazy.trim="username" required>

          <label for="register-password">Password</label>
          <input type="password" id="register-password" v-model.lazy.trim="password" required>

          <button class="btn btn-confirm" type="submit">Sign up</button>
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
                axios.post("/user/register", {
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
                        this.errorMessage = "Username already taken";
                        return;
                    }
                    console.error(err);
                });
            }

            this.errorMessage = "Please fill in all fields";
        },
        returnToLoginForm() {
            this.$emit("register-cancelled");
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
    .strike-through {
        text-decoration-line: line-through;
    }
</style>