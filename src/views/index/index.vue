<template>
    <div class="container">
        <Loadmore :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :autoFill = "false"
        :bottom-all-loaded="allLoaded"
        bottomPullText = "上拉加载更多数据"
        ref="loadmore">
            <MySwiper />
                <div class="content">
                    <ContentItem v-for="(item,index) in contentData" 
                        :options="item"
                        :key="index">
                    </ContentItem>

                </div>
            </Loadmore>
    </div>
</template>

<script>
    import MySwiper from '@/components/my-swiper'
    import ContentItem from '@/components/contentItem'
    import { Loadmore } from 'mint-ui'
    import moment from 'moment'
    

    export default {
        name: "index",
        components: {
            MySwiper,
            ContentItem,
            Loadmore
            
        },
        data() {
            return {
                contentData: [],
                queryData: {
                    pn:1,
                    booksSize:2,
                    size:2 
                },
                allLoaded : false,
            }
        },
        methods: {
            getContent() {
                return new Promise((resolve) =>{
                    this.$axios.get(this.$api.getContent,{
                        params: this.queryData    
                    }).then(res =>{
                        let resData = res.data
                        if(resData.length < this.queryData.size){
                            this.allLoaded = true
                        }
                        resData = resData.map(item => {
                            item.books = item.books.map(it => {
                                it.updateTime = moment(it.updateTime).format('YYYY年MM月DD日')
                                return it
                            })
                            return item
                        })
                        this.contentData = [].concat(this.contentData,resData)
                        })
                        resolve()
                    })
                
            },
            loadTop() {
                this.queryData = {
                    pn:1,
                    booksSize:2,
                    size:2 
                }
                console.log("下拉刷新");
                
                this.contentData = []
                this.allLoaded = false
                this.getContent().then(()=>{
                    this.$refs.loadmore.onTopLoaded()
                })
            },
            loadBottom  () {
                this.queryData = {
                    pn:this.queryData.pn = this.queryData.pn + 1,
                    booksSize:2,
                    size:2
                }
                console.log(this.queryData,"!!!");
                this.getContent().then(()=>{
                    this.$refs.loadmore.onBottomLoaded()
                })
                // console.log(this.contentData);
            },
        }, 
        created () {
            this.getContent()
        }
    }
</script>
<style scoped lang="scss">
    @import '../../globalCss/px2-rem';

    .container {
        padding: px-to-rem(18);
        padding-bottom: 60px;
    }
</style>