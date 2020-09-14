<template>
  <div>
    <p @click="selectServer(0)">Start</p>
    <hr>

    <p v-for="s in servers" :key="s.sid" @click="selectServer(s.sid)">
      {{s.name}}
    </p>

    <p @click="addServer">
      Add
    </p>

    <join-create-server :isShowingModal="this.isShowingModal" @close-modal="closeModal" :user="this.user"></join-create-server>
  </div>
</template>

<script>
import JoinCreateServer from './modal/JoinCreateServer';

export default {
  components: {
    JoinCreateServer
  },
  props: {
    servers: {required: true},
    user: {required: true, type: Object},
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