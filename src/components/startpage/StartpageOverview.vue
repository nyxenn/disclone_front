<template>
  <div class="startpage">
      <start-conversations-list class="conversations-list" :user="this.user" @open-conversation="openConversation" />

      <start-conversation class="conversation" :user="this.user" :conversation="this.conversation" v-if="this.conversation" />
      <start-friends class="friends-overview" :user="this.user" v-else />
  </div>
</template>

<script>
import StartConversationsList from './StartConversationsList.vue';
import StartConversation from './StartConversation.vue';
import StartFriends from './StartFriends.vue';
import {getConversationHistory} from '../../helpers/helpers.js';

export default {
    props: {
        user: {required: true, type: Object}
    },
    data() {
        return {
            conversation: null
        }
    },
    components: {
        StartConversationsList,
        StartConversation,
        StartFriends
    },
    methods: {
        showFriends() {
            this.conversation = null;
        },
        openConversation(dmid) {
            if (typeof(dmid) !== "number") {
                this.conversation = null;
                return;
            }
            this.conversation = this.user.conversations.find(c => c.dmid === dmid);
            this.conversation.history = getConversationHistory(this.conversation.dmid);
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