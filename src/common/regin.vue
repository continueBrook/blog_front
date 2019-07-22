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
                        <input type="text" v-model='user' @keydown.enter="regin" @blur="user_blur" @focus="user_focus" class="inputType" :class="user_arr.indexOf(user_info) == -1?'':'fontColor'" :placeholder="user_info"><br/>
                        <input type="password" v-model='pass' @keydown.enter="regin" @blur="pass_blur" @focus="pass_focus" class="inputType" :class="pass_arr.indexOf(pass_info) == -1?'':'fontColor'" :placeholder="pass_info"><br/>
                        <Verticate @toParent="verificateType($event)"></Verticate>
                        <div @click="regin" class="login_btn">注册</div>
                        <div class="user_err" v-show="user_err">{{user_err}}</div>
                    </div>
                    <div class="jump">
                        注册过了,去登陆吧
                        <router-link to="/login">登陆</router-link>
                    </div>
                    <div class="continue">你还可以继续了解我</div>
                </div>
            </div>
        </div>    
</template>

<script>
import {regin} from '../request/api'
export default {
    name:'regin',
    components:{
        Verticate: () => import('./verificate')
    },
    data(){
        return{
            user:'',
            pass:'',
            user_info:'用户名',
            pass_info:'密码',
            user_arr:[],
            pass_arr:[],
            user_err:'',
            pass_err:'',
            isNormal:false
        }
    },
    methods:{
        user_blur(){
            if(this.user ==''){
                this.user_info = '用户名不能为空'
                this.user_arr.push('用户名不能为空')
            }else if(this.user.length > 10){
                this.user = ''
                this.user_info = '用户名过长'
                this.user_arr.push('用户名过长')
            }
        },
        pass_blur(){
            if(this.pass == ''){
                this.pass_info = '密码不能为空'
                this.pass_arr.push('密码不能为空')
            }else if(this.pass.length > 10){
                this.pass = ''
                this.pass_info = '密码过长'
                this.pass_arr.push('密码过长')
            }
        },
        user_focus(){
            this.user_info = ''
        },
        pass_focus(){
             this.pass_info = ''
        },
        regin(){
            if(this.user != '' && this.pass !='' && this.pass.length < 10 && this.user.length < 10 && this.isNormal){
                regin(this.user,this.pass).then(res => {
                    this.user = ''
                    this.pass = ''
                    this.user_info = '用户名'
                    this.pass_info = '密码'
                    if(res.data.err == 'user'){
                        this.user_err = res.data.msg
                    }
                }).catch(() => {
                    console.log('出错了')
                })
            }
        },
        verificateType($event){
            this.isNormal = $event
        }
    }
}
</script>

<style lang="scss">
@import '../scss/login.scss'
</style>

