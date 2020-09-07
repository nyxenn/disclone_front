<template>
  <div>
    <p @click="selectServer(0)">Start</p>
    <hr>

    <p v-for="s in servers" :key="s.id" @click="selectServer(s.id)">
      {{s.name}}
    </p>

    <p @click="addServer">
      Add
    </p>

    <modal name="add-server-modal">
      <div @click="createServer">Create</div>
      <div @click="joinServer">Join</div>
    </modal>
  </div>
</template>

<script>
export default {
  props: {
    servers: {required: true, type: Array}
  },
  methods: {
    selectServer(serverId) {
      this.$emit('server-selected', serverId);
    },
    addServer() {
      this.$modal.show('add-server-modal');
    },
    createServer() {
      // Todo
      this.$modal.close('add-server-modal');
    },
    joinServer() {
      // Todo
      this.$modal.close('add-server-modal');
    },
  }
}
</script>

<style>

</style>