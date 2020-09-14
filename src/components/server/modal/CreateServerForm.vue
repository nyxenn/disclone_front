<template>
    <form @submit.prevent="onSubmit">
        <label for="server-name">Server Name</label>
        <input type="text" id="server-name" min="2" max="100" v-model.lazy.trim="serverName">

        <a @click="backToSelection">Back</a>
        <button type="submit">Create</button>
    </form>
</template>

<script>
import {createServer} from '../../../helpers/helpers.js';

export default {
    props: {
        user: {required: true, type: Object},
    },
    data() {
        return {
            serverName: ""
        }
    },
    methods: {
        onSubmit() {
            createServer(this.serverName, this.user.uid);
            this.$emit('created-server');
        },
        backToSelection() {
            this.$emit('cancel-creation');
        }
    }
}
</script>

<style>

</style>