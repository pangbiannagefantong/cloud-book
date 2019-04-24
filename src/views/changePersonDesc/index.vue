<template>
    <div class="container">
        <div class="back">
            <i class="iconfont iconprev" @click="handleBack">返回</i>
            <span class="back-msg">修改个性签名</span>
        </div>
        <div class="desc-msg">
            <changePersonDescInput :value="userMsg.desc || '客官，客官，留句话呗'"  @value="handleChange"></changePersonDescInput>
            <div class="content-desc">
                用一句话表达你的心情吧
            </div>
            <Button type="primary" size="large" class="btn" @click="handleSave">保存</Button>
        </div>
    </div>
</template>

<script>
    import changePersonDescInput from '@/components/changePerson-input'
    import {Button,Toast} from 'mint-ui' 

    export default {
        name: 'changePersonDesc',
        components: {
            changePersonDescInput,
            Button
        },
        data() {
            return {
                desc: ''
            }
        },
        computed: {
            userMsg() {
                return this.$store.state.userMsg
            }
        },
        methods: {
            handleBack() {
                this.$router.push({
                    name: 'person'
                })
            },
            handleChange(val) {
                this.desc = val
                console.log(this.desc);
            },
            handleSave() {
                this.$axios.post(this.$api.changeUserDesc,{desc:this.desc}).then(res =>{
                    if(res.code == 200){
                        Toast({
                            message: '有文化的个性签名修改好啦',
                            duration:1000
                        })
                        this.$store.dispatch('getUserMsg')
                        setTimeout(() =>{
                            this.$router.push('/changePersonMsg')
                        })
                    }else{
                        Toast({
                            message: res.msg,
                            duration:1000
                        })
                    }
                })
            },
            saveDesc() {
                this.desc = this.$store.state.userMsg.desc
            }
        },
        created() {
            this.saveDesc()
        }
    }
</script>
<style scoped lang="scss" src="./index.scss">
</style>