<template>
  <div class="server-container">
    <channel-list :channels="this.server.channels" :server="this.server" @change-channel="changeChannel" class="channel-list" />
    <channel-chat :history="this.channel.history" :members="this.members" :sid="this.server._id" :cid="this.channel._id" :name="this.server.name" class="channel-chat" />
    <channel-members :members="this.members" :sid=this.server._id :creatorid="this.server.creator" class="channel-members" />
  </div>
</template>

<script>
import ChannelList from './channel/ChannelList.vue';
import ChannelChat from './channel/ChannelChat.vue';
import ChannelMembers from './channel/ChannelMembers.vue';
import axios from 'axios';

export default {
  props: {
    server: {required: true, type: Object}
  },
  watch: {
    server: {
      immediate: true,
      handler: "serverChanged"
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
  mounted() {
      this.socket.on('srv-joined', (sid, _id, username) => {
          if (sid === this.server._id) {
              this.members.push({_id, username});
          }

          this.$store.commit("joinMember", {sid: this.server._id, member: {_id, username}});
      });
  },
  computed: {
        baseUrl() { return this.$store.state.baseip; }
    },
  methods: {
    changeChannel(channelId) {
      this.channel = this.server.channels.find(c => c._id === channelId);
    },
    serverChanged(newServer) {
      axios
        .post(this.baseUrl + "/user/members/", {members: newServer.members, server: newServer.name})
        .then(res => {
          if (res.status === 200) {
            this.members = res.data;
            this.channel = newServer.channels[0];
          }
        })
        .catch(err => console.error(err));

      this.server = newServer;
    }
  }

}
</script>

<style>
  .server-container {
    display: flex;
  }

  .channel-list {
    width: 220px;
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