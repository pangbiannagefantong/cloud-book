<template>
    <div>
        <Tabbar v-model="selected" :fixed="true">
            <TabItem id="index">
                <i class="iconfont iconshouye" slot="icon"></i>
                首页
            </TabItem>
            <TabItem id="study">
                <i class="iconfont iconxuexi" slot="icon"></i>
                我的学习
            </TabItem>
            <TabItem id="person">
                <i class="iconfont iconuser" slot="icon"></i>
                个人中心
            </TabItem>
        </Tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabItem } from 'mint-ui'
    


    export default {
        name: "tab-bar",
        components: {
            Tabbar,
            TabItem
        },
        data() {
            return {
                selected: 'index'
            }
        },
        watch: {
            selected(val) {
                this.$router.push({
                    name: val
                })
            }
        },
        created() {
            this.selected = this.$route.name
        }
    }
</script>
<style scoped>
.iconfont{
    font-size: 26px;
}
</style>