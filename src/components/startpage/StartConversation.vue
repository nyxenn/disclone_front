<template>
  <div class="conversation" v-if="conversation.members">
    <div class="conversation-title">
      <div class="conversation-members">
        <font-awesome-icon icon="user" v-if="conversation.members.length === 2" />
        <font-awesome-icon icon="users" v-else />
        {{ this.getMemberNames() }}
      </div>
    </div>

    <div class="conversation-history" v-chat-scroll>
      <p v-for="msg of this.history" :key="msg.mid" class="conversation-message" :class="{ 'msg-pending': msg.pending }">
          <span class="message-user">{{ getUsername(msg.user) }}</span>
          <span class="message-time">{{ timestampToDateString(msg.timestamp )}}</span>
          <br>
          <span class="message-msg">{{ msg.message }}</span>
      </p>
    </div>

    <div class="conversation-message-field">
      <input class="message-input" :placeholder="getPlaceholder()" type="text" v-model.trim="message" autocomplete="off" v-on:keyup.enter="sendMessage">
    </div>
  </div>
</template>

<script>

export default {
  props: {
    conversation: {required: true, type: Object},
    history: {required: false, type: Array}
  },
  watch: {
    conversation: {
      immediate: true,
      handler: "updateConversation"
    },
    history: {
      immediate: true,
      handler: "updateHistory"
    }
  },
  computed: {
    user() { return this.$store.state.user; },
    socket() { return this.$store.state.socket; }
  },
  data() {
    return {
      message: "",
      pendingMessages: []
    }
  },
  mounted() {
    this.socket.on('new-dm-msg', (message, dmid) => {
      console.log(dmid);
      if (dmid === this.conversation._id) {
        const pendingMsg = this.history.find(m => m.pending && m.user === message.user && m.message === message.message);
  
        if (!pendingMsg) {
          this.history.push(message);
        } else {
          const pendingMsgIndex = this.history.indexOf(pendingMsg);
          this.history.splice(pendingMsgIndex, 1, message);
        }
      }
    })
  },
  methods: {
    timestampToDateString(ts) {
        const date = new Date(ts * 1000);
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
        // return `${date.toDateString()} at ${date.toTimeString()}`
    },
    updateConversation(conv) {
      this.conversation = conv;
    },
    updateHistory(hist) {
      this.history = hist;
    },
    getUsername(uid) {
      const user = this.conversation.members.find(m => m._id === uid);
      if (!user) return;
      
      return user.username;
    },
    sendMessage() {
      if (this.message) {
        const message = {
          "user": this.user._id,
          "message": this.message,
          "timestamp": Date.now() / 1000,
          "pending": true
          };
        this.history.push(message);
  
        this.socket.emit("sendDM", message, this.conversation._id);
  
        this.message = "";
      }
    },
    getMemberNames() {
      let members = "";

      for (let m of this.conversation.members) {
        if (m._id !== this.user._id) members += m.username + ' ';
      }

      return members.trim();
    },
    getPlaceholder() {
      return `Send message to ${this.conversation.members.length > 2 ? '' : '@'}${this.getMemberNames()}`
    }
  }
}
</script>

<style>
  .conversation {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .conversation-title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #333;
    user-select: none;
  }

  .conversation-members {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-left: 25px;
  }

  .conversation-members svg {
    margin-right: 10px;
    color: #777;
  }

  .conversation-history {
    flex: 1;
    overflow-y: scroll;
    scrollbar-width: none;
    text-align: left;
  }

  .conversation-history::-webkit-scrollbar {
    width: 0px;
    display: none;
  }

  .conversation-message-field {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .message-input {
    height: 50px;
    width: 91%;
  }

  .conversation-message {
    margin-left: 5%;
    height: 50px;
    margin-top: auto;
  }
  .msg-pending .message-msg {
    color: rgb(150, 130, 145);
  }

  .message-user {
    display: inline-block;
    color: #ddd;
    font-size: 18px;
    font-family: 'Whitney Semibold Regular';
  }

  .message-time {
    display: inline-block;
    font-size: 13px;
    color: #999;
    margin-left: 8px;
  }

  .message-msg {
    display: inline-block;
    font-size: 15px;
    color: #c4c4c4;
    /* font-family: 'Whitney Semibold Regular'; */
    font-weight: 100;
  }
</style>