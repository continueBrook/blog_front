import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/homePage'
import edit from '../components/editPage'
import login from '../common/login'
import regin from '../common/regin'
import personPage from '../components/personPage'
import articleList from '../components/articleList'
import drafList from '../components/drafList'
import showArticle from '../components/showArticle'

Vue.use(Router)

export default new Router({
  routes:[{
    path:'/',
    redirect: {name:'home'}
  },{
    path:'/index',
    name:'home',
    component:home
  },{
    path:'/edit',
    name:'editPage',
    component:edit
  },{
    path:'/draf/:id',
    name:'editPage',
    component:edit
  },{
    path:'/login',
    name:'login',
    component:login
  },{
    path:'/regin',
    name:'regin',
    component:regin
  },{
    path:'/person',
    name:'personPage',
    component:personPage,
    children:[{
      path:'articleList',
      name:'articleList',
      component:articleList
    },{
      path:'drafList',
      name:'drafList',
      component:drafList
    }]
  },{
    path:'/showArticle/:id',
    name:'showArticle',
    component:showArticle
  },{
    path:'/personEdit',
    name:'personEdit',
    component: resolve => require(['../components/editPerson.vue'],resolve)
  }]
})