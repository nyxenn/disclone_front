<template>
  <div class="channels-container">
    <div class="channels">
      <p v-for="c in this.channels" :key="c.cid" @click="changeChannel(c.cid)">
        {{c.name}}
      </p>
    </div>
    <user-info-tag class="user-info-tag" :user=this.user />
  </div>
</template>

<script>
import UserInfoTag from './../../UserInfoTag.vue';

export default {
  props: {
    channels: {required: true, type: Array},
    user: {required: true, type: Object}
  },
  components: {
    UserInfoTag
  },
  methods: {
    changeChannel(channelId) {
      this.$emit("change-channel", channelId);
    }
  }
}
</script>

<style>
  .channels-container {
    display: flex;
    flex-direction: column;
  }

  .channels {
    flex: 1;
  }

  .user-info-tag {
    width: 100%;
    height: 50px;
  }
</style>