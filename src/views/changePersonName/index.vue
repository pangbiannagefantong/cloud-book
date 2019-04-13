<template>
    <div class="container">
        <div class="back">
            <i class="iconfont iconprev" @click="handleBack">返回</i>
            <span class="back-msg">修改昵称</span>
        </div>

        <div class="change-person-name">
            <changePersonNameInput :value="userMsg.username || userMsg.phone" @value="handleChange">
            </changePersonNameInput>
            <div class="desc">
                起一个好听到爆炸的名字吧
            </div>
            <Button type="primary" size="large" class="btn" @click="handleSave">保存</Button>
        </div>   
    </div>
</template>
<script>
    import changePersonNameInput from '@/components/changePerson-input'
    import {Button,Toast} from 'mint-ui'
    import {mapState,mapActions} from 'vuex'

    export default {
        name: 'changePersonName',
        components: {
            changePersonNameInput,
            Button,
            Toast,
        },
        data() {
            return {
                username: '',

            }
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg.user
            }

        },
        methods: {
            // ...mapActions(['getUserMsg']),
            handleChange(val) {
                this.username = val
                console.log(val,'val');
            },
            handleSave() {
                this.$axios.put(this.$api.changeUser,{username:this.username}).then(res =>{
                    if(res.code == 200){
                        Toast({
                            message: '好听到爆炸的名字改好了',
                            duration:1000
                        })
                        // this.getUserMsg()
                        this.$store.dispatch('getUserMsg')
                        setTimeout(() =>{
                            this.$router.push('/changePersonMsg')
                        },500)
                    }else{
                        Toast({
                            message: res.msg
                        })
                    }
                    
                    
                })
            },
            savePersonName() {
                this.username = this.$store.state.userMsg.username
            },
            handleBack() {
                this.$router.push({
                    name: 'changePersonMsg'
                })
            }
        },
        created() {
            this.savePersonName()
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>