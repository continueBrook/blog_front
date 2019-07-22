<template>
     <div class="identify">
        <input type="text" v-model="verification" :placeholder="placeholder"  @keydown.enter="verification_keydown">
        <p v-text="randomNum" @click="getRandom"></p>
    </div>
</template>

<script>
export default {
    name:'Verticate',
    data(){
        return {
            verification:'',
            nums :["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K','L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x','y', 'z'],
            randomNum:'',
            placeholder:'请输入验证码'
        }
    },
    props:{
        cookieType:{
            type:Number
        }
    },
    mounted(){
        this.getRandom()
    },
    watch:{
        verification(newVal,oldVal){
            this.$emit('toParent',newVal)
        },
         cookieType(newVal,oldVal){
            this.verification = ''
            this.placeholder = '验证码已过期'
            console.log('验证码已过期')
            this.getRandom()
        }
    },
    methods:{
        getRandom(){
            this.randomNum = ""
            let numsLength = this.nums.length
            for(let a=0;a<4;a++){
                let b = this.nums[Math.floor(Math.random() * numsLength)]
                this.randomNum += b
            }
            document.cookie = `t=${this.randomNum};max-age=15`
        },
        verification_keydown(){
            this.$emit('toParentLogin',true)
        }
    }
}
</script>

<style lang="scss">
.identify {
    padding: 0.3rem 0;
    font-size:0.3rem;
    input{
        height:0.5rem;
        border:2px solid #ececec;
    }
    p {
        display: inline-block;
        font-size:0.4rem;
        margin-left:0.5rem;
        vertical-align: bottom;
        color:black;
        border: 2px solid #ececec;
        letter-spacing:0.1rem;
    }
}
</style>
