<template>
  <span v-if="!this.requests && !this.requests.length">No friend requests to show</span>

  <div v-else>
    <h3 class="req-type-header">Incoming</h3>
    <p v-for="r of sortedRequests.incoming" :key="r._id">
      <span class="req-user-name">{{ r.user.username }}</span>
      <button @click="acceptRequest(r._id, r.user._id, r.user.username)">Accept</button>
      <button @click="denyRequest(r._id, r.user.username)">Deny</button>
    </p>

    <h3 class="req-type-header">Outgoing</h3>
    <p v-for="r of sortedRequests.outgoing" :key="r._id">
      <span class="req-user-name">{{ r.user.username }}</span>
      <button @click="denyRequest(r._id, r.user.username)">Cancel</button>
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
    sortedRequests() { return this.sortRequests(); },
    user() { return this.$store.state.user; },
    socket() { return this.$store.state.socket; }
  },
  watch: {
    requests: {
      immediate: true,
      handler: "sortRequests"
    }
  },
  methods: {
    acceptRequest(rid, fuid, friendname) {
      console.log(rid, fuid, friendname);
      this.socket.emit("acceptRequest", rid, this.user._id, fuid, friendname);
    },
    denyRequest(rid, friendname) {
      this.socket.emit("deleteRequest", rid, friendname);
    },
    sortRequests() {
      const sortedRequests = {"incoming": [], "outgoing": []};
      this.requests.map(r => {
        if (r.type === "incoming") sortedRequests.incoming.push(r);
        if (r.type === "outgoing") sortedRequests.outgoing.push(r);
      });
      return sortedRequests;
    }
  }
}
</script>

<style>

</style>