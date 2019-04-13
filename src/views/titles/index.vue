<template>
    <div class="container">
        <div class="back">
            <i class="iconfont iconprev" @click="handleBack">返回</i>
        </div>
        <div class="box">
            <ul>
                <li v-for="(item,index) in titles" :key="index" class="titles-item">
                    <router-link :to="{name:'article',params:{id:item._id}}">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'titles',
        components: {
            
        },
        data() {
            return {
                titles: [],
                bookData: {}
            }
        },
        methods: {
            getTitles() {
                const id = this.$route.params.id
                this.$axios.get(this.$api.getTitles + id).then((res) => {
                    this.titles = res.data
                    // console.log(res.data);
                    
                })

            },
            getBookData() {
                const id = this.$route.params.id
                this.$axios.get(this.$api.getBook + id).then((res) => {
                    this.bookData = res.data
                    // console.log(res.data);
                    document.title = res.data.title + '--' + '目录'
                })
            },
            handleBack() {
                this.$router.push({
                    name: 'details'
                })
            }
        },
        created() {
            this.getTitles()
            this.getBookData()
        }
    }
</script>
<style scoped lang="scss">
    @import '../../globalCss/px2-rem.scss';
    .container{
        padding: px-to-rem(18);

        .titles-item{
            border-bottom: 1px solid rgb(224, 206, 206);
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
        }
        a{
            color:rgb(68, 61, 61);
            padding-left: 20px;
        }
        .back{
                background-color:rgb(42,163,255);
                display: flex;
                align-items: center;
                height: px-to-rem(80);
                margin: -9px -9px 20px -9px;
                .iconfont{
                    font-size: 16px;
                    color: white;
                }
            }
    }
    
</style>