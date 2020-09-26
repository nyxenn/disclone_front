<template>
  <span v-if="!this.requests && !this.requests.length">No friend requests to show</span>

  <div v-else>
    <h3 class="req-type-header">Incoming</h3>
    <p v-for="r of this.incoming" :key="r.rid">
      <span class="req-user-name">{{ r.user.username }}</span>
      <button @click="acceptRequest(r.rid, r.user.uid, r.user.username)">Accept</button>
      <button @click="denyRequest(r.rid, r.user.username)">Deny</button>
    </p>

    <h3 class="req-type-header">Outgoing</h3>
    <p v-for="r of this.outgoing" :key="r.rid">
      <span class="req-user-name">{{ r.user.username }}</span>
      <button @click="denyRequest(r.rid, r.user.username)">Cancel</button>
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      incoming: [],
      outgoing: []
    }
  },
  computed: {
    requests() { return this.$store.state.requests; },
    user() { return this.$store.state.user; },
    socket() { return this.$store.state.socket; }
  },
  watch: {
    requests: {
      immediate: true,
      handler: "updateRequests"
    }
  },
  mounted() {
    this.socket.on("new-req", (request) => {
      this.$store.commit("newRequest", request);
    });

    this.socket.on("del-req", (rid) => {
      this.$store.commit("deleteRequest", rid);
    });

    this.socket.on("acc-req", (rid, friend) => {
      this.$store.commit("acceptRequest", {rid, friend});
    });
  },
  methods: {
    acceptRequest(rid, fuid, friendname) {
      this.socket.emit("acceptRequest", rid, this.user.uid, fuid, friendname);
    },
    denyRequest(rid, friendname) {
      this.socket.emit("deleteRequest", rid, friendname);
    },
    updateRequests() {
      this.incoming = [];
      this.outgoing = [];

      this.requests.map(r => {
        if (r.type === "incoming") this.incoming.push(r);
        if (r.type === "outgoing") this.outgoing.push(r);
      });
    }
  }
}
</script>

<style>

</style>