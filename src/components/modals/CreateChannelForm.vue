<template>
    <modal name="add-channel-form" @closed="hideModal">
        <div class="create-channel">
            <div class="create-channel-header">
                <p class="create-channel-title">Create channel</p>
            </div>

            <form class="create-channel-form" @submit.prevent="onSubmit">
                <div class="input-group">
                    <label for="channel-name">New channel name</label>
                    <input type="text" id="channel-name" min="2" max="25" v-model.trim="channelName" autocomplete="off" required>
                    <p class="server-error-msg" v-if="this.errorMessage">{{ this.errorMessage }}</p>
                </div>

                <button class="btn btn-confirm" type="submit" :disabled="!this.channelName || this.channelName.length > 25 || this.channelName.length < 2">Create</button>
                <a class="return-link" @click="hideModal">Cancel</a>
            </form>
        </div>
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
            this.channelName = this.channelName.toLowerCase();
            let split = this.channelName.split(' ');
            split = split.join("-");

            axios.post("http://84.194.175.102:3000/server/channel/new", {name: split, sid: this.sid})
                .then(() => {
                    this.hideModal();
                    this.channelName = "";
                    })
                .catch(err => console.log(err));
        },
        hideModal() {
            this.channelName = "";
            this.$modal.hide("add-channel-form");
            this.$emit('close-modal');
        },
    },
}
</script>

<style>
    .create-channel {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;
        background: #444;
    }

    .create-channel-header {
        width: 100%;
        margin: 10px 0;
    }

    .create-channel-title {
        font-size: 16px;
        line-height: 20px;
        color: #aaa;
        text-transform: lowercase;
        font-variant: small-caps;
        font-weight: bold;
    }

    .create-channel-form {
        flex: 1;
        margin-top: 30px;
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }

    .create-channel-form button {
        margin-top: 40px;
    }

    .create-channel-form .input-group {
        width: 80%;
    }

    .create-channel-form .input-group input {
        width: 100%;
    }

    .create-channel-form .input-group label {
        display: inline-block;
        font-size: 16px;
        color: #bbb;
        margin-bottom: 5px;
    }
</style>