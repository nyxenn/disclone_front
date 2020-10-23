<template>
  <div class="sidebar">
    <button @click="selectServer(0)" class="home-btn"><img src="../../assets/logo.png"></button>
    <hr />

    <div class="server-btn-list">
      <button v-for="s in servers" :key="s._id" @click="selectServer(s._id)" class="server-btn" v-resize-text>
        <span class="server-name">{{ getInitials(s.name) }}</span>
      </button>
    </div>

    <button @click="addServer" class="add-server-btn">
      +
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
    getInitials(name) {
      const nameSplit = name.split(' ');
      let initials = "";
      for (let w of nameSplit) {
        initials += w[0];
      }

      return initials;
    }
  }
}
</script>

<style>
  .sidebar {
    background-color: #222;
    overflow-y: scroll;
    scrollbar-width: none;
    width: 80px;
    min-width: 80px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .sidebar::-webkit-scrollbar {
    display: none;
  }

  hr {
    width: 30%;
    border-bottom: 1px solid #aaa;
    margin-bottom: 15px;
  }

  .home-btn, .server-btn, .add-server-btn{
    background: #444;
    border: none;
    height: 60px;
    width: 60px;
    padding: 0;
    border-radius: 50%;
    color: #ddd;
    font-family: 'Whitney Medium';
    overflow: hidden;
  }

  .home-btn:hover, .server-btn:hover {
    cursor: pointer;
    background: #55D;
  }

  .home-btn img{
    width: 80%;
    height: 80%;
  }

  .server-btn-list {
    width: 80px;
  }

  .home-btn {
    margin-top: 10px;
  }

  .server-btn {
    margin-bottom: 10px;
  }

  .add-server-btn {
    color: #5a5;
    font-size: 40px;
  }

  .add-server-btn:hover {
    color: #ddd;
    background: #5a5;
    cursor: pointer;
  }
</style>