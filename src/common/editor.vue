<template>
    <div>
        <p>{{process}}</p>
        title:<input type="text" v-model="inputTitle">
        <div ref="editor"></div>
        <button @click="submit">提交</button>
    </div>
</template>

<script>
import{submit,createDraf,showDraf} from '../request/api'
import E from 'wangeditor'
export default {
    name:'editor',
    data(){
        return {
            inputTitle:'',
            editor:{},
            html:'',
            process:'',
            token:''
        }
    },
    props:['msg'],
    computed:{
        editorHtml(){
            return this.editor.txt.html()
        }
    },
    watch:{
        html(newVal,oldVal){
            setTimeout(() =>{
                if(newVal == this.html){
                    this.createDraf()
                }
            },2000)
        }
    },
    mounted(){
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.uploadImgServer = 'http://localhost:3000/edit'
        this.editor.customConfig.uploadImgTimeout = 20000
        this.editor.customConfig.onchange = (html) => {
            this.process = '保存中...'
            this.html = html
        }
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'justify',  // 对齐方式
            'emoticon',  // 表情
            'image',  // 插入图片
            'video',  // 插入视频
            'code',  // 插入代码
        ]
        this.editor.create()
        this.showDraf()
    },
    methods:{
        submit(){
            submit(this.$route.params.id,this.html || this.editorHtml,this.inputTitle,this.msg,Date.now(),1).then(res => {
                this.html = ''
                this.$router.push('/person/articleList')
            }).catch(() => {
                console.log('失败啦')
            })
        },
        createDraf(){
            if(!this.$route.params.id){
                return 
            }
            createDraf(this.$route.params.id,this.html || this.editorHtml,this.inputTitle || '未命名',this.msg,Date.now(),0).then(res => {
                this.process = '已经保存到草稿箱里了'
                console.log(res)
            }).catch(() => {
                console.log('失败了')
            })
        },
        showDraf(){
            showDraf(`${this.$route.params.id}`).then(res => {
                this.editor.txt.html(res.data.msg[0].article)
                this.inputTitle = res.data.msg[0].title
                this.user = res.data.msg[0].user    
            }).catch(() => {
                console.log('失败了')
            })
        }
    }
}
</script>

<style>

</style>
