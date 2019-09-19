<template>
    <div class="content-item" >
        <div class="content-item-row1">
            <h2 class="title">
                {{options.title}}
            </h2>
            <router-link to="#">更多...</router-link>
        </div>
        <div class="content-item-row2" v-for="(it,index) in options.books" :key="index">
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
                    <div class="article-looknums">+
                        {{it.looknums}}人在看
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contentItem',
    props: {
        options: Object,
    },
    created() {
        console.log(this.options,'9999');   
    }
}
</script>
<style scoped lang="scss">

@import '../../globalCss/px2-rem';

    .content-item{
        margin-top: 20px;
        .content-item-row1 {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 2px 0px 4px 10px;    
            border-left: 2px solid black;
            
        };
         .content-item-row2 {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            
            .content-img{
                width: px-to-rem(201);
                height: px-to-rem(267);
            }
            .article{
                flex: 1;
                padding-left: 10px;
                position: relative;
                .article-title{
                    font-size: 14px;
                    font-weight: 500;
                }
                .article-desc{
                    display: -webkit-box;
                    /* ! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on*/
                    -webkit-line-clamp:3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1.5;
                    margin-top: 10px;
                    font-size: 12px;
                    color:#555;
                }
                .article-msg{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #555;
                    position: absolute;
                    left: 10px;
                    bottom: 0;
                    right: 0;
                }
            }
        
         }
    }
    
   
</style>