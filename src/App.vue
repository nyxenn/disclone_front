<template>
  <div id="app">
    <login-form v-if="!isLoggedIn" @user-logged-in="userLoggedIn" />
    <application-overview :user="this.user" :servers="this.servers" v-else />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import ApplicationOverview from './components/ApplicationOverview.vue';
import {getUserInformation, getServerListByUser} from './helpers/helpers.js';

export default {
  name: 'App',
  components: {
    LoginForm,
    ApplicationOverview,
  },
  methods: {
    userLoggedIn(username) {
      this.isLoggedIn = true;
      this.user = getUserInformation(username);
      const serverList = getServerListByUser(this.user.uid);
      serverList.subscribe(servers => {
        this.servers = servers;
      });
    }
  },
  data() {
    return {
      isLoggedIn: false,
      user: {},
      servers: [],
    }
  }
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
