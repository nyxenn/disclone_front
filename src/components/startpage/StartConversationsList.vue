<template>
    <div>
        <button id="friends-button" @click="openConversation">Friends</button>
        <h3 id="dms-header">Direct messages</h3>

        <br><br>

        <div class="conversation-links">
            <button class="conversation-link" v-for="dm in conversations" :key="dm.dmid" @click="openConversation(dm.dmid)">
                {{getNames(dm.members)}}
            </button>
        </div>

        <br>
        <user-info-tag id="user-tag" />
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
                if (u.uid !== this.user.uid) {
                    if (others) others += ", "; 
                    others += u.username;
                }
            }
            return others;
        },
        openConversation(cid) {
            this.$emit('open-conversation', cid);
        }
    },
}
</script>

<style>
    .conversation-links {
        display: flex;
        flex-direction: column;
    }
</style>