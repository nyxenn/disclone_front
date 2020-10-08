<template>
  <div class="application-overview">
      <server-sidebar @server-selected="serverSelected" class="server-sidebar" />

      <server-overview :server="this.server" class="server-overview" v-if="this.server" />
      <startpage-overview v-else />
  </div>
</template>

<script>
import ServerSidebar from './server/ServerSidebar.vue';
import ServerOverview from './server/ServerOverview.vue';
import StartpageOverview from "./startpage/StartpageOverview.vue";

export default {
    components: {
        ServerSidebar,
        ServerOverview,
        StartpageOverview,
    },
    data() {
        return {
            server: null
        }
    },
    computed: {
        servers() { return this.$store.state.servers; },
        socket() { return this.$store.state.socket; }
    },
    mounted() {
        this.socket.on("srv-deleted", (sid) => {
            this.$store.commit("deleteServer", sid);
            this.socket.emit("leave", sid);
            this.server = null;
        });

        this.socket.on("ch-added", (sid, channel) => {
            this.$store.commit("addChannel", {sid, channel});
            this.socket.emit("join", sid + "&" + channel._id);
        });

        this.socket.on("ch-deleted", (sid, cid) => {
            this.$store.commit("deleteChannel", {sid, cid});
            this.socket.emit("leave", sid + "&" + cid);
        });
    },
    methods: {
        serverSelected(sid) {
            if (sid) {
                const server = this.servers.find(s => s._id === sid);
                this.server = server;
                return;
            }
            this.server = null;
        }
    }
}
</script>

<style>
    .application-overview {
        display: flex;
    }

    .server-sidebar {
        height: 100%;
    }

    .server-overview {
        height: 100%;
        width: 100%;
    }
</style>