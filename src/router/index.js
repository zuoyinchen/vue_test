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






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/singlepai',
      name:'singlepai',
      component: singlepai
    },
    {
      path:'/paihang',
      name:'paihang',
      component:paihang
    },
    {
      path:'/answerDetail',
      name:'answerDetail',
      component:answerDetail,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/answerQuestions',
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
    }
  ]
})
