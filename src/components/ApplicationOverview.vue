<template>
  <div class="application-overview">
      <server-sidebar :servers="this.servers" @server-selected="serverSelected" :user="this.user" class="server-sidebar" />

      <server-overview :server="this.server" :user="this.user" class="server-overview" v-if="this.server" />
      <startpage-overview :user="this.user" v-else />
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
    props: {
        user: {required: true, type: Object},
        servers: {required: true, type: Array},
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