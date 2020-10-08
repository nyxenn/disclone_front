<template>
  <div>
    <p v-for="m in members" :key="m._id">
        {{m.username}}
    </p>
  </div>
</template>

<script>
export default {
    props: {
        sid: {required: true},
        members: {required: true, type: Array}
    },
    computed: {
        socket() { return this.$store.state.socket; }
    },
    mounted() {
        this.socket.on('srv-joined', (sid, _id, username) => {
            if (toString(sid) === toString(this.sid)) {
                this.members.push({_id, username});
                this.$store.commit("joinMember", {sid: this.sid, member: {_id, username}});
            }
        });
    }
}
</script>

<style>

</style>