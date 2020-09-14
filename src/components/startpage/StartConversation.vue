<template>
  <div>
    <p v-for="msg of this.conversation.history" :key="msg.mid">
        {{ conversation.members.find(m => m.uid == msg.user).name }}, {{ timestampToDateString(msg.timestamp )}}
        <br>
        {{ msg.message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {required: true, type: Object},
    conversation: {required: true, type: Object}
  },
  methods: {
    
    timestampToDateString(ts) {
        const date = new Date(ts * 1000);
        return `${date.toDateString()} at ${date.toTimeString()}`
    }
  }
}
</script>

<style>

</style>