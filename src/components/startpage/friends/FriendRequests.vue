<template>
  <span v-if="!this.requests && !this.requests.length">No friend requests to show</span>

  <div v-else>
    <h3 class="req-type-header">Incoming</h3>
    <p v-for="r of this.incoming" :key="r.rid">
      <span class="req-user-name">{{ r.user.username }}</span>
      <button @click="acceptRequest(r)">Accept</button>
      <button @click="denyRequest(r.rid)">Deny</button>
    </p>

    <h3 class="req-type-header">Outgoing</h3>
    <p v-for="r of this.outgoing" :key="r.rid">
      <span class="req-user-name">{{ r.user.username }}</span>
      <button @click="denyRequest(r.rid)">Cancel</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      incoming: [],
      outgoing: []
    }
  },
  computed: {
    requests() { return this.$store.state.requests; },
    user() { return this.$store.state.user; }
  },
  watch: {
    requests: {
      immediate: true,
      handler: "updateRequests"
    }
  },
  methods: {
    acceptRequest(req) {
      axios.post("/user/add", {uid: this.user.uid, fuid: req.user.uid, rid: req.rid})
        .then(res => {
          if (res.status === 200) {
            this.$store.state.requests = res.data;
          }
        })
        .catch(err => console.error(err));
    },
    denyRequest(rid) {
      axios.delete(`/req/r/${rid}&${this.user.uid}`)
        .then(res => {
          if (res.status === 200) {
            this.$store.state.requests = res.data;
          }
        })
        .catch(err => console.error(err));
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