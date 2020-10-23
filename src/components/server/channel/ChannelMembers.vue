<template>
    <div class="channel-members">
        <div class="channel-group">
            <div class="member-group-title">Creator</div>
            <div class="member-entry">
                {{ this.creator.username }}
            </div>
        </div>

        <div class="channel-group">
            <div class="member-group-title">Peasants</div>
            <div class="member-entry" v-for="m in this.regulars" :key="m._id">
                {{ m.username }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sid: {required: true},
        members: {required: true, type: Array},
        creatorid: {required: true, type: String}
    },
    watch: {
        members: function(newMems) {
            if (newMems) this.getMembers();
        } 
    },
    computed: {
        socket() { return this.$store.state.socket; }
    },
    data() {
        return {
            creator: null,
            regulars: [],
        }
    },
    methods: {
        getMembers() {
            this.getRegulars();
            this.getCreator();
        },
        getRegulars() {
            this.regulars = this.members.filter(m => m._id !== this.creatorid);
        },
        getCreator() {
            this.creator = this.members.find(m => m._id === this.creatorid);
        }
    }
}
</script>

<style>
    .channel-members {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        overflow-y: scroll;
        scrollbar-width: none;

        background-color: #333;
        border-left: 1px solid #282828;
        box-shadow: 0 0 3px 0 #222;
    }

    .channel-members::-webkit-scrollbar {
        width: 0;
        display: none;
    }

    .channel-group {
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
        text-align: left;
    }

    .member-group-title {
        font-size: 16px;
        color: #66E;
        text-transform: lowercase;
        font-variant: small-caps;
        user-select: none;
    }

    .member-entry {
        font-size: 17px;
        margin-top: 10px;
    }
</style>