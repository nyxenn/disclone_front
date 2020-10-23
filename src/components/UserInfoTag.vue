<template>
  <div class="user-info-tag">
      <font-awesome-icon icon="user-tag" />
      <span :class="{'name-sm': this.user.username.length > 12}">{{this.user.username}}</span>
  </div>
</template>

<script>
export default {
  computed: {
    user() { return this.$store.state.user; }
  }

}
</script>

<style>
  .user-info-tag {
    width: 100%;
    height: 50px;
    margin-top: auto;
    text-align: left;
    font-size: 18px;
    display: flex;
    align-items: center;
    background-color: #292929;
  }

  .user-info-tag svg {
    margin-left: 14px;
    margin-right: 5px;
  }

  .name-sm {
    font-size: 16px;
  }
</style>