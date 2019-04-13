<template>
<div>
    <div class="back">
        <i class="iconfont iconprev" @click="handleBack">返回</i>
        <span class="back-msg">修改个人信息</span>
    </div>

    <div class="changePersonMsg">
        <ftUpload  @success="changeAvatar">
            <div class="changePersonMsg-avatar changePersonMsg-style" >    
                <div>头像</div>
                <div class="user-avatar-msg">
                    <img v-if="userMsg.user" :src="userMsg.user.avatar || userAvatar" alt="user-avatar.jpg" class="user-avatar" >
                    <span class="iconfont iconnext"></span>
                </div>    
            </div>
        </ftUpload>
        <router-link to="changePersonName">
            <div class="changePersonMsg-name changePersonMsg-style">
                <div>昵称</div>
                <div v-if="userMsg.user">
                    {{userMsg.user.username || userMsg.user.phone}}
                    <span class="iconfont iconnext"></span>
                </div>     
            </div>
        </router-link>
        <router-link to="changePersonDesc">
            <div class="changePersonMsg-desc changePersonMsg-style">
            <div>个性签名</div>
            <div v-if="userMsg.user">
                {{userMsg.user.desc ||' 客官客官，说句话嘛'}}
                <span class="iconfont iconnext"></span>
            </div>
        </div>
        </router-link>
        <router-link to="changePersonPassword"> 
            <div class="changePersonMsg-password changePersonMsg-style">
                <div>修改密码</div>
                <div class="iconfont iconnext" ></div>
            </div>
        </router-link>
        
    </div>
</div>
</template>
<script src="./axios.js"></script>
<script>
    import userAvatar from '@/assets/user-avatar.jpg'
    import ftUpload from '@/components/ft-upload'
    import { Toast } from 'mint-ui';

    export default {
        name: 'changePersonMsg',
        data() {
            return {
                userAvatar,
                token: '',
                Toast,
            }
        },
        components: {
           ftUpload
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg
            }
        },
        methods: {
            changeAvatar(url) {
                this.$axios.put(this.$api.changeUser,{avatar: url}).then(res =>{
                    if(res.code == 200){
                        this.$store.dispatch('getUserMsg')
                        Toast({
                            message: '换好的头像有点好看'
                        })
                        this.$router.go(0)
                    }   
                })
            },
            handleBack() {
                this.$router.push({
                    name: 'person'
                })
            }
             
        },
        
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>