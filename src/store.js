import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    user: null,
    servers: [],
    friends: [],
    requests: [],
    conversations: [],
};

const mutations = {
    updateServers(state, servers) {
        state.servers = servers;
    },
    updateUser(state, user) {
        state.user = user;
    },
    updateFriends(state, friends) {
        state.friends = friends;
    },
    updateRequests(state, requests) {
        state.requests = requests;
    },
    updateConversations(state, conversations) {
        conversations = conversations.map(c => {
            c.members = c.memberdetails;
            delete c.memberdetails;
            return c;
        });
        state.conversations = conversations;
    }
};

export default new Vuex.Store({
    state,
    mutations
});