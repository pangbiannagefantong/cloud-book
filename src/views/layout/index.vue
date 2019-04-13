<template>
    <div>
        <router-view />
        <ftTabbar />
    </div>
</template>

<script>
    import ftTabbar from '@/components/tab-bar/index'

    export default {
        name: "layout",
        components: {
            ftTabbar
        },
    }
</script>
<style scoped>
</style>