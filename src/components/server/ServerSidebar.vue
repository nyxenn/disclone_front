<template>
  <div>
    <button @click="selectServer(0)">Start</button>
    <hr>

    <button v-for="s in servers" :key="s.sid" @click="selectServer(s.sid)">
      {{s.name}}
    </button>

    <button @click="addServer">
      Add
    </button>

    <join-create-server :isShowingModal="this.isShowingModal" @close-modal="closeModal" />
  </div>
</template>

<script>
import JoinCreateServer from './modal/JoinCreateServer';

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
    selectServer(serverId) {
      this.$emit('server-selected', serverId);
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

</style>