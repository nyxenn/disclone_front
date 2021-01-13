<template>
  <div class="channels-container">
    <div class="server-title">
      <span>{{ this.server.name }}</span>
      <button @click="deleteServerModal" v-if="this.server.creator === this.user._id">
        <font-awesome-icon icon="trash-alt" />
      </button>
    </div>

    <div class="channels">
      <div id="channels-header">
        <span>Channels</span>
        <button @click="addChannel" v-if="this.server.creator === this.user._id">
          <font-awesome-icon icon="plus" />
        </button>
      </div>

      <div class="channel-list">
        <div class="channel-list-entry" v-for="c in this.channels" :key="c._id">
          <div class="channel-list-entry-name" @click="changeChannel(c._id)">
            <font-awesome-icon class="channel-list-entry-icon" icon="hashtag" />
            {{c.name}}
          </div>

          <button class="delete-channel" @click="deleteChannelModal(c)" v-if="server.creator === user._id && server.channels.length > 1">
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </div>

    </div>
    <button class="invite-code-button" @click="invite" v-tooltip="{content: this.inviteMessage}">Invite</button>
    <user-info-tag />

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
    user() { return this.$store.state.user; },
    baseUrl() { return this.$store.state.baseip; }
  },
  methods: {
    changeChannel(channelId) {
      this.$emit("change-channel", channelId);
    },
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
        axios.delete(this.baseUrl + `/server/${this.server._id}`)
          .catch(err => console.error(err));
      }
    },
    deleteChannel(cid) {
      if (this.server.creator === this.user._id) {
        axios.post(this.baseUrl + `/server/delChannel`, {sid: this.server._id, cid})
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
    user-select: none;
    background: #333;
    border-right: 1px solid #282828;
    box-shadow: 0 0 3px 0 #222;
  }

  .server-title {
    width: 100%;
    height: 40px;
    text-align: left;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #282828;
    margin-bottom: 15px;
  }

  .server-title span {
    display: inline-block;
    color: #ccc;
    font-size: 20px;
    padding-left: 15px;
    height: 22px;
  }

  .server-title button {
    height: 25px;
    width: 25px;
    border: none;
    font-size: 11px;
    border-radius: 50%;
    background: #383838;
    margin-left: 6px;
    color: #666;
  }

  .server-title button:hover {
    color: #B55;
    cursor: pointer;
  }

  .channels {
    flex: 1;
    text-align: left;
  }

  .channels {
    margin-left: 12px;
  }

  #channels-header {
    color: #aaa;
    font-size: 14px;
    text-transform: lowercase;
    font-variant: small-caps;
    margin-bottom: 5px;
  }

  #channels-header button {
    height: 25px;
    width: 25px;
    border: none;
    font-size: 11px;
    border-radius: 50%;
    background: #383838;
    margin-left: 6px;
    color: #666;
  }

  #channels-header button:hover {
    cursor: pointer;
    color: #5a5;
  }

  .channel-list {
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .channel-list::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  .channel-list-entry {
    display: flex;
    flex-wrap: nowrap;
    font-size: 15px;
    color: #bbb;
    height: 25px;
    line-height: 20px;
  }

  .channel-list-entry-name {
    margin-right: 3px;
  }

  .channel-list-entry-name:hover {
    cursor: pointer;
    color: #eee;
  }

  .channel-list-entry-icon {
    color: #777;
  }

  .channel-list-entry button {
    border: none;
    font-size: 11px;
    background: none;
    padding: 0 3px;
    margin: none;
    color: rgba(102, 102, 102, 0.7);
  }

  .channel-list-entry button:hover {
    cursor: pointer;
    color: #B55;
  }

  .invite-code-button {
    border: none;
    background: #444;
    height: 40px;
    color: #aaa;
    font-size: 17px;
    font-family: 'Whitney Medium';
  }

  .invite-code-button:hover {
    color: #5a5;
    cursor: pointer;
    background: #4A4A4A;
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