<template>
  <modal name="delete-server-channel" @closed="hideModal">
        <span v-if="this.errorMessage" class="delete-error">{{ this.errorMessage }}</span>
        <form @submit.prevent="onSubmit">
            <p>Are you sure you want to delete {{ type }} {{ name }}?</p>
            <p>Input {{ type }} name below to confirm.</p>
            <input type="text" id="-server-channel-name" v-model.trim="serverChannelName" autofocus>

            <button class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-delete" :disabled="serverChannelName !== name">Delete</button>
        </form>
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
    }
}
</script>

<style>

</style>