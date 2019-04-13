<template>
    <div class="resgiter container">
        <Logo />
        <div class="inputs">
            <FtInput  v-model="userData.phone" placeholder="快点输入手机号啦">
                <i class="iconfont iconshouji" slot="icon"></i>
            </FtInput>
            <FtInput  v-model="userData.password" placeholder="设置密码啦傻瓜" :type="isHide?'password':'text'">
                <i class="iconfont" :class="isHide?'iconmimabukejian':'iconyanjing'" slot="icon" @click="isHide = !isHide"></i>
            </FtInput>
            <FtInput  v-model="userData.code" :max=6 placeholder="看短信的验证码啦">
                <i class="iconfont iconyanzhengma" slot="icon" ></i>
                <Button slot="right-code" class="code-btn" @click="handleGetCode">{{codeBtnText}}</Button>
            </FtInput>
            
        </div>
        <Button type="primary" size="large" class="register-btn" @click="handleRegister ">立即注册</Button>
    </div>
</template>

<script>
    import Logo from '@/components/logo'
    import { Button } from 'mint-ui';
    import FtInput from '@/components/ft-input'
    import { Toast } from 'mint-ui'
    import validator from 'validator';

    export default {
        mame: 'register',
        components: {
            Logo,
            Button,
            FtInput,
            Toast
        },
        data() {
            return {
                userData: {
                    phone: '',
                    password: '',
                    code: ''
                },
                isHide: true,
                codeBtnText:"获取验证码",
                isSendCode: false,
                num:60,
            }
        },
        methods: {
            handleRegister() {
                let phoneStatus = validator.isMobilePhone(this.userData.phone,'zh-CN')
                let passwordLength = validator.isLength(this.userData.password,{min:6,max:undefined})
                if(phoneStatus&&passwordLength&&isSendCode){
                    this.$axios.post(this.$api.register, this.userData).then((res =>{
                        if(res.code == 200){
                            Toast({  
                                message: res.msg,  
                                duration: 1000  
                            })
                            setTimeout(() =>{
                                this.$router.push({
                                    name: 'login'
                                })
                            },1000)
                            
                        }else{
                            Toast({  
                                message: res.msg,  
                                duration: 1000  
                            })
                        }
                    }))
                }  else{
                        Toast({  
                            message: "肯定是手机号，密码，验证码其中的错啦",  
                            duration: 1000  
                        })
                    }   
                
            },
           
            handleGetCode() {
                if(validator.isMobilePhone(this.userData.phone,'zh-CN')){
                    this.isSendCode = true
                    let timer = setInterval(() =>{
                        this.num--
                        this.codeBtnText = `再次获取${this.num}s`
                        if(this.num == 0){
                            clearInterval(timer)
                            this.num == 60
                            this.isSendCode = false
                            this.codeBtnText = '获取验证码'
                        }
                    },1000)
                    this.$axios.post(this.$api.getCode,{phone:this.userData.phone}).then((res =>{
                        if(res.code == 200){
                            Toast({  
                                message: res.msg,  
                                duration: 1000  
                            })
                        }else{
                            Toast({  
                                message: res.msg,  
                                duration: 1000  
                            })
                        }
                    }))
                }else{
                    Toast({  
                            message: "不是合法的手机号，赶紧去买个电话卡",  
                            duration: 2000  
                        })
                }
                
            }
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>