<template>
    <modal name="add-channel-form" @closed="hideModal">
        <form @submit.prevent="onSubmit">
            <p v-if="this.errorMessage">{{errorMessage}}</p>
            <label for="channel-name">Enter a name for new channel</label>
            <input type="text" id="channel-name" min="2" max="100" autofocus v-model.lazy.trim="channelName">

            <a @click="hideModal">Cancel</a>
            <button type="submit">Create</button>
        </form>
    </modal>
</template>

<script>
import axios from "axios";

export default {
    props: {
        showCreateModal: {required: true, type: Boolean},
        sid: { required: true, type: String }
    },
    watch: {
        showCreateModal: function(showModal) {
            if (showModal) this.$modal.show('add-channel-form');
            else this.serverChannelName = "", this.errorMessage = "";
        } 
    },
    computed: {
        user() { return this.$store.state.user; }
    },
    data() {
        return {
            errorMessage: "",
            channelName: ""
        }
    },
    methods: {
        onSubmit() {
            axios.post("server/channel/new", {name: this.channelName, sid: this.sid})
                .then(() => this.hideModal())
                .catch(err => console.log(err));
        },
        hideModal() {
            this.$modal.hide("add-channel-form");
            this.$emit('close-modal');
        },
    },
}
</script>

<style>

</style>