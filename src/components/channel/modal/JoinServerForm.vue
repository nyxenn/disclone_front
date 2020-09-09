<template>
    <form @submit.prevent="onSubmit">
        <p v-if="this.errorMessage">{{errorMessage}}</p>
        <label for="server-id">Server ID</label>
        <input type="text" id="server-id" min="2" max="100" v-model.lazy.trim="serverId">

        <a @click="backToSelection">Back</a>
        <button type="submit">Join</button>
    </form>
</template>

<script>
import {joinServer} from '../../../helpers/helpers.js';

export default {
    props: {
        user: {required: true, type: Object},
    },
    data() {
        return {
            serverId: null,
            errorMessage: ""
        }
    },
    methods: {
        onSubmit() {
            const succesfulJoin = joinServer(this.serverId, this.user.id);
            if (succesfulJoin) {
                this.errorMessage = ""
                this.$emit('joined-server');
                return;
            }
            this.errorMessage = "Could not find server with given ID";
        },
        backToSelection() {
            this.$emit('cancel-joining')
        },
    },
}
</script>

<style>

</style>