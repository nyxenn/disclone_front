<template>
  <div class="server-container">
    <channel-list :channels="this.server.channels" :user="this.user" @change-channel="changeChannel" class="channel-list" />
    <channel-chat :history="this.channel.history" :members="this.members" class="channel-chat" />
    <channel-members :members="this.members" class="channel-members" />
  </div>
</template>

<script>
import ChannelList from './channel/ChannelList.vue';
import ChannelChat from './channel/ChannelChat.vue';
import ChannelMembers from './channel/ChannelMembers.vue';
import {getMembers} from '../../helpers/helpers.js';

export default {
  props: {
    server: {required: true, type: Object},
    user: {required: true, type: Object}
  },
  watch: {
    server: function(newServer) {
      if (newServer) {
        this.members = getMembers(newServer.members);
        this.channel = newServer.channels[0];
      }
      this.server = newServer;
    }
  },
  components: {
    ChannelList,
    ChannelChat,
    ChannelMembers
  },
  data() {
    return {
      members: [],
      channel: {}
    }
  },
  methods: {
    changeChannel(channelId) {
      this.channel = this.server.channels.find(c => c.cid === channelId);
    }
  }

}
</script>

<style>
  .server-container {
    display: flex;
  }

  .channel-list {
    width: 200px;
  }

  .channel-chat {
    flex: 1;
  }

  @media screen and (max-width: 800px) {
    .channel-members {
      display: none;
    }
  }
  .channel-members {
    width: 10%;
  }
</style>