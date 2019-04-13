<template>
    <div class="article">
       <div class="content markdown"  v-html="html" :style="{fontSize : fontSize + 'px'}"></div>
       <div class="btns">
           <i class="iconfont iconprev" @click="handleJump('prev')"></i>
           <i class="iconfont iconmulu" @click="showTitles"></i>
           <i class="iconfont iconyueduye_zitizengda" @click="handleAdd"></i>
           <i class="iconfont iconyueduye_zitijianxiao" @click="handleReduce"></i>
           <i class="iconfont iconnext" @click="handleJump('next')"></i>
       </div>

       <div class="titlesWrap" v-show="isShowTitles" @click="hideTitles" >
           <transition name="slide">
               <ul v-show="isActive" class="titles" @click.stop>
                   <li v-for="(item,index) in titles" :key="index" class="title-item" @click="reload">  
                      <router-link :to="{name:'article',params:{id:item._id}}"> 
                          {{item.title}}
                      </router-link>
                   </li>
               </ul>
           </transition>
       </div>
       
    </div>
</template>

<script>
    import Showdown from 'showdown'
    import { Toast } from 'mint-ui'

    export default {
        name: 'ftArticle',
        components: {

        },
        data() {
           return {
               article: {},
               html: '',
               fontSize:48,
               index:-1,
               titles: [],
               isShowTitles: false,
               isActive: false
           }
        },
        methods: {
            getArticle() {
                return new Promise ((resolve)=>{
                    const id = this.$route.params.id
                    // const id = itemId?itemId:this.$route.params.id
                    this.$axios.get(this.$api.getArticle + id).then((res)=>{  
                    // console.log(res.data);
                    const converter = new Showdown.Converter()
                    this.html = converter.makeHtml(res.data.article.content)
                    this.article = res.data
                    this.index = res.data.article.index
                    resolve()
                    })
                })
            },
            handleAdd() {   
                this.fontSize += 2
            },
            handleReduce() {
                if(this.fontSize < 40){
                    Toast({  
                        message: '亲，字体太小会损害眼睛哦',  
                        duration: 2000  
                    })
                }else{
                    this.fontSize -=2
                }
            },
            getTitles() {
                const id = this.article.article.bookId
                this.$axios.get(this.$api.getTitles + id).then((res) => {
                    this.titles = res.data    
                })
            },
            handleJump (isPrev) {
                const _this = this
               
                function getArticleByIndex() {
                    const item = _this.titles.find(item => item.index == _this.index)
                    const id = item._id
                    _this.getArticle(id)
                    _this.$router.push({
                        name: 'article',
                        params: {
                            id
                        }
                    }) 
                    
                }
                if(isPrev =='prev'){
                    if(this.index == 0){
                        Toast({  
                            message: '亲，已经是第一章了哦',  
                            duration: 2000  
                        })
                    }else{
                        this.index--;
                        getArticleByIndex()
                        this.$router.go(0)

                    }
                }else{
                    if(this.index == this.titles.length){
                        Toast({  
                            message: '亲，已经读完了呢',  
                            duration: 2000  
                        })
                    }else{
                        this.index++;
                        getArticleByIndex()
                        this.$router.go(0)
                    }
                }
                
            },
            showTitles() {
                this.isShowTitles = true
                this.isActive = true
            },
            hideTitles() {
                this.isActive = false
                this.isShowTitles = false
            },
            reload() {
                this.$router.go(0)
                this.isShowTitles = false
            },
           
        },
        
        created() {
            this.getArticle().then(()=>{
                this.getTitles()
            })
            
        },
    }
    //父传子
    // 
</script>
<style scoped lang="scss" src="./index.scss">    
</style>

<style lang="scss">
    @import './markdown.scss';
</style>