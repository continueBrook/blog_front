<template>
    <div class="wrapper">
        <div class="regin">
            <router-link to="/regin">注册</router-link>
        </div>
        <div class="login">
            <router-link to="/login" v-show="!tdata.code">登陆</router-link>
            <div v-show="tdata.code" @click="showBox">
                欢迎{{tdata.name}}
            </div>
        </div>
        <ul class="handle" v-show="tdata.code&&isShowBox">
            <router-link to="/">首页</router-link>
            <router-link to="/person/articleList">创作中心</router-link>
            <router-link to="/personEdit">个人中心</router-link>
            <logout></logout>
        </ul>
    </div>
</template>

<script>
import logout from './logout'
import {mapActions,mapState} from 'vuex'
export default {
    name:'Header',
    components:{
        logout
    },
    data(){
        return{
            isShowBox:false
        }
    },
    computed:{
        ...mapState(['tdata']),
    },
    mounted() {
        this.getTdata()
    },
    methods:{
        ...mapActions(['getTdata']),
        showBox(){
            this.isShowBox = !this.isShowBox
        }
    }
}
</script>

<style lang="scss">
    @import "../scss/header.scss";
</style>
