<template>
    <label class="ft-label">
        <slot name="icon">
            <i class="iconfont"></i>
        </slot>
        <input type="text" class="FtInput" v-model="currentValue" v-if="type==='text'" :placeholder="placeholder">
        <input type="password" class="FtInput" v-model="currentValue" v-if="type==='password'" :placeholder="placeholder">
        <slot name="right-code"></slot>
    </label>
</template>

<script>
    export default {
        name:'FtInput',
        data() {
            return {
                currentValue: this.value,
            }
        },
        props: {
            value: [String,Number],
            type: {
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            max: {
                type: Number
            }
        },
        watch: {
            currentValue (newValue, oldValue) {
                if(this.max){
                    if(newValue.length > this.max){
                        this.currentValue = oldValue
                    }
                }
                this.$emit('input',newValue)
            },
            value () {
                this.currentValue = this.value
            }
        },
    }
</script>
<style lang ="scss" src="./index.scss"></style>