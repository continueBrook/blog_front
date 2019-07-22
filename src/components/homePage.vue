<template>
    <div class="layout">
        <Header></Header>
        <div class="wrapper_home">
            <div class="content_home">
                <div v-for="item in arr" :key="item.id" class="content">
                    <Article :articleInfo="item"></Article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {indexData} from '../request/api'
import Header from '../common/header'
import Article from '../common/article'
export default {
    name:'homePage',
    components:{
        Header,
        Article
    },
    data(){
        return{
            arr:[],
            n:0,
            msg:[]
        }
    },
    watch:{
        n(newVal,oldVal){
            if(!this.msg[0]){
                return
            }
            this.indexData((oldVal+1)*5,5)
        }
    },
    mounted(){
        this.indexData(0,5)
        window.addEventListener('scroll', this.handleScroll, true)
    },
    methods:{
        handleScroll(){
            // 页面滚动距顶部距离
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                    document.body.scrollTop
            let scroll = Math.round(scrollTop/100)
            if(this.n < scroll){
                this.n = scroll
            }
        },
        indexData(start,end){
            indexData(start,end).then(res => {
                this.msg = res.data.msg
                this.arr = this.arr.concat(res.data.msg)
            }).catch(() => {
                console.log('出错啦')
            })
        }
    }
}
</script>

<style lang="scss">
@import '../scss/homePage.scss';
</style>

