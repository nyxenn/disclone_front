<template>
    <div class="conversations-list">
        <button id="friends-button" @click="openConversation"><font-awesome-icon icon="user-friends" /> Friends</button>
        <h3 id="dms-header">Direct messages</h3>

        <div class="conversation-links">
            <button class="conversation-link" v-for="dm in conversations" :key="dm._id" @click="openConversation(dm._id)">
                <font-awesome-icon icon="users" :style="getBackgroundColor(dm['date-created'])" v-if="dm.members.length > 2" />
                <font-awesome-icon icon="user" :style="getBackgroundColor(dm['date-created'])" v-else />
                {{getNames(dm.members)}}
            </button>
        </div>

        <user-info-tag />
    </div>
</template>

<script>
import UserInfoTag from "../UserInfoTag.vue";

export default {
    computed: {
        conversations() { return this.$store.state.conversations; },
        user() { return this.$store.state.user; }
    },
    components: {
        UserInfoTag,
    },
    methods: {
        getNames(users) {
            let others = "";

            for (let u of users) {
                if (u._id !== this.user._id) {
                    if (others) others += ", "; 
                    others += u.username;
                }
            }
            return others;
        },
        openConversation(cid) {
            this.$emit('open-conversation', cid);
        },
        getBackgroundColor(timestamp) {
            const rem = parseInt(timestamp) % 10;
            let color = "";
            if (rem === 0) color = "#D55";
            if (rem === 1) color = "#5A5";
            if (rem === 2) color = "#55D";
            if (rem === 3) color = "#CC4";
            if (rem === 4) color = "#A2A";
            if (rem === 5) color = "#77E";
            if (rem === 6) color = "#6AA";
            if (rem === 7) color = "#71A";
            if (rem === 8) color = "#E74";
            if (rem === 9) color = "#2D5";
            return {backgroundColor: color}
        }
    },
}
</script>

<style>
    .conversations-list {
        background: #333;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }

    .conversation-links {
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    #friends-button {
        border: none;
        background: none;
        color: #ddd;
        font-size: 20px;
        width: 100%;
        text-align: left;
        height: 60px;
        margin-top: 30px;
    }

    #friends-button:hover {
        background: #222;
        cursor: pointer;
    }

    #friends-button svg {
        margin: 0px 5px;
        color: #777;
    }

    #dms-header {
        margin: 40px 0 10px 14px;
        text-align: left;
        font-size: 14px;
        color: #aaa;
        text-transform: lowercase;
        font-variant: small-caps;
        user-select: none;
    }

    .conversation-link {
        display: flex;
        background: none;
        border: none;
        color: #bbb;
        font-size: 18px;
        font-family: 'Whitney Medium';
        text-align: left;
        align-items: center;
    }

    .conversation-link:hover {
        cursor: pointer;
        background: #282828;
    }

    .conversation-link svg {
        margin: 5px 5px;
        padding: 7px;
        border-radius: 50%;
        color: #ddd;
    }
</style>