<template>
  <div>
      <p v-for="msg in history" :key="msg.mid">
          {{ members.find(m => m._id == msg.user).username }}, {{ timestampToDateString(msg.timestamp )}}
          <br>
          {{ msg.message }}
      </p>

      <input type="text" v-model.lazy.trim="message" v-on:keyup.enter="sendMessage">
  </div>
</template>

<script>
export default {
    props: {
        history: {required: false, type: Array, default: () => {return []} },
        members: {required: true, type: Array},
        sid: {required: false, type: String},
        cid: {required: false, type: String},
    },
    data() {
        return {
            message: "",
            pendingMessages: []
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
        }
    }
}
</script>

<style>

</style>