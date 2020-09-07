<template>
  <div class="application-overview">
      <server-sidebar :servers="this.user.servers" @server-selected="serverSelected" class="server-sidebar" />
      <server-overview :server="this.server" :user="this.user" class="server-overview" />
  </div>
</template>

<script>
import ServerSidebar from './ServerSidebar.vue';
import ServerOverview from './ServerOverview.vue';

export default {
    components: {
        ServerSidebar,
        ServerOverview,
    },
    data() {
        return {
            server: null
        }
    },
    props: {
        user: {required: true, type: Object}
    },
    methods: {
        serverSelected(serverId) {
            if (serverId) {
                const server = this.user.servers.find(s => s.id === serverId);
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
        border: 1px solid red;
        box-sizing: border-box;

        display: flex;
    }

    .server-sidebar {
        border: 1px solid blue;
        box-sizing: border-box;

        height: 100%;
    }

    .server-overview {
        border: 1px solid green;
        box-sizing: border-box;

        height: 100%;
        width: 100%;
    }
</style>