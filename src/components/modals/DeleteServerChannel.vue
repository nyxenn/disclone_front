<template>
    <modal name="delete-server-channel" @closed="hideModal">
        <div class="delete-server-channel">
            <div class="delete-server-channel-header">
                <div class="delete-server-channel-title">
                    Delete {{ type }}
                </div>
                <div class="delete-server-channel-warning">
                    <p>Are you sure you want to delete {{ type }} {{ name }}?</p>
                    <p>Input {{ type }} name below to confirm.</p>
                </div>
            </div>

            <form class="delete-server-channel-form" @submit.prevent="onSubmit">
                <div class="input-group">
                    <label for="channel-name">{{ this.capitalize(type) }} name</label>
                    <input type="text" id="server-channel-name" v-model.trim="serverChannelName" autocomplete="off" required>
                    <p class="server-error-msg" v-if="this.errorMessage">{{ this.errorMessage }}</p>
                </div>

                <button class="btn btn-danger" type="submit" :disabled="!this.serverChannelName || this.serverChannelName !== this.name">Delete</button>
                <a class="return-link" @click="hideModal">Cancel</a>
            </form>
        </div>
    </modal>
</template>

<script>
export default {
    props: {
        showDeleteModal: {required: true, type: Boolean},
        type: { required: true, type: String },
        name: { required: true, type: String },
        id: { required: true }
    },
    watch: {
        showDeleteModal: function(showModal) {
            if (showModal) this.$modal.show('delete-server-channel');
            else this.serverChannelName = "", this.errorMessage = "";
        } 
    },
    data() {
        return {
            errorMessage: "",
            serverChannelName: ""
        }
    },
    methods: {
        onSubmit() {
            this.$emit("modal-res", this.type, this.id);
            this.hideModal();
        },
        hideModal() {
            this.$modal.hide('delete-server-channel');
            this.$emit('close-modal');
        },
        capitalize(string) {
            if (string) {
                let split = string.split('');
                split[0] = split[0].toUpperCase();
                return split.join('');
            }
        }
    }
}
</script>

<style>
    .delete-server-channel {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;
        background: #444;
    }

    .delete-server-channel-header {
        width: 100%;
        margin: 10px 0;
    }

    .delete-server-channel-title {
        font-size: 15px;
        line-height: 20px;
        color: #aaa;
        text-transform: lowercase;
        font-variant: small-caps;
        font-weight: bold;
    }
    .delete-server-channel-warning {
        font-size: 17px;
        color: #ddd;
        margin-top: 15px;
    }

    .delete-server-channel-form {
        flex: 1;
        margin-top: 10px;
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }

    .delete-server-channel-form button {
        margin-top: 40px;
    }

    .delete-server-channel-form .input-group {
        width: 80%;
    }

    .delete-server-channel-form .input-group input {
        width: 100%;
    }

    .delete-server-channel-form .input-group label {
        display: inline-block;
        font-size: 16px;
        color: #bbb;
        margin-bottom: 5px;
    }

    .btn-danger {
        background-color: #e44;
        color: #ddd;
    }

    .btn-danger:disabled {
        background-color: #b77;
        color: #aaa;
    }

    .btn-danger:hover {
        background-color: #d33;
        color: #eee;
        cursor: pointer;
    }

    .btn-danger:disabled:hover {
        background-color: #b77;
        color: #aaa;
        cursor: default;
    }
</style>