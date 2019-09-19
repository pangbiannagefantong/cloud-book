<template>
    <div class="container">
        <Logo />
        <div class="inputs">
            <div class="username" >
                <FtInput placeholder="快点输入手机号" v-model="userData.phone">
                    <i class="iconfont iconuser" slot="icon" ></i>
                </FtInput>
            </div>
            <div class="password">
                <FtInput placeholder="密码啊" v-model="userData.password" :type="isHide?'password':'text'">
                    <i class="iconfont" :class="isHide?'iconmimabukejian':'iconyanjing'" slot="icon" @click="isHide = !isHide"></i>
                </FtInput>
            </div>
        </div>       
        <div class="register">
            <router-link :to="{name:'register'}">
                没有账号？立即注册
            </router-link>
        </div>
        <Button size="large" type="primary" class="login-button" @click="handleLogin">立即登录</Button>
    </div>
</template>

<script>
    import { Button,Toast } from 'mint-ui';
    import FtInput from '@/components/ft-input'
    import Logo from '@/components/logo'
    import validator from 'validator'

    export default {
        name:'login',
        components: {
            Button,
            FtInput,
            Logo,
            Toast
        },
        data() {
            return {
                userData: {
                    phone:'',
                    password:''
                },
                isHide:true
            }
        },
        methods: {
            handleLogin() {  
                let phoneStatus = validator.isMobilePhone(this.userData.phone,'zh-CN')
                // let passwordLength = this.userData.password
                console.log(passwordLength);
                
                let passwordLength = validator.isLength(this.userData.password,{min:6,max:undefined})
                // &&passwordLength
                if(phoneStatus&&passwordLength){

                    
                    this.$axios.post(this.$api.login,this.userData).then(res =>{
                    if(res.code == 200){
                        localStorage.setItem('token',res.data.token)
                        Toast({
                            message: "哈哈哈，登录进去了",
                            duration: 1000
                        })
                        setTimeout(() =>{
                            this.$router.push({
                                name: 'person'
                            })
                        })
                    }else{
                        Toast({
                                message: res.msg,
                                duration:1000
                            })
                        }   
                        
                    })
                }else{
                    Toast({
                        message:'输入正确的名字和密码啊'
                    })
                }
            },
        }
        
    }
</script>

<style scoped lang="scss" src="./index.scss">
</style>