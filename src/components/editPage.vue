<template>
    <div class="layout">
        <Header></Header>
        <div class="edit_wrapper">
            <router-link to="/person/articleList">返回到个人页</router-link>
            <p>个人编辑写文章</p>
            <Editor :msg="this.tdata.name"></Editor>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'editPage',
    components:{
        Editor: () => import('../common/editor.vue'),
        Header: () => import('../common/header.vue')
    },
    computed:{
        ...mapState(['tdata']),
        count(){
            if(this.$route.params.id != undefined){
                this.$router.push(`/draf/${this.$route.params.id}`)
            }else if(this.$store.state.uuid){
                 this.$router.push(`/draf/${this.$store.state.uuid}`)
            }
            return this.$store.state.uuid
        }
    },
    mounted(){
        console.log(this.count)  //这里是必须的
    }
}
</script>

<style lang="scss">
@import '../scss/editPage.scss';
</style>


