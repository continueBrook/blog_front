<template>
    <div @click="show" class="article_layout">
        <h1 class="article_title">{{articleInfo.title}}</h1>
        <p ref="article">{{articleInfo.user}}：{{normalizeArticle}}</p>
        <p>{{day}}</p>
    </div>
</template>

<script>
export default {
    name:'Article',
    props:{
        articleInfo:{
            type:Object
        }
    },
    data(){
        return{
            day:''
        }
    },
    computed:{
        dateTime(){
            return new Date(parseInt(this.articleInfo.time)).toLocaleString().replace(/\//g,'-')
        },
        normalizeArticle(){
            return this.normalize(this.articleInfo.article)
        }
    },
    mounted(){
        let n = this.dateTime.indexOf(' ')
        this.day = this.dateTime.substring(0,n)
        if(this.$refs.article.textContent.length > 216){
            this.$refs.article.textContent = this.$refs.article.textContent.substring(0,216)+'...'
        }
    },
    methods:{
        show(){ 
            if(this.articleInfo.type == '0'){
                this.$router.push(`/draf/${this.articleInfo.drafid}`)
            }else if(this.articleInfo.type == '1'){
                this.$router.push(`/showArticle/${this.articleInfo.drafid}`)
            }
        },
        normalize(str){
            let a = str.replace(/<p>|<img [^>]*>|<br>|<\/p>|&nbsp;| /g,'')
            return a
        }
    }
}
</script>

<style lang="scss">
@import '../scss/article.scss'
</style>
