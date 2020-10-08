<template>
  <div class="startpage">
      <start-conversations-list class="conversations-list" @open-conversation="openConversation" />

      <start-conversation class="conversation" :conversation="this.conversation" :history="this.history" v-if="this.conversation" />
      <start-friends-overview class="friends-overview" @open-conv="openConversationFriends" v-else />
  </div>
</template>

<script>
import StartConversationsList from './StartConversationsList.vue';
import StartConversation from './StartConversation.vue';
import StartFriendsOverview from './friends/StartFriendsOverview.vue';
import axios from 'axios';

export default {
    data() {
        return {
            conversation: null,
            history: null
        }
    },
    computed: {
      socket() { return this.$store.state.socket; }
    },
    components: {
        StartConversationsList,
        StartConversation,
        StartFriendsOverview
    },
    methods: {
        showFriends() {
            this.conversation = null;
        },
        openConversation(dmid) {
            this.conversation = this.$store.state.conversations.find(c => c._id === dmid);
            axios.get(`/conv/history/${dmid}`)
              .then(res => {
                if (res.status === 200) {
                  this.history = res.data.history;
                  return;
                }
              })
              .catch(err => console.error(err));
        },
        openConversationFriends(conv) {
          this.history = conv.history;
          this.conversation = conv;
        }
    }

}
</script>

<style>
  .startpage {
    display: flex;
    width: 100%;
  }

  .conversations-list {
    width: 200px;
  }

  .friends-overview, .conversation {
    flex: 1;
  }
</style>