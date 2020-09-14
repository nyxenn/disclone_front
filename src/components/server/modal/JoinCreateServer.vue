<template>
  <modal name="add-server-modal" @closed="hideModal">
      <div v-if="!isCreating && !isJoining">
        <div @click="createServer">Create</div>
        <div @click="joinServer">Join</div>
      </div>

      <div v-else>
          <create-server-form v-if="isCreating" @created-server="createdServer" @cancel-creation="cancelCreate" :user="this.user"></create-server-form>
          <join-server-form v-else @joined-server="joinedServer" @cancel-joining="cancelJoin" :user="this.user"></join-server-form>
      </div>
  </modal>
</template>

<script>
import CreateServerForm from './CreateServerForm.vue';
import JoinServerForm from './JoinServerForm.vue';

export default {
    components: {
        CreateServerForm,
        JoinServerForm
    },
    props: {
        isShowingModal: {required: true, type: Boolean},
        user: {required: true, type: Object},
    },
    watch: {
        isShowingModal: function(showModal) {
            if (showModal) this.$modal.show('add-server-modal');
            else this.isCreating = false, this.isJoining = false;
        } 
    },
    data() {
        return {
            isCreating: false,
            isJoining: false,
        }
    },
    methods: {
        createServer() {
            this.isCreating = true;
        },
        createdServer() {
            this.isCreating = false;
            this.hideModal();
        },
        cancelCreate() {
            this.isCreating = false;
        },
        joinServer() {
            this.isJoining = true;
        },
        joinedServer() {
            this.isJoining = false;
            this.hideModal();
        },
        cancelJoin() {
            this.isJoining = false;
        },
        hideModal() {
            this.$modal.hide('add-server-modal');
            this.$emit('close-modal');
        },
    },
    
}
</script>

<style>

</style>