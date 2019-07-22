<template>
    <div class="layout">
        <Header></Header>
        <div class="showArticle_wrapper">
            <p class="showArticle_user">{{msg.user}}</p>
            <div>标题：{{msg.title}}</div>
            <div v-html="msg.article"></div>
            <p class="showArticle_time">编辑于 {{day}}</p>
            <div class="showArticle_navigation">
                <div class="attitude" @click="agree">
                    <i class="iconfont icon-shangjiantou"></i>赞同{{agreeNum}}
                </div>
                <div class="attitude disagree" @click="disagree">
                    <i class="iconfont icon-xiajiantou"></i>反对{{disagreeNum}}
                </div>
                <div class="comment_number" @click="showComment" v-show="showNum%2 == 0">{{n}}条评论</div>
                <div class="comment_number" @click="showComment" v-show="showNum%2 != 0">收起评论</div>
            </div>
            <div v-show="showNum%2 != 0" class="showArticle_container">
                <div class="showArticle_topBar">{{n}}条评论</div>
                <div v-for="item_first in comment_first" :key="item_first.id" class="comment_list">
                    {{item_first.user}}
                    <div class="comment_content">
                        <p>{{item_first.content}}</p>
                        <Comment @deletToParent="deleteNum($event)" :item_first = "item_first"></Comment>
                        <div v-show="item_first.isShow_res % 2">
                            <input type="text" v-model="response[item_first.id]" class="comment_input" :placeholder="'回复'+item_first.user">
                            <button @click="sendRes(item_first)" class="comment_send" :disabled="response[item_first.id] ? false:true">发送</button>
                        </div>
                        <span @click="getComment_second(item_first)" class="class" v-show="item_first.isParent == 1 && item_first.isShow == 1">查看评论</span>
                        <span @click="hidComment(item_first,comment_second)" class="class" v-show="item_first.isParent == 1 && item_first.isShow != 1">关闭评论</span>
                    </div>
                    <div class="comment_content_2">
                        <div v-for="item_second in comment_second" :key="item_second.id" v-show="item_second.belongComment == item_first.commentId" class="comment_layout_2">
                            {{item_second.user}}回复{{item_second.belongUser}}:
                            <p>{{item_second.content}}</p>
                            <Comment @deletToParent="deleteNum($event)" :item_first = "item_second" ></Comment>
                            <div v-show="item_second.isShow_res % 2">
                                <input type="text" v-model="response[item_second.id]" class="comment_input" :placeholder="'回复'+item_second.user">
                                <button @click="sendRes(item_second,item_first)" class="comment_send" :disabled="response[item_second.id] ? false:true">发送</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="addComment">
                    <input type="text" v-model="comment" class="comment_input" placeholder="评论">
                    <button @click="postComment" class="comment_send">提交评论</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {articleShow,agree,agreeToggle,disagree,disagreeToggle,comment,getComment,getComment_second,response} from '../request/api'
import '../iconfont/iconfont.css'
import Vue from 'vue'
export default {
    name:'showArticle',
    components:{
        Header: () => import('../common/header'),
        Comment: () => import('../common/comment.vue')
    },
    data(){
        return{
            msg:{},
            n:0,
            showNum:0,
            isShowRes:0,
            response:[],
            comment:'',
            comment_first:[],
            comment_second:[],
            agreeNum:0,
            disagreeNum:0,
            agreeToggle:0,
            disagreeToggle:0,
        }
    },
    computed: {
        ...mapState(['tdata']),
        uuid_2(){
            return this.$store.state.uuid_2
        },
        dateTime(){
            return new Date(parseInt(this.msg.time)).toLocaleString().replace(/\//g,'-')
        },
        day(){
            let n = this.dateTime.indexOf(' ')
            return this.dateTime.substring(0,n)
        }
    },
    mounted(){
        articleShow(this.$route.params.id).then(res => {
            this.msg = res.data.msg[0]
        }).catch(() => {
            console.log('失败啦')
        })
        this.getComment()
    },
    methods:{
        agree(){
            this.agreeToggle +=1
            if(this.agreeToggle %2 == 1){
                agree(this.$route.params.id,this.tdata.name).then(res => {
                    this.agreeNum = res.data.msg[0].agreeList
                }).catch(() => {
                    console.log('失败啦呜呜')
                })
            }else{
                agreeToggle(this.$route.params.id,this.tdata.name).then(res => {
                    this.agreeNum = res.data.msg[0].agreeList
                }).catch(() => {
                    console.log('失败啦呜呜')
                })
            }
        },
        disagree(){
            this.disagreeToggle += 1
            if(this.disagreeToggle %2 == 1){
                disagree(this.$route.params.id,this.tdata.name).then(res => {
                    this.disagreeNum = res.data.msg[0].disagreeList
                }).catch(() => {
                    console.log('失败啦')
                })
            }else{
                disagreeToggle(this.$route.params.id,this.tdata.name).then(res => {
                    this.disagreeNum = res.data.msg[0].disagreeList
                }).catch(() => {
                    console.log('失败啦呜呜')
                })
            }
        },
        showComment(){
            this.showNum +=1
        },
        postComment(){
            this.$store.dispatch('getUuid_2',this.uuid())
            if(this.tdata =='' || this.tdata.code == 0){
                this.$router.push('/login')
                alert('请先登录去')
            }else{
                comment(this.tdata.name,this.$route.params.id,this.uuid_2,this.comment).then(res =>{
                    this.comment = ''
                    this.getComment()
                }).catch(() =>{
                    console.log('出错啦')
                })
            }
        },
        getComment(){
            getComment(this.$route.params.id).then(res =>{
                this.n = res.data.msg.length
                let arr = []
                res.data.msg.forEach(item =>{
                    if(item.belongId == null){
                        arr.unshift(item)
                        // this.comment_first.unshift(item)
                    }
                })
                this.comment_first = arr
                // let obj = {}
                // this.comment_first = this.comment_first.reduce((cur,next) => {
                //     obj[next.id] ? "" : obj[next.id] = true && cur.push(next)
                //     return cur
                // },[])
            }).catch(() =>{
                console.log('失败啦')
            })
        },
        getComment_second(item){
            item.isShow = 0
            getComment_second(item.commentId).then(res =>{
                this.comment_second.push(item)
                res.data.msg.forEach(item =>{ 
                    this.comment_second=this.comment_second.concat(item)
                    this.getComment_second(item)
                })
                //去重
                // this.comment_second = this.method.removeDuplicate(this.comment_second,'id')
                let obj = {}
                this.comment_second = this.comment_second.reduce((cur,next) => {
                    obj[next.id] ? "" : obj[next.id] = true && cur.push(next)
                    return cur
                },[])
                let data = this.method.data2json(this.comment_second)
                let arr = []
                data.forEach(item =>{
                    this.deepTraverse(item,arr)
                })
                this.comment_second = arr
            }).catch(() =>{
                console.log('失败啦')
            })
        },
        hidComment(item,comment){
            item.isShow = 1
            let arr = []
            comment.forEach((msg,index) =>{ 
                if(item.commentId == msg.belongComment){
                    arr.push(index)
                }
            })
            let n = arr.length
            comment.splice(arr[0],n)
        },
        sendRes(item,item_2){
            if(!this.tdata.name){
                alert('请先登录')
                return 
            }
            let belongComment = ''
            item.isShow_res +=1
            if(item_2){
                belongComment = item_2.commentId
            }else{
                belongComment = item.commentId
            }
            this.$store.dispatch('getUuid_2',this.uuid())
            response(this.tdata.name,this.$route.params.id,this.uuid_2,belongComment,item.commentId,item.user,this.response[item.id]).then(res =>{
                Vue.set(item,'isParent',1)
                this.response[item.id] = ""
                this.getComment()
                this.getComment_second(item)
            }).catch(() =>{
                console.log('出错啦')
            })
        },
        showRes(item){
            item.isShow_res +=1
        },
        deepTraverse(obj,arr){
            arr.push(obj)
            obj.children.forEach(item =>{
                this.deepTraverse(item,arr)
            })
        },
        deleteNum($event){
            if(!$event.belongId){
                this.getComment()
            }
            this.comment_second.forEach((item,key) =>{
                if(item.commentId == $event.commentId){
                    this.comment_second[key].content = '评论已被删除'
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '../scss/showArticle.scss';
</style>
