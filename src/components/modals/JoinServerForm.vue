<template>
    <div class="join-server">
        <div class="join-server-header">
            <p class="join-server-title">Join server</p>
        </div>

        <form class="join-server-form" @submit.prevent="onSubmit">
            <div class="input-group">
                <label for="invite-code">Have an invite code?</label>
                <input type="text" id="invite-code" min="2" max="100" v-model.trim="invite" autocomplete="off" required>
                <p class="server-error-msg" v-if="this.errorMessage">{{ this.errorMessage }}</p>
            </div>

            <button class="btn btn-confirm" type="submit" :disabled="!this.invite">Join</button>
            <a class="return-link" @click="backToSelection">Back</a>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    computed: {
        user() { return this.$store.state.user; }
    },
    data() {
        return {
            invite: null,
            errorMessage: ""
        }
    },
    methods: {
        onSubmit() {
            if (!this.invite) {
                this.errorMessage = "Please enter id of the server you wish to join.";
                return;
            }

            axios.post("http://84.194.175.102:3000/server/join", {invite: this.invite, uid: this.user._id, username: this.user.username})
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit("updateServers", res.data);
                        this.errorMessage = "";
                        this.$emit("joined-server");
                    }
                })
                .catch(err => {
                    if (err.response.data) {
                        switch(err.response.data) {
                            case "Could not find":
                                this.errorMessage = "Could not link code to existing server";
                                break;
                            case "Already joined":
                                this.errorMessage = "You are already a member of this server";
                                break;
                        }
                        return;
                    }
                    this.errorMessage = "Something went wrong. Please try again.";
                    console.error(err);
                });
        },
        backToSelection() {
            this.$emit('cancel-joining')
        },
    },
}
</script>

<style>
    .join-server {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;
    }

    .join-server-header {
        width: 100%;
        margin: 10px 0;
    }

    .join-server-title {
        font-size: 16px;
        line-height: 20px;
        color: #aaa;
        text-transform: lowercase;
        font-variant: small-caps;
        font-weight: bold;
    }

    .server-error-msg {
        margin-top: 10px;
        color: #b22;
        text-align: center;
    }

    .join-server-form {
        flex: 1;
        margin-top: 30px;
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }

    .join-server-form button {
        margin-top: 40px;
    }

    .join-server-form .input-group {
        width: 80%;
    }

    .join-server-form .input-group input {
        width: 100%;
    }

    .join-server-form .input-group label {
        display: inline-block;
        font-size: 16px;
        color: #bbb;
        margin-bottom: 5px;
    }
</style>