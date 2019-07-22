<template>
    <div>
        <div class="resBar">
            <span @click="thumbsUp(item_first)" v-show="user_thumbsUp.indexOf(item_first.commentId) == -1">
                <i class="iconfont icon-dianzan1"></i>
                <span v-show="item_first.thumbs !=0">{{item_first.thumbs}}</span>
            </span>
            <span @click="thumbsDown(item_first)" v-show="user_thumbsUp.indexOf(item_first.commentId) != -1">
                <i class="iconfont icon-dianzan1 color"></i>
                <span>{{item_first.thumbs}}</span>
            </span>
            <span class="btn" @click="showRes(item_first)" v-show="item_first.isShow_res % 2 == 0">
                <i class="iconfont icon-icon_reply"></i>
                <span>回复</span>
            </span >
            <span class="btn" @click="showRes(item_first)" v-show="item_first.isShow_res % 2">
                <i class="iconfont icon-icon_reply color"></i>
                <span>取消回复</span>
            </span>
            <span class="btn">
                <i class="iconfont icon-shanchu1"></i>
                <span @click="commentDelete(item_first)">删除</span>
            </span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {commentDelete,getThumbsUp,getThumbs,thumbsUp,thumbsDown} from '../request/api'
export default {
    name:'comment',
    props:{
        item_first:{
             type:Object
        }
    },
    data(){
        return {
            user_thumbsUp:[]
        }
    },
    computed: {
        ...mapState(['tdata'])
    },
    mounted(){
        this.getThumbsUp()
    },
    methods:{
        showRes(item){
            item.isShow_res +=1
        },
        getThumbsUp(){
            getThumbsUp(this.tdata.name).then(res =>{
                if(res.data.msg[0].thumbsList){
                    this.user_thumbsUp = res.data.msg[0].thumbsList.split(';')
                    this.user_thumbsUp.pop()
                }else{
                    this.user_thumbsUp = []
                }
            }).catch(() =>{
                console.log('失败啦')
            })
        },
        getThumbs(item){
            getThumbs(item.commentId).then(res =>{
                this.item_first.thumbs = res.data.msg[0].thumbs
            }).catch(() =>{
                console.log('失败啦')
            })
        },
        thumbsUp(item){
            if(!this.tdata.name){
                alert('请先登录')
                return 
            }
            thumbsUp(this.tdata.name,item.commentId).then(res =>{

            }).catch(() =>{
                console.log('失败啦')
            }).then(() =>{
                this.getThumbsUp()
                this.getThumbs(item)
            })
        },
        thumbsDown(item){
            if(!this.tdata.name){
                alert('请先登录')
                return 
            }
            thumbsDown(this.tdata.name,item.commentId).then(res =>{
            }).catch(() =>{
                console.log('失败啦')
            }).then(() =>{
                this.getThumbsUp()
                this.getThumbs(item)
            })
        },
        commentDelete(item){
            if(this.tdata.name != item.user){
                alert('您没有权限')
                return
            }
            commentDelete(item.commentId).then(res =>{
           
            }).catch(() =>{
                console.log('失败啦')
            }).then(() =>{
                this.$emit('deletToParent',item)
            })
        }
    }
}
</script>

<style>
</style>
