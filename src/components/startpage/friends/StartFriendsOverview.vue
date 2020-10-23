<template>
  <div class="friends-overview">
    <div class="friends-overview-headers">
      <button class="fr-header" :class="{ active: showFriends }" @click="openFriendsTab">Friends</button>
      <button class="fr-header" :class="{ active: showRequests}" @click="openRequestsTab">Requests</button>
      <button id="fr-header-btn" @click="openAddFriendForm">
        <font-awesome-icon icon="user-plus" />
        Add friend
      </button>
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
    margin-left: 10px;
    margin-top: 4px;
  }

  .friends-overview-headers button {
    border: none;
    background: none;
    font-family: 'Whitney Medium';
    font-size: 18px;
    color: #aaa;
    margin-right: 5px;
  }

  .fr-header.active {
    color: #ddd;
    background-color: #333;
    border-radius: 3px; 
  }

  #fr-header-btn {
    background: #5B6;
    border-radius: 3px;
    color: #fff;
  }

  #fr-header-btn svg {
    font-size: 16px;
    line-height: 16px;
    margin-right: 5px;
  }
</style>