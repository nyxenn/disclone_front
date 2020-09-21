<template>
  <div>{{this.user.username}}</div>
</template>

<script>
export default {
  computed: {
    user() { return this.$store.state.user; }
  }

}
</script>

<style>

</style>