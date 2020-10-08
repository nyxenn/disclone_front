<template>
    <form @submit.prevent="onSubmit">
        <p v-if="this.errorMessage">{{errorMessage}}</p>
        <label for="invite-code">Invite code</label>
        <input type="text" id="invite-code" min="2" max="100" v-model.lazy.trim="invite">

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

            axios.post("/server/join", {invite: this.invite, uid: this.user._id, username: this.user.username})
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

</style>