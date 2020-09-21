<template>
  <div v-if="conversation.members">
    <p v-for="msg of this.history" :key="msg.mid">
        {{ getUsername(msg.user) }}, {{ timestampToDateString(msg.timestamp )}}
        <br>
        {{ msg.message }}
    </p>
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
  methods: {
    timestampToDateString(ts) {
        const date = new Date(ts * 1000);
        return `${date.toDateString()} at ${date.toTimeString()}`
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
    }
  }
}
</script>

<style>

</style>