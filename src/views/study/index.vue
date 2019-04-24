<template>
<div>
    <div class="plsLogin" v-if='!this.token'>
        <h2>登陆查看，谢谢</h2>
    </div>
    
    <div class="study container" v-else>
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
                        <router-link :to="{name:'article',params: {id:item.title._id}}">
                            <Button size="small" class="btn1">继续阅读 </Button>
                        </router-link>
                        <router-link :to="{name:'details',params: {id: item.book._id}}">
                            <Button size="small" class="btn2">查看文档</Button> 
                        </router-link>
                           
                    </div>   
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
                // isShow: true
            }
        },
        methods: {
            getReadBookData() {
                this.token = localStorage.getItem('token')
                if(this.token){
                    // this.isShow = false
                    this.$axios.get(this.$api.getReadBook,{headers: {token:this.token}}).then(res =>{
                        console.log(res,'5555')
                        if(res.code == 200) {
                            this.arr = res.data
                        }
                        
                    })
                }else{
                    Toast({
                        message: res.msg
                    })
                }    
            },
        },
        created() {
            if(this.token) {
                this.getReadBookData()
            } 
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>