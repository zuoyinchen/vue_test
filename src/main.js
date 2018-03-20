// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import libFlexible from 'lib-flexible/flexible.js'
import $ from 'jquery'
import axios from 'axios'
import global_data from './components/global'//引入全局变量
import tabnav from './components/tabnav'//全局tabnav
import VueResource from 'vue-resource'
// 按需引入部分mint ui中的组件
import {CellSwipe} from 'mint-ui'
Vue.use(VueResource);
//将全局变量挂载到vue实例上
Vue.prototype.GLOBAL = global_data
Vue.prototype.$axios = axios;
Vue.component(CellSwipe.name,CellSwipe);
Vue.component("tabnav",tabnav);//全局注册tabnav组件；
/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{
    getBasetoken:function(){
        
        let base_data = {
          "grant_type":'client_credential',
          "appid":'wxdd66d0fb17f10a3f',
          "secret":'b78ac62d9a399570a2485dc90aa9141c'
        }
        
        
    }
  },
  mounted:function(){
    this.getBasetoken();
  }
  
})
