import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import answerDetail from'@/components/answerDetail'

Vue.use(Router)

export default new Router({
  routes: [
   
    {path: '/',
    name: 'index',
    component: index
    },
    {
      path:'/answerDetail',
      name:'answerDetail',
      component:answerDetail
    }
  ]
})
