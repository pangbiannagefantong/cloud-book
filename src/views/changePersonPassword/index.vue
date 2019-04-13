<template>
    <div class="container">
        <div class="back">
            <i class="iconfont iconprev" @click="handleBack">返回</i>
            <span class="back-msg">修改密码</span>
        </div>
        <changePersonPasswordInput title="垃圾旧爱" type="password" placeholder="拜拜就拜拜" v-model="formData.password"></changePersonPasswordInput>
        <changePersonPasswordInput title="可爱新欢" type="password" placeholder="下一个会更乖" v-model="formData.changePassword"></changePersonPasswordInput>
        <Button type="danger" size="large" class="btn" @click="changePersonPassword">修改密码换对象</Button>
    </div>
</template>

<script>
    import changePersonPasswordInput from '@/components/changePerson-input'
    import {Button,Toast} from 'mint-ui'
    import validator from 'validator'

    export default {
        name: 'changePersonPassword',
        components: {
            changePersonPasswordInput,
            Button
        },
        data() {
            return {
                formData: {
                    password: '',
                    changePassword:''
                }    
            }
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg.user
            }

        },
        methods: {
            changePersonPassword(){
                let changePasswordLength = validator.isLength(this.formData.changePassword,{min:6,max:undefined})
                if(changePasswordLength){
                    this.$axios.post(this.$api.changePassword,this.formData).then(res =>{
                        if(res.code == 200){
                            Toast({
                                message: '新欢已到，重新登录查收',
                                duration: 1000
                            }),
                            localStorage.removeItem('token')
                            this.$store.commit('CHANGE_USERMSG',{})

                            setTimeout(() =>{
                                this.$router.replace('/login')
                            },1000)
                        }else{
                            Toast({
                                message: res.msg,
                                duration:1000
                            })
                        }
                    })
                }else{
                    Toast({
                        message: '输入最小为六位的密码啦',
                        duration: 1000
                    })
                }
                
            },
            savePassword() {
                this.formData.password = this.$store.state.userMsg.password
            },
            handleBack() {
                this.$router.push({
                    name: 'changePersonMsg'
                })
            },
        },
        created() {
            this.savePassword()
        }
    }
</script>
<style scoped lang="scss">
@import '../../globalCss/px2-rem.scss';
.back{
    background-color:rgb(42,163,255);
    display: flex;
    align-items: center;
    height: px-to-rem(80);
    margin: -50px -9px 40px -9px;

    .iconfont {
        font-size:16px;
        color:white;
    }
    .back-msg{
        color: white;
        margin-left: 114px;
        
    }
}
.btn{
    margin-top: 40px;
}
</style>