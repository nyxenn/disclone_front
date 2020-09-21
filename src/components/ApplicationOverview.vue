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
        servers() { return this.$store.state.servers; }
    },
    methods: {
        serverSelected(serverId) {
            if (serverId) {
                const server = this.servers.find(s => s.sid === serverId);
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