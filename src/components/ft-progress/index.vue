<template>
    <div class="progress-wrap">
        <div class="child" :style="{width}"></div>
    </div>
</template>

<script>
    export default {
        name: 'ft-progress',
        props: {
            total: Number,
            value: Number
        },
        data () {
            return {
                isShowChild: false,
                width:0
            }
        },
        methods: {
            handleTransition () {
                this.width = this.value / this.total * 100 + '%'
            }
        },
        created () {
            setTimeout(() =>{
                this. handleTransition()
            },300)
        },
        watch: {
            total () {
                this.handleTransition()
            },
            value () {
                this.handleTransition()
            }
        }
    }
</script>
<style lang="scss">
    .progress-wrap{
        position: relative;
        background: #ebebeb;
        height: 6px;
        .child{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0;
            background: #409eff;
            transition: width 0.5s ease;
        }
    }
</style>