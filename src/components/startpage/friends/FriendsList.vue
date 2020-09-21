<template>
    <span v-if="!this.friends.length">No friends to show... yet.</span>

    <div v-else>
        <p v-for="u of this.friends" :key="u.uid">
            {{u.username}}
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        friends() { return this.$store.state.friends; }
    }
}
</script>

<style>

</style>