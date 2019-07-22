<template>
    <div class="layout">
        <Header></Header>
        <div class="person_wrapper">
            <div class="person_top">
                <router-link to="/person/articleList">我的文章</router-link>
                <router-link to="/person/drafList">我的草稿</router-link>
                <router-link to="/edit">写文章</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '../common/header'
export default {
    name:'personPage',
    components:{
        Header
    },
    mounted(){
        this.$store.dispatch('getUuid',this.uuid())
    }
}
</script>

<style lang="scss">
@import '../scss/personPage.scss';
</style>
