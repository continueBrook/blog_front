<template>
    <div class="wrapper_logout">
        <div @click="logout">退出登陆</div>
    </div>
</template>

<script>
import {logout} from '../request/api'
import {mapActions} from 'vuex'
export default {
    name:'logout',
    methods:{
        ...mapActions(['getTdata']),
        logout(){
            logout().then(res => {
                this.getTdata(res.data)
            }).catch(() => {
                console.log('失败啦')
            })
        }
    }
}
</script>

<style>
    .wrapper_logout{
        margin-top:0.2rem;
    }
</style>
