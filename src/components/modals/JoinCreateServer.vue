<template>
  <modal name="add-server-modal" @closed="hideModal">
      <div class="add-server-modal">
        <div class="modal-action-choice" v-if="!isCreating && !isJoining">
            <div class="create-server-choice" @click="createServer">
                <button id="create-server-button" @click="createServer">
                    <font-awesome-icon icon="plus" />
                </button>
                Create a new server
            </div>

            <div class="choice-seperator"></div>

            <div class="join-server-choice" @click="joinServer">
                <button id="join-server-button" @click="joinServer">
                    <font-awesome-icon icon="users" />
                </button>
                Join an existing server
            </div>
        </div>

        <div class="server-action-forms" v-else>
            <create-server-form v-if="isCreating" @created-server="createdServer" @cancel-creation="cancelCreate" />
            <join-server-form v-else @joined-server="joinedServer" @cancel-joining="cancelJoin" />
        </div>
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
        sid: { required: false, type: String }
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
    .add-server-modal {
        width: 100%;
        height: 100%;
        background: #444;
    }

    .modal-action-choice {
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

    .choice-seperator {
        width: 2px;
        height: 90%;
        border-radius: 10px;
        background-color: rgba(51, 51, 51, 0.5);
    }

    .create-server-choice, .join-server-choice {
        flex: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        font-size: 20px;
        height: 100%;
        user-select: none;
    }

    .create-server-choice:hover, .join-server-choice:hover {
        background-color: #555;
        cursor: pointer;
    }

    .create-server-choice:hover #create-server-button, .join-server-choice:hover #join-server-button {
        color: #5A5;
    }

    #create-server-button, #join-server-button {
        width: 40%;
        height: 40%;
        border: none;
        background: #333;
        color: #aaa;
        font-size: 40px;
        border-radius: 50%;
        margin-bottom: 15px;
    }

    #create-server-button:hover, #join-server-button:hover {
        background: #222;
        color: #5A5;
        cursor: pointer;
    }

    .server-action-forms {
        height: 100%;
    }
</style>