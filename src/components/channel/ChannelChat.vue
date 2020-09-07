<template>
  <div>
      <p v-for="msg in history" :key="msg.id">
          {{ members.find(m => m.id === msg.user).username }}, {{ timestampToDateString(msg.timestamp )}}
          <br>
          {{ msg.message }}
      </p>
  </div>
</template>

<script>
export default {
    props: {
        history: {required: false, type: Array},
        members: {required: true, type: Array}
    },
    methods: {
        timestampToDateString(ts) {
            const date = new Date(ts * 1000);
            return `${date.toDateString()} at ${date.toTimeString()}`
        }
    }
}
</script>

<style>

</style>