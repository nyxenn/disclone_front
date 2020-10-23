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
            mutations.joinRoom(state, s._id);
            for (let ch of s.channels) {
                mutations.joinRoom(state, s._id + "&" + ch._id);
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
        state.conversations = conversations;

        for (let c of conversations) {
            mutations.joinRoom(state, c._id);
        }
    },
    updateUserFriends(state, friends) {
        state.user.friends = friends;
    },
    openSocket(state) {
        state.socket = io("http://84.194.175.102:3000/");
    },
    joinRoom(state, room) {
        if (!state.socket) state.socket = io("http://84.194.175.102:3000/");
        state.socket.emit("room", room);
    },
    joinMember(state, serverMember) {
        const server = state.servers.find(s => s._id === serverMember.sid);
        const index = state.servers.indexOf(server);
        server.members.push(serverMember.member);

        state.servers[index] = server;
    },
    newRequest(state, request) {
        const req = state.requests.find(r => r._id === request._id);
        const index = state.requests.indexOf(req);
        if (index < 0) state.requests.push(request);
        // console.log(state.requests);
    },
    deleteRequest(state, rid) {
        const req = state.requests.find(r => r._id === rid);
        const reqIndex = state.requests.indexOf(req);

        if (reqIndex >= 0) state.requests.splice(reqIndex, 1);
    },
    acceptRequest(state, request) {
        const req = state.requests.find(r => r._id === request.rid);
        const reqIndex = state.requests.indexOf(req);
        if (reqIndex >= 0) state.requests.splice(reqIndex, 1);

        const friend = state.friends.find(f => f._id === request.friend._id);
        const friendIndex = state.friends.indexOf(friend);
        if (friendIndex < 0) state.friends.push(request.friend);
    },
    deleteFriend(state, fuid) {
        const friend = state.friends.find(f => f._id === fuid);
        const index = state.friends.indexOf(friend);
        if (index >= 0) state.friends.splice(state.friends.indexOf(fuid), 1);
    },
    addNewConversation(state, conv) {
        const index = state.conversations.indexOf(conv._id);
        mutations.joinRoom(state, conv._id);
        if (index < 0) state.conversations.push(conv);
    },
    deleteServer(state, sid) {
        const server = state.servers.find(s => s._id === sid);
        const index = state.servers.indexOf(server);

        if (index >= 0) state.servers.splice(index, 1);
    },
    addChannel(state, srv) {
        const {sid, channel} = srv;
        const server = state.servers.find(s => s._id === sid);
        if (!server) return;
        const serverIndex = state.servers.indexOf(server);

        const index = server.channels.indexOf(channel);
        if (index < 0) {
            server.channels.push(channel);
            state.servers[serverIndex] = server;
        }
    },
    deleteChannel(state, ids) {
        const {sid, cid} = ids;
        const server = state.servers.find(s => s._id === sid);
        if (!server) return;
        const serverIndex = state.servers.indexOf(server);

        const channel = server.channels.find(c => c._id === cid);
        const index = server.channels.indexOf(channel);

        if (index >= 0) {
            server.channels.splice(index, 1);
            state.servers[serverIndex] = server;
        }
    },
};

export default new Vuex.Store({
    state,
    mutations
});