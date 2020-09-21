<template>
    <div>
        <span v-if="this.errorMessage" class="create-server-error">{{ this.errorMessage }}</span>
        <form @submit.prevent="onSubmit">
            <label for="server-name">Server Name</label>
            <input type="text" id="server-name" min="2" max="100" v-model.lazy.trim="serverName">

            <a @click="backToSelection">Back</a>
            <button type="submit">Create</button>
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

            axios.post("/server/new", {name: this.serverName, userid: this.user.uid})
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

</style>