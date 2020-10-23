<template>
    <div class="create-server">
        <div class="create-server-header">
            <p class="create-server-title">Create server</p>
        </div>

        <form class="create-server-form" @submit.prevent="onSubmit">
            <div class="input-group">
                <label for="server-name">Server Name</label>
                <input type="text" id="server-name" min="2" max="60" v-model.trim="serverName" autocomplete="off" required>
                <p class="server-error-msg" v-if="this.errorMessage">{{ this.errorMessage }}</p>
            </div>

            <button class="btn btn-confirm" type="submit" :disabled="!this.serverName || this.serverName.length > 60 || this.serverName.length < 2">Create</button>
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
            serverName: "",
            errorMessage: ""
        }
    },
    methods: {
        onSubmit() {
            if (!this.serverName) {
                this.errorMessage = "Please provide a name for the server.";
                return;
            }

            axios.post("http://84.194.175.102:3000/server/new", {name: this.serverName, uid: this.user._id})
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit("updateServers", res.data);
                        this.$emit('created-server');
                        return;
                    }
                })
                .catch(err => {
                    this.errorMessage = "Something went wrong. Please try again.";
                    console.error(err);
                    return;
                });
        },
        backToSelection() {
            this.$emit('cancel-creation');
        }
    }
}
</script>

<style>
    .create-server {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;
    }

    .create-server-header {
        width: 100%;
        margin: 10px 0;
    }

    .create-server-title {
        font-size: 16px;
        line-height: 20px;
        color: #aaa;
        text-transform: lowercase;
        font-variant: small-caps;
        font-weight: bold;
    }

    .create-server-form {
        flex: 1;
        margin-top: 30px;
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }

    .create-server-form button {
        margin-top: 40px;
    }

    .create-server-form .input-group {
        width: 80%;
    }

    .create-server-form .input-group input {
        width: 100%;
    }

    .create-server-form .input-group label {
        display: inline-block;
        font-size: 16px;
        color: #bbb;
        margin-bottom: 5px;
    }
</style>