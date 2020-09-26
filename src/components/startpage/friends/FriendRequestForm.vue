<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="friend_name">Enter friend's username</label>
      <input type="text" id="friend_name" v-model.lazy.trim="friendname" required >

      <button class="btn btn-confirm" type="submit">Send friend request</button>
    </form>
  </div>
</template>

<script>

export default {
  computed: {
    user () { return this.$store.state.user; },
    socket() { return this.$store.state.socket; }
  },
  data() {
    return {
      friendname: ""
    }
  },
  methods: {
    onSubmit() {
      if (this.friendname) {
        this.socket.emit("sendRequest", this.user.uid, this.user.username, this.friendname);
      }
    }
  }
}
</script>

<style>

</style>