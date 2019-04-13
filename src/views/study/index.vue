<template>
    <div class="study container" >
            <div class="study-item" v-for="(item,index) in arr" :key="index">
                <div class="read-img">
                    <img :src="item.book.img" alt="">
                </div>

                <div class="read-msg">
                    <h2>{{item.book.title}}</h2>
                    <div class="read-status">
                        书籍{{item.title.index + 1}}/{{item.title.total}}章节
                    </div> 
                    <div class="read-progress">
                        <!-- <progress :value="(((item.title.index + 1)/item.title.total)*100)" :max="100"></progress> -->
                        <div class="box" style="flex:1">
                            <ftProgress :total="item.title.total" :value="item.title.index + 1"></ftProgress>
                        </div>
                        
                        <div class="read-percent">
                            已看{{(((item.title.index + 1)/item.title.total)*100).toFixed(2)}}%    
                        </div>    
                    </div>
                    <div class="last-read">
                        <div class="last-read-title">
                            上次查看：{{item.title.title}}
                        </div> 
                        <div class="last-read-time">
                            <readTime :value="item.updatedTime"></readTime>    
                        </div>   
                        <!-- @click="continueRead" -->
                    </div>
                    <div class="btns">
                        <Button size="small" class="btn1">继续阅读 </Button>
                        <Button size="small" class="btn2">查看文档</Button>    
                    </div>   
                </div>
            </div>
    </div>
</template>

<script>
    import {Button,Toast,Loadmore} from 'mint-ui'
    import ftProgress from '@/components/ft-progress'
    import readTime from  '@/components/readTime'

    export default {
        name: 'study',
        components: {
            Button,
            Toast,
            ftProgress,
            readTime,
        },
        data() {
            return {
                token:'',
                arr:[],
                value:0,
                time:new Date('2019-04-07T10:18:57.000Z'),
            }
        },
        methods: {
            getReadBookData() {
                if(localStorage.token){
                    this.$axios.get(this.$api.getReadBook).then(res =>{
                        if(res.code == 200) {
                            this.arr = res.data
                            // let Arr = this.arr
                            // Arr.map(item =>{
                            //     this.bookId = item._id
                            //     this.lastReadId = item.title._id
                            //     console.log(this.lastReadId);
                                
                            //     // console.log(this.bookId);
                            // })
                            // console.log(this.arr);
                            // // console.log(res.data.arr);
                            
                        }
                        
                    })
                }else{
                    Toast({
                        message: res.msg
                    })
                }    
            },
            // getBookData() {
            //     const id = this.$route.params.id
            //     this.$axios.get(this.$api.getBook + id).then((res) => {
            //         this.bookData = res.data
            //         console.log(res.data);
                    
            //     })
            // },
            // getLastRead() {
            //     const id = 
            // },
            // jumpBook() {

                    // const id = this.$route.params.id;
                    // console.log(id);
                    
                    // this.$axios.get(this.$api.getBook + id).then((res =>{
                    //     console.log(res.data);
                        
                    // }))
                
                // this.$router.push({
                //     name: 'titles',
                    // params: {
                    //     id: this.lastRead_id
                    // }
            //     })
            // }

        },
        created() {
            this.getReadBookData()
            // this.getBookData()
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>