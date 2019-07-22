<template>
  <div class="articleList_layout">
    这里是我的文章
    <div v-for="(item, index) in msg" :key = "index" class="content">
        <Article :articleInfo = "item"></Article>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {articleList} from '../request/api'
import Article from '../common/article'
export default {
  name: "myArticle",
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
        articleList(this.tdata.name).then(res => {
            this.msg = res.data.msg
        }).catch(() => {
            console.log('失败啦')
        })
  }
};
</script>

<style lang="scss">
@import '../scss/articleList.scss'
</style>
