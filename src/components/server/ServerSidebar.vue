<template>
  <div>
    <button @click="selectServer(0)">Start</button>
    <hr>

    <div class="server-btn-list">
      <button v-for="s in servers" :key="s._id" @click="selectServer(s._id)" class="server-btn">
        {{s.name}}
      </button>
    </div>

    <button @click="addServer" class="add-server-btn">
      Add
    </button>

    <join-create-server :isShowingModal="this.isShowingModal" @close-modal="closeModal" />
  </div>
</template>

<script>
import JoinCreateServer from '../modals/JoinCreateServer.vue';

export default {
  components: {
    JoinCreateServer
  },
  computed: {
    servers() { return this.$store.state.servers; }
  },
  data() {
    return {
      isShowingModal: false,
    }
  },
  methods: {
    selectServer(sid) {
      this.$emit('server-selected', sid);
    },
    addServer() {
      this.isShowingModal = true;
    },
    closeModal() {
      this.isShowingModal = false;
    },
  }
}
</script>

<style>
  .server-btn-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .server-btn, .add-server-btn {
    height: 60px;
    width: 60px;
    padding: 0;
    margin: 5px 10px;

    overflow: hidden;
    text-align: center;
    word-wrap: break-word;
  }

  .add-server-btn {
    height: 60px;
    width: 60px;
    color: rgb(40, 160, 20);
    font-variant: small-caps;
    text-transform: lowercase;
    font-weight: bold;
    border: 2px solid rgba(40, 180, 20, 0.8);
    border-radius: 50%;
  }
</style>