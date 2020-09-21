<template>
    <form @submit.prevent="onSubmit">
        <p v-if="this.errorMessage">{{errorMessage}}</p>
        <label for="server-id">Server ID</label>
        <input type="text" id="server-id" min="2" max="100" v-model.lazy.trim="serverId">

        <a @click="backToSelection">Back</a>
        <button type="submit">Join</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
    computed: {
        user() { return this.$store.state.user; }
    },
    data() {
        return {
            serverId: null,
            errorMessage: ""
        }
    },
    methods: {
        onSubmit() {
            if (!this.serverId) {
                this.errorMessage = "Please enter id of the server you wish to join.";
                return;
            }

            axios.post("/server/join", {serverid: this.serverId, userid: this.user.uid})
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
                                this.errorMessage = "Could not find server with given id";
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

</style>