<template>
    <span v-if="!this.friends.length">No friends to show... yet.</span>

    <div class="friend-list" v-else>
        <p class="friend-count">Friends - {{ this.friends.length }}</p>
        <div v-for="u of this.friends" class="friend-list-entry" :key="u._id" @dblclick="openConversation(u._id)">
            <div class="friend-seperator"></div>

            <div class="friend-information">
                <span class="friend-username">{{ u.username }}</span>
                
                <div class="friend-actions">
                    <button class="start-conversation" @click="openConversation(u._id)">
                        <font-awesome-icon icon="comment-alt" />
                    </button>
                    <button class="delete-friend" @click="deleteFriend(u._id, u.username, $event)">
                        <font-awesome-icon icon="trash-alt" />
                    </button>
                </div>
            </div>
        </div>
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
            axios.post("http://84.194.175.102:3000/conv/open", {uid: this.user._id, fuid})
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
    .friend-list {
        flex-direction: column;
        width: 100%;
        overflow-y: scroll;
        scrollbar-width: none;
        text-align: left;
        margin-top: 20px;
        user-select: none;
    }

    .friend-list::-webkit-scrollbar {
        display: none;
        width: none;
    }

    .friend-count {
        margin-left: 20px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 20px;
    }

    .friend-list-entry {
        display: flex;
        height: 50px;
        width: 100%;
        font-size: 17px;
        flex-direction: column;
    }

    .friend-seperator {
        width: 95%;
        height: 2px;
        background: #383838;
        margin-left: auto;
        margin-right: auto;
    }

    .friend-information {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 25px;
        height: 100%;
    }

    .friend-information:hover {
        background: #484848;
        cursor: pointer;
    }

    .friend-actions {
        width: 20%;
        margin-left: auto;
    }

    .friend-actions button {
        height: 30px;
        border: none;
        border-radius: 50%;
        margin-left: 10px;
        background: #333;
        font-size: 16px;
        line-height: 16px;
        color: #aaa;
    }

    .start-conversation:hover {
        color: #eee;
        cursor: pointer;
    }

    .delete-friend:hover {
        color: #E55;
        cursor: pointer;
    }

</style>