<template>
    <div class="layout_login">
        <div class="wrapper_scroll">
            <div class="control_scroll" ref="scroll">
                <div class="blank">
                </div>
                <div class="login">
                    <div class="logo">
                        blog
                    </div>
                    <input type="text" v-model='user' @blur="user_blur" @focus="user_focus" @keyup.enter="login" :placeholder="user_info" class="inputType" :class="user_info == '用户名不能为空'?'fontColor':''"><br/>
                    <input type="password" v-model='pass' @blur="pass_blur" @focus="pass_focus" @keyup.enter="login" :placeholder="pass_info" class="inputType" :class="pass_info == '密码不能为空'?'fontColor':''"><br/>
                    <Verticate :cookieType="cookieType" @toParent="verificateType($event)" @toParentLogin="verificateLogin($event)"></Verticate>
                    <div @click="login" class="login_btn">登陆</div>
                    <div class="user_err" v-show="user_err">{{user_err}}</div>
                    <div class="pass_err" v-show="pass_err">{{pass_err}}</div>
                </div>
                <div class="jump">
                    没有注册过？休想登陆
                    <router-link to="/regin">注册</router-link>
                </div>
                <div class="continue">你还可以继续了解我</div>
            </div>
        </div>
    </div>    
</template>

<script>
import {accountLogin} from '../request/api'
import {mapActions,mapState} from 'vuex'
import method from '../libs/method'
export default {
    name:'login',
    components:{
        Verticate:function(){
            return import('./verificate')
        }
    },
    data(){
        return{
            user:'',
            pass:'',
            user_info:'用户名',
            pass_info:'密码',
            user_err:'',
            pass_err:'',
            verticateNum:0,
            cookieType:0
        }
    },
    methods:{
        ...mapActions(['getTdata']),
        user_blur(){
            if(this.user == ''){
                this.user_info = '用户名不能为空'
            }
        },
        user_focus(){
            this.user_info = ''
        },
        pass_blur(){
            if(this.pass == ''){
                this.pass_info = '密码不能为空'
            }
        },
        pass_focus(){
            this.pass_info = ''
        },
        login(){
            this.user_err = ''
            this.pass_err = ''
            let t = method.cookieReg(document.cookie,'t').toLocaleLowerCase()
            if(!t){
                this.cookieType += 1 
                return
            }
            if(this.user !='' && this.pass !='' && t == this.verticateNum){
                accountLogin(this.user,this.pass).then(res => {
                    if(res.data.err == 'user'){
                        this.user_err = res.data.msg
                    }else if(res.data.err == 'pass'){
                        this.pass_err = res.data.msg
                    }
                    if(res.data.code == 1){
                        //this.$store.dispatch('getData',res.data)
                        this.$router.push('/')
                    }
                }).catch(() => {
                    console.log('失败啦')
                })
            }
        },
        verificateType($event){
            this.verticateNum = $event.toLocaleLowerCase()
        },
        verificateLogin($event){
            if($event){
                this.login()
            }
        }
    }
}
</script>

<style lang='scss'>
@import '../scss/login.scss'
</style>

