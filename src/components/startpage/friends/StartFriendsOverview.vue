<template>
  <div>
    <div id="friends-overview-headers">
      <button class="fr-header" @click="openFriendsTab">Friends</button>
      <button class="fr-header" @click="openRequestsTab">Request</button>
      <button id="fr-header-btn" @click="openAddFriendForm">Add friend</button>
    </div>

    <span v-if="this.message" id="succes-message">{{this.message}}</span>

    <friend-requests v-if="this.showRequests" />
    <friend-request-form v-else-if="this.showRequestForm" />
    <friends-list @open-conv="openConversation" v-else />
  </div>
</template>

<script>
import FriendsList from './FriendsList.vue';
import FriendRequests from './FriendRequests.vue';
import FriendRequestForm from './FriendRequestForm.vue';

export default {
  components: {
    FriendsList,
    FriendRequests,
    FriendRequestForm,
  },
  data() {
    return {
      showFriends: true,
      showRequests: false,
      showRequestForm: false,
      message: "",
    }
  },
  computed: {
    friends() {
      return this.$store.state.friends;
    },
    requests() {
      return this.$store.state.requests;
    }
  },
  methods: {
    resetTabs() {
      this.showFriends = false;
      this.showRequests = false;
      this.showRequestForm = false;
    },
    openFriendsTab() {
      this.resetTabs();
      this.showFriends = true;
    },
    openRequestsTab() {
      this.resetTabs();
      this.showRequests = true;
    },
    openAddFriendForm() {
      this.resetTabs();
      this.showRequestForm = true;
    },
    openConversation(conv) {
      this.$emit("open-conv", conv);
    }
  },

}
</script>

<style>
  .friends-overview-headers {
    display: flex;
    flex-wrap: nowrap;
  }
</style>