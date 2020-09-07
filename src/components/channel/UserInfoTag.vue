<template>
  <div>{{this.user.username}}</div>
</template>

<script>
export default {
  props: {
    user: {required: true, type: Object}
  }

}
</script>

<style>

</style>