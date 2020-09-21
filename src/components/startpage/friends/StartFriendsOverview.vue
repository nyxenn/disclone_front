<template>
  <div>
    <div id="friends-overview-headers">
      <h3 class="fr-header" @click="openFriendsTab">Friends</h3>
      <h3 class="fr-header" @click="openRequestsTab">Request</h3>
      <button id="fr-header-btn" @click="openAddFriendForm">Add friend</button>
    </div>

    <span v-if="this.message" id="succes-message">{{this.message}}</span>

    <friend-requests v-if="this.showRequests" />
    <friend-request-form v-else-if="this.showRequestForm" />
    <friends-list v-else />
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
  },

}
</script>

<style>

</style>