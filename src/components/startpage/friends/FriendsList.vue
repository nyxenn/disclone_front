<template>
    <span v-if="!this.friends.length">No friends to show... yet.</span>

    <div v-else>
        <p v-for="u of this.friends" :key="u._id" @dblclick="openConversation(u._id)">
            <span class="friend-username">{{ u.username }}</span>
            <button class="delete-friend" @click="deleteFriend(u._id, u.username, $event)">Delete</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    computed: {
        friends() { return this.$store.state.friends; },
        user() { return this.$store.state.user; },
        socket() { return this.$store.state.socket; }
    },
    methods: {
        openConversation(fuid) {
            console.log(this.user, fuid);
            axios.post("/conv/open", {uid: this.user._id, fuid})
                .then(res => {console.log(res); this.$emit("open-conv", res.data)})
                .catch(err => console.error(err));
        },
        deleteFriend(fuid, fusername, event) {
            event.stopPropagation();
            const userInfo = {uid: this.user._id, username: this.user.username};
            const friendInfo = {uid: fuid, username: fusername};
            this.socket.emit("deleteFriend", userInfo, friendInfo);
        }
    }
}
</script>

<style>

</style>