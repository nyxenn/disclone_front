<template>
  <div class="add-friend-form">
    <form id="friend-req-form" @submit.prevent="onSubmit">
      <label for="friend_name">Enter friend's username</label>
      <input type="text" id="friend_name" v-model.trim="friendname" autocomplete="off" required >

      <button class="btn btn-confirm" :disabled="!this.friendname" type="submit">Send friend request</button>
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
      if (this.friendname && this.friendname !== this.user.username) {
        this.socket.emit("sendRequest", this.user._id, this.user.username, this.friendname);
      }
    }
  }
}
</script>

<style>
  .add-friend-form {
    width: 100%;
    user-select: none;
  }

  #friend-req-form {
    padding-top: 30px;
    width: 80%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }

  #friend-req-form input, #friend-req-form button {
    width: 100%;
  }

  #friend-req-form label {
    margin-bottom: 3px;
  }

  #friend-req-form button {
    margin-top: 30px;
  }

</style>