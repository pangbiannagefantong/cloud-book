<template>
    <div class="person">
        <div class="top-msg">
            <div class="login-msg" v-if="!this.token">
                <div class="login-msg-left">
                    <h2 @click="jumpLogin">立即登录</h2>
                    <div class="desc">可爱不是长久之计，可爱我是长久之计</div>
                </div>
                <div class="login-msg-right"  @click="jumpLogin">
                    <img src="../../assets/avatar.jpg" alt="avatar.jpg">
                    <i class="iconfont iconnext"></i>
                </div>
            </div>

            <div class="user-login-msg" v-else>
                <div class="user-login-msg-right"  >
                    <img v-if="userMsg.user" :src="userMsg.user.avatar || userAvatar" alt="user-avatar.jpg">
                </div>
                <div class="user-login-msg-left">
                    <h2 v-if="userMsg.user">{{userMsg.user.username||userMsg.user.phone}}</h2>
                    <div v-if="userMsg.user" class="user-desc">{{userMsg.user.desc||"大哥，相遇就是缘分，留句话呗"}}</div>
                </div>   
            </div>

            <div class="read-msg" v-if="this.token">
                <div class="read-msg-item">
                    <div class="item-col-1">
                        {{userMsg.read||24}}
                        <span class="small-title">本</span>
                    </div>
                    <div class="item-col-2">
                        已读书籍
                    </div>
                </div>
                <div class="read-msg-item">
                    <div class="item-col-1">
                        {{userMsg.collection||22}}
                        <span class="small-title">本</span>
                    </div>
                    <div class="item-col-2">
                        已收藏书籍
                    </div>
                </div>
                <div class="read-msg-item">
                    <div class="item-col-1">
                        {{userMsg.like||10}}
                        <span class="small-title">本</span>
                    </div>
                    <div class="item-col-2">
                        喜欢
                    </div>
                </div>
                <div class="line1"></div>
                <div class="line2"></div>
            </div>
        </div>
        
        <div class="bottom-msg" v-if="this.token">

            <div class="person-msg" @click="handleJump">
                <div class="iconfont iconxiugaixinxi"></div>
                <span class="change-person-msg">
                    修改个人信息
                </span>
                <div class="iconfont iconnext"></div>
            </div>

            <router-link to="collectBook">
                <div class="collect-book">
                    <!-- @click ="jumpCollectBook" -->
                    <div class="iconfont iconshoucang"></div>
                    <span class="collect-book-msg">收藏书单</span>
                    <div class="iconfont iconnext"></div>
                </div>
            </router-link>

            <div class="like-book">
                <div class="iconfont iconxihuan"></div>
                <span class="like-book-msg">喜欢的书</span>
                <div class="iconfont iconnext"></div>
            </div>

        </div>
        <div class="img" v-if="!this.token">
            <img :src="loginImg" alt="loginImg">
        </div>
        <Button size="large" type="danger" class="exit-btn" @click="handleExit" v-if="this.token">退出登录</Button>
    </div>
</template>

<script>
    import userAvatar from '@/assets/user-avatar.jpg'
    import loginImg from '@/assets/login.jpg'
    import { Button,Toast } from 'mint-ui';

    export default {
        name: 'person',
        data() {
            return {
                userAvatar,
                token: '',
                loginImg
            }
        },
        components: {
            Button
        },
        methods: {
            jumpLogin() {
                this.$router.push({
                    name:'login'
                })
            },
            handleExit() {
                // this.$store.state.userMsg = ''
                localStorage.removeItem('token')
                this.$store.commit('CHANGE_USERDATA', {})
                Toast({
                    message: "大哥，下次再来啊",
                    duration: 1000
                })
                this.$router.push({
                    name:'index'
                })
                this.$router.go(0)
            },
            handleJump() {
                this.$router.push({
                    name: 'changePersonMsg'
                })
            },
            // jumpCollectBook() {
            //     this.$router.push({
            //         name: 'collectBook'
            //     })
            // }
        }, 
        created() {
            this.token = localStorage.getItem('token')
            // console.log(this.token);
            
            if(this.token) {
                this.$store.dispatch('getUserMsg')
            }
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg
            }
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>