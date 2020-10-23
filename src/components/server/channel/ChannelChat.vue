<template>
  <div class="conversation">
      <div class="conversation-history" v-chat-scroll>
          <p v-for="msg of this.history" :key="msg.mid" class="conversation-message" :class="{ 'msg-pending': msg.pending }">
              <span class="message-user">{{ getUsername(msg.user) }}</span>
              <span class="message-time">{{ timestampToDateString(msg.timestamp )}}</span>
              <br>
              <span class="message-msg">{{ msg.message }}</span>
          </p>
      </div>

      <div class="conversation-message-field">
        <input class="message-input" :placeholder="getPlaceholder()" type="text" v-model.lazy.trim="message" autocomplete="off" v-on:keyup.enter="sendMessage">
      </div>
  </div>
</template>

<script>
export default {
    props: {
        history: {required: false, type: Array, default: () => {return []} },
        members: {required: true, type: Array},
        sid: {required: false, type: String},
        cid: {required: false, type: String},
        name: {required: true, type: String},
    },
    watch: {
        members: function(newMems) {
            if (newMems) this.updatedMembers = newMems;
        } 
    },
    data() {
        return {
            message: "",
            pendingMessages: [],
            updatedMembers: []
        }
    },
    computed: {
        user() { return this.$store.state.user; },
        socket() { return this.$store.state.socket; }
    },
    mounted() {
    this.socket.on('new-ch-msg', (message, sid, cid) => {
      if (cid === this.cid && sid === this.sid) {
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
        sendMessage() {
            const message = {
                "user": this.user._id,
                "message": this.message,
                "timestamp": Date.now() / 1000,
                "pending": true
            };
            this.history.push(message);

            this.socket.emit("sendChannel", message, this.sid, this.cid);

            this.message = "";
        },
        getUsername(uid) {
          const user = this.updatedMembers.find(m => m._id === uid);
          if (!user) return;
          
          return user.username;
        },
        getPlaceholder() {
          return `Send message to ${this.name}`
        }
    }
}
</script>

<style>

</style>