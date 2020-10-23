<template>
  <span class="nothing-to-show" v-if="!this.requests || !this.requests.length">No friend requests to show</span>

  <div class="friend-requests" v-else>
    <div class="incoming">
      <h3 class="req-type-header">Incoming</h3>
      <div class="request-entry" v-for="r of sortedRequests.incoming" :key="r._id">
        <div class="request-seperator"></div>

        <div class="request-information">
          <span class="req-user-name">{{ r.user.username }}</span>
          <div class="request-actions">
            <button class="request-accept-btn" @click="acceptRequest(r._id, r.user._id, r.user.username)">
              <font-awesome-icon icon="plus" />
            </button>
            <button class="request-deny-btn" @click="denyRequest(r._id, r.user.username)">
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="outgoing">
      <h3 class="req-type-header">Outgoing</h3>
      <div class="request-entry" v-for="r of sortedRequests.outgoing" :key="r._id">
        <div class="request-seperator"></div>
  
        <div class="request-information">
          <span class="req-user-name">{{ r.user.username }}</span>
          <div class="request-actions">
            <button class="request-deny-btn" @click="denyRequest(r._id, r.user.username)">
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
        </div>
      </div>
    </div>

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
  .friend-requests, .nothing-to-show {
    user-select: none;
  }

  .incoming, .outgoing {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: left;
    padding-top: 30px;
  }

  .incoming h3, .outgoing h3{
    font-size: 14px;
    color: #aaa;
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .request-entry {
        display: flex;
        height: 50px;
        width: 100%;
        font-size: 17px;
        flex-direction: column;
    }

    .request-seperator {
        width: 95%;
        height: 2px;
        padding: 0;
        margin: 0;
        background: #383838;
        margin-left: auto;
        margin-right: auto;
    }

    .request-information {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 25px;
        height: 100%;
    }

    .request-information:hover {
        background: #484848;
        cursor: pointer;
    }

    .request-actions {
      text-align: right;
        width: 20%;
        margin-left: auto;
        margin-right: 30px;
    }

    .request-actions button {
        height: 30px;
        border: none;
        border-radius: 50%;
        margin-left: 10px;
        background: #333;
        font-size: 16px;
        line-height: 16px;
        color: #aaa;
    }

    .request-accept-btn:hover {
        color: #5a5;
        cursor: pointer;
    }

    .request-deny-btn:hover {
        color: #E55;
        cursor: pointer;
    }

</style>