<template>
  <div class="drafList_layout">
    这里是我的草稿
    <div v-for="(item, index) in msg" :key = "index">
        <Article :articleInfo = "item"></Article>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {drafList} from '../request/api'
import Article from '../common/article'
export default {
  name: "drafList",
  components:{
      Article
  },
  data(){
      return{
          msg:[],
      }
  },
  computed: {
    ...mapState(['tdata'])
  },
  mounted() {
        drafList(this.tdata.name).then(res => {
            this.msg = res.data.msg
        }).catch(() => {
            console.log('失败啦')
        })
  }
};
</script>

<style>
.drafList_layout{
  font-size:0.3rem
}
</style>
