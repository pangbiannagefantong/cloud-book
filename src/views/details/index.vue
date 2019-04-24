<template>
    <div class="container">
        <div class="back">
            <i class="iconfont iconprev" @click="handleBack">返回</i>
        </div>
        <div class="book">
            <div class="img">
                <img :src="bookData.img" :alt="bookData.img">
            </div>
            <div class="msg">
                <h2>{{bookData.title}}</h2>
                <div class="author">
                    作者：{{bookData.author}}
                </div>
                <div class="looknums">
                    {{bookData.looknums}}人在看
                </div>
                <div class="startsnums">
                    {{bookData.startsnums}}人喜欢
                </div>
            </div>
        </div>

        <div class="btns">
            <Button size="small" v-if="isCollected" @click="addCollect">加入收藏</Button>
            <Button size="small" v-else @click="delCollect">已收藏</Button>
            <Button size="small">分享好友</Button>
        </div>
        <div class="line"></div>
        <div class="desc">
            <h2>
                简介
            </h2>
            <div class="book-desc">
               {{bookData.desc}}
            </div>
        </div>
        <div class="show-titles">
            <h2>
                查看目录
                <span class="titles">
                    共{{totalTitles}}章
                </span>
            </h2>
            <div class="time">
                {{bookData.updateTime}}
            </div>
        </div>
        <div class="line"></div>
        <Button type="primary" size="large" class="bottom-btn" @click="handleJump">阅读该书籍</Button>
    </div>
</template>

<script>
    import { Button ,Toast} from 'mint-ui';
    import moment from 'moment'


    export default {
        name: "ftDetails",
        components: {
            Button
        },
        data() {
            return {
                bookData: [],
                totalTitles : 0,
                isCollected : {
                    default : false
                },
                token: '',
                collectionBook:[]
                // collected
            }
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg
            }
        },
        methods: {
            getBookData() {
                const id = this.$route.params.id
                this.$axios.get(this.$api.getBook + id).then((res)=>{
                    this.bookData = res.data
                    res.data.updateTime = moment(res.data.updateTime).format('YYYY年MM月DD日')
                    this.totalTitles = res.length
                    // console.log(this.bookData);
                    // console.log(res);
                    // console.log(res.length);   
                    })
                },
            getCollectBook(){
                this.$axios.get(this.$api.getCollectBook,{header:{token: this.token}}).then(res =>{
                    this.collectionBook = res.data                       
                })
            },
            addCollect() {
                this.token = localStorage.getItem('token')
                if(!this.token){
                    Toast({
                            message: '可不可以先去登录',
                            duration: 1000
                        })
                }else{
                    
                    if(this.isCollected){
                        this.$axios.post(this.$api.addCollect,this.bookData._id,{header: {token: this.token}}).then(res =>{
                            this.isCollected = !this.isCollected
                                // this.bookData.isCollected = !this.isCollected
                                // console.log(res,'888');
                                
                                Toast({
                                    message: '收藏成功',
                                    duration: 1000
                                })
                        })
                    }
                }  
            },
            delCollect() {
                this.$axios.post(this.$api.delCollect,this.bookData._id).then(res =>{
                    
                })
            },
             handleBack() {
                this.$router.push({
                    name: 'index'
                })
            },
            handleJump() {
                this.$router.push({
                    name: 'titles',
                    params: {
                        id: this.bookData._id
                    }
                })
            }
        },
        created() {
            this.getBookData()
            this.getCollectBook()
        }
    }
</script>
<style scoped lang="scss" src="./index.scss"></style>