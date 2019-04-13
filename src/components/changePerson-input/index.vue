<template>
    <div class="container">
        <div class="change-person-wraper">
            <div class="title" v-if="title">
                {{title}}
            </div>
            <input type="text" :value="value" :placeholder="placeholder" @change="handleChange" v-if="type=='text'">
             <input type="password" :value="value" :placeholder="placeholder" @change="handleChange" v-if="type=='password'">
        </div>    
    </div>
</template>

<script>
    export default {
        name: 'changPerson',
        props: {
            value: String,
            placeholder: String,
            title:String,
            type: {
                type: String,
                default: 'text'
            }
        },
        methods: {
            handleChange($event) {
                // console.log($event.target.value);
                
                this.$emit('input',$event.target.value)
                this.$emit('value',$event.target.value)
            }
        }
    }
</script>
<style lang="scss" src="./index.scss">
</style>