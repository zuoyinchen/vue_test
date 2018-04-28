import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'

import answerDetail from'@/components/answerDetail'

import User from '@/components/user'
import Userproject from '@/components/userproject'
import Usercollect from '@/components/usercollect'
import Usercomp from '@/components/usercomp'
import Answer from '@/components/answer'
import paihang from '@/components/paihang'
import singlepai from '@/components/singlepai'
import answerQuestions from '@/components/answerQuestions'
import Message from '@/components/message'
import contactUs from '@/components/contactUs'
import answerComment from '@/components/answercomment'
import feedBack from '@/components/feedback'
import gamerule from '@/components/gamerule'


Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      title: '主页',
      meta:{
        pageTitle: '主页', 
        keepAlive: true
      },
      children:[
        {
          path:'/answerDetail/:eindex/:scrolltop/:topicid',
          name:'answerDetail',
          component:answerDetail
        },{
          path:'/answercomment/:answerid/:answerindex/:topicid',
          name:'answercomment',
          component:answerComment
        },{
            path:'/singlepai/:topicid',
            name:'singlepai',
            component: singlepai
        }
      ]
    },{
        path:"*",
        redirect:"/index"
    },
    {
      path:'/paihang',
      name:'paihang',
      component:paihang
    },
    {
      path:'/feedback',
      name:'feedback',
      component:feedBack
    },
    {
      path:'/answerQuestions/:frompage/:topicid',
      name:'answerQuestions',
      component:answerQuestions
    },
    {
      path: '/user',
      name: 'user',
      component:User
    },
    {
      path: '/userproject',
      name: 'userproject',
      component:Userproject
    },
    {
      path: '/usercollect',
      name: 'usercollect',
      component:Usercollect,
      children: [
        {
          path: '/usercollect/usercomp',
          component: Usercomp
        },{
          path: '/usercollect/answer',
          component: Answer
        }
      ]
    },
    {
      path: '/message',
      name: 'message',
      component:Message
    },
    {
      path:'/contactUs',
      name:'contactUs',
      component:contactUs
    },
    {
       path:'/gamerule',
       name: '/gamerule',
       component:gamerule
    }
  ]
})


