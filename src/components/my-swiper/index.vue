<template>
<div>
    <swiper :options="swiperOption" ref="mySwiper" >  
        <swiper-slide v-for="(item,index) in swiperData" :key="index">
            <router-link :to="{name:'details',params:{id: item.book._id}}" class="swiper-img-wrap">
                <img :src="item.img" :alt="item.img" class="swiper-img">
            </router-link>
            <div class="title">{{item.title}}</div>
        </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</div>   
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: 'index',
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                swiperData: []
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            getSwiper (){
                this.$axios.get(this.$api.getSwiper).then(res =>{
                    this.swiperData = res.data
                    console.log(this.swiperData);
                }) 
            }
        },
        created() {
            this.getSwiper()
        }
    }
</script>

<style  lang="scss">

@import '../../globalCss/px2-rem.scss';

.swiper-img-wrap{
    display: block;
    height: px-to-rem(400);
    position: relative;
    // background: rgba(255,255,255,0.9);
    
}
.swiper-img{
    height: px-to-rem(400);
    width: 100%;
}
.title{
    height: 20px;
    color:white;
    background: rgba(0,0,0,0.5);
    position:absolute;
    left: 0;
    bottom:0;
    right: 0;
    padding: 4px;
    font-size: 16px;
}

</style>