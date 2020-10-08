<template>
  <div id="app">
    <login-form v-if="!isLoggedIn" @user-logged-in="userLoggedIn" @user-registered="userLoggedIn" />
    <application-overview v-if="user && socket" />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import ApplicationOverview from './components/ApplicationOverview.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    LoginForm,
    ApplicationOverview,
  },
  computed: {
    user() { return this.$store.state.user; },
    socket() { return this.$store.state.socket; }
  },
  mounted() {
    this.$store.commit("openSocket");

    this.socket.on("new-dm", (conv) => this.$store.commit("addNewConversation", conv));
    this.socket.on("new-req", (request) => this.$store.commit("newRequest", request));
    this.socket.on("del-req", (rid) => this.$store.commit("deleteRequest", rid));
    this.socket.on("acc-req", (rid, friend) => this.$store.commit("acceptRequest", {rid, friend}));
    this.socket.on("del-friend", (fuid) => this.$store.commit("deleteFriend", fuid));
  },
  methods: {
    userLoggedIn(user) {
      this.$store.commit("updateUser", user);

      axios.get(`/server/u/${this.user._id}`)
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("updateServers", res.data);
            this.getFriends();
            this.getConversations();
            this.getRequests();
            this.isLoggedIn = true;
            return;
          }
        })
        .catch(err => console.error(err));
    },
    getFriends() {
      axios.post("/user/friends", {friends: this.$store.state.user.friends})
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("updateFriends", res.data);
          }
        })
        .catch(err => console.error(err));
    },
    getConversations() {
      axios.get(`/conv/simple/${this.$store.state.user._id}`)
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("updateConversations", res.data);
          }
        })
        .catch(err => console.error(err));
    },
    getRequests() {
      axios.get(`/req/all/${this.$store.state.user._id}`)
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("updateRequests", res.data);
          }
        })
        .catch(err => console.error(err));
    }
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },
  
}
</script>

<style>
  html, body, #app, .application-overview {
    width: 100%;
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .application-overview {
    width: 100%;
    height: 100%;
  }
</style>
