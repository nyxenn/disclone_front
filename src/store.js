import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";

Vue.use(Vuex);

const state = {
    user: null,
    servers: [],
    friends: [],
    requests: [],
    conversations: [],
    socket: null
};

const mutations = {
    updateServers(state, servers) {
        state.servers = servers;

        for (let s of servers) {
            for (let ch of s.channels) {
                mutations.joinRoom(state, s.sid + "&" + ch.cid);
            }
        }
    },
    updateUser(state, user) {
        state.user = user;
        mutations.joinRoom(state, user.username);
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

        for (let c of conversations) {
            mutations.joinRoom(state, c.dmid);
        }
    },
    updateUserFriends(state, friends) {
        state.user.friends = friends;
    },
    openSocket(state) {
        state.socket = io();
    },
    joinRoom(state, room) {
        if (!state.socket) state.socket = io();
        state.socket.emit("room", room);
    },
    newRequest(state, request) {
        state.requests.push(request);
    },
    deleteRequest(state, rid) {
        const req = state.requests.find(r => r.rid === rid);
        const reqIndex = state.requests.indexOf(req);

        state.requests.splice(reqIndex, 1);
    },
    acceptRequest(state, request) {
        mutations.deleteRequest(state, request.rid);
        if (!state.friends.includes(request.friend)) state.friends.push(request.friend);
    }
};

export default new Vuex.Store({
    state,
    mutations
});