<template>
  <div v-if="conversation.members">
    <p v-for="msg of this.history" :key="msg.mid" :class="{ 'msg_pending': msg.pending }">
        {{ getUsername(msg.user) }}, {{ timestampToDateString(msg.timestamp )}}
        <br>
        {{ msg.message }}
    </p>

    <input type="text" v-model.lazy.trim="message" v-on:keyup.enter="sendMessage">
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
      if (dmid === this.conversation.dmid) {
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
      const user = this.conversation.members.find(m => m.uid === uid);
      if (!user) return;
      
      return user.username;
    },
    sendMessage() {
      const message = {
        "user": this.user.uid,
        "message": this.message,
        "timestamp": Date.now() / 1000,
        "pending": true
        };
      this.history.push(message);

      this.socket.emit("sendDM", message, this.conversation.dmid);

      this.message = "";
    }
  }
}
</script>

<style>
  .msg_pending {
    color: rgb(150, 130, 145);
  }
</style>