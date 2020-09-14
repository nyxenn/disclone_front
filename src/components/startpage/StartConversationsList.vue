<template>
    <div>
        <span id="friends-button" @click="openConversation">Friends</span>
        <span id="dms-header">Direct messages</span>

        <br><br>

        <p v-for="dm in user.conversations" :key="dm.dmid" @click="openConversation(dm.dmid)">
            {{getNames(dm.members)}}
        </p>

        <br>
        <user-info-tag :user=this.user />
    </div>
</template>

<script>
import UserInfoTag from "../UserInfoTag.vue";

export default {
    props: {
        user: {required: true, type: Object},
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
                    others += u.name;
                }
            }
            return others;
        },
        openConversation(cid) {
            this.$emit('open-conversation', cid);
        }
    }
}
</script>

<style>

</style>