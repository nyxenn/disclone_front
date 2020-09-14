<template>
  <div>
    Friends
    <p v-for="u of this.user.friends" :key="u.uid">
      {{ u.name }}
    </p>
  </div>
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