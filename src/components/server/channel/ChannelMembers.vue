<template>
  <div>
      <p v-for="m in members" :key="m.uid">
          {{m.username}}
      </p>
  </div>
</template>

<script>
export default {
    props: {
        members: {required: true, type: Array}
    }

}
</script>

<style>

</style>