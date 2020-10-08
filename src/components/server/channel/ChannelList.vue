<template>
  <div class="channels-container">
    <div class="server-name">
      <p>{{ this.server.name }}</p>
      <button @click="deleteServerModal" v-if="this.server.creator === this.user._id">Delete</button>
    </div>
    <div class="channels">
      <p id="channels-header">
        <span>Channels</span>
        <button @click="addChannel">+</button>
      </p>
      <p v-for="c in this.channels" :key="c._id" @click="changeChannel(c._id)">
        {{c.name}}
        <button class="delete-channel" @click="deleteChannelModal(c)" v-if="server.creator === user._id && server.channels.length > 1">Delete</button>
      </p>
    </div>
    <button @click="invite" v-tooltip="{content: this.inviteMessage}">Invite</button>
    <user-info-tag class="user-info-tag" />


    <create-channel-form :showCreateModal="this.showCreateModal" :sid="this.server._id" @close-modal="closeCreateModal" />
    <delete-server-channel
      :showDeleteModal="this.showDeleteModal"
      :name="this.name"
      :type="this.type"
      :id="this.id"
      @modal-res="modalResult(type, id)" 
      @close-modal="closeDeleteModal" />
  </div>
</template>

<script>
import axios from 'axios';
import UserInfoTag from './../../UserInfoTag.vue';
import deleteServerChannel from "../../modals/DeleteServerChannel.vue";
import createChannelForm from "../../modals/CreateChannelForm.vue";

export default {
  props: {
    channels: {required: true, type: Array},
    server: {required: true, type: Object}
  },
  components: {
    UserInfoTag,
    deleteServerChannel,
    createChannelForm
  },
  data() {
    return {
      showDeleteModal: false,
      showCreateModal: false,
      type: "",
      name: "",
      id: "",
      inviteMessage: "Click to copy to clipboard",
    }
  },
  computed: {
    socket() { return this.$store.state.socket; },
    user() { return this.$store.state.user; }
  },
  mounted() {
    // TODO: Socket.io
    this.socket.on("channel-added", (params) => { return params; });

    this.socket.on("channel-deleted", (params) => { return params; });
  },
  methods: {
    changeChannel(channelId) {
      this.$emit("change-channel", channelId);
    },
    // TODO click events
    addChannel() {
      this.showCreateModal = true;
    },
    deleteChannelModal(c) {
      this.type = "channel";
      this.name = c.name;
      this.id = c._id;
      this.showDeleteModal = true;
    },
    deleteServerModal() {
      this.type = "server";
      this.name = this.server.name;
      this.id = this.server._id;
      this.showDeleteModal = true;
    },
    modalResult(type, id) {
      if (type === "server") {
        this.deleteServer();
      }
      else {
        this.deleteChannel(id);
      }
    },
    deleteServer() {
      if (this.server.creator === this.user._id) {
        axios.delete(`/server/${this.server._id}`)
          .catch(err => console.error(err));
      }
    },
    deleteChannel(cid) {
      if (this.server.creator === this.user._id) {
        axios.post(`/server/delChannel`, {sid: this.server._id, cid})
          .catch(err => console.error(err));
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.type = "";
      this.name = "";
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    invite() {
      this.$copyText(this.server.invite);
      this.inviteMessage = "Copied!";
      setTimeout(() => { this.inviteMessage = "Click to copy to clipboard" }, 3000);
    }
  }
}
</script>

<style>
  .channels-container {
    display: flex;
    flex-direction: column;
  }

  .channels {
    flex: 1;
  }

  .user-info-tag {
    width: 100%;
    height: 50px;
  }

  .tooltip {
    display: block !important;
    z-index: 10000;
  }

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
 
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
</style>