<template>
    <div class="container">
        <div class="back">
            <i class="iconfont iconprev" @click="handleBack">返回</i>
            <span class="back-msg">收藏书籍</span>
        </div>
        <div class="collectBook" v-for="(it,index) in collectBookData" :key="index">

            <div class="content-img">
                <router-link :to="{name:'details',params:{id: it._id}}">
                    <img :src="it.img" :alt="it.img"> 
                </router-link>    
            </div>

            <div class="article">
                <h2 class="article-title">
                    {{it.title}}
                </h2>
                <div class="article-desc">
                    {{it.desc}}
                </div>
                <div class="article-msg">
                    <div class="author">
                        {{it.author}}
                    </div>
                    <div class="article-time">
                        {{it.updateTime}}
                    </div>
                    <div class="article-looknums">
                        {{it.looknums}}人在看
                    </div>
                </div>
            </div>
        </div>
        
       
    </div>
</template>

<script>
    import ContentItem from '@/components/contentItem'
    import moment from 'moment'

    export default {
        name: 'collectBook',
        data() {
            return {
                collectBookData:[],
                queryData: {
                    pn:1,
                    size:2
                },
                token:''
            }
        },
        components: {
            
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg
            }
        },
        methods: {
            getCollectBook() {
                return new Promise((resolve) =>{
                    if(localStorage.token){
                        this.$axios.get(this.$api.getCollectBook,{params:this.queryData}).then(res =>{
                        let resData = res.data
                        console.log(res);
                        console.log(this.token);
                        
                        console.log(resData);
                        
                        // resData = resData.map(item =>{
                        //     item.books = item.books.map(it => {
                        //             it.updateTime = moment(it.updateTime).format('YYYY年MM月DD日')
                        //             return it
                        //         })
                        //         return item
                        // })
                        
                        // this.collectBookData = [].concat(this.collectBookData,resData)
                        this.collectBookData = res.data
                        })
                    }
                    
                })
            
            },
            handleBack() {   
                this.$router.push({
                    name: 'person'
                })
            }
        },
        created() {
            this.getCollectBook()
            this.token = localStorage.getItem('token')
            // console.log(this.token);
            
            if(this.token) {
                this.$store.dispatch('getUserMsg')
            }
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>