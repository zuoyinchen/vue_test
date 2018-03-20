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
import VueCountdown from '@xkeshi/vue-countdown'
Vue.component('countdown', VueCountdown);
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
        //获取普通token
        // $.ajax({
        //   url:'https://api.weixin.qq.com/cgi-bin/token',
        //   data:base_data,
        //   type:'GET',
        //   dataType:'jsonp',
        //   beforeSend: function(xhr) {
        //       xhr.setRequestHeader("Access-Toke");
        //   },
        //   success:function(res){
        //     console.log(res);
        //   },
        //   fail:function(error,errorval){
        //     console.log(error);
        //   }
        // });
        // this.$http.post('https://api.weixin.qq.com/cgi-bin/token', base_data, {
        //     headers : {
        //         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        //     }
        // }).then(function(res){
        //   console.log(res);
        // });
        
    }
    // getPowertoken:function(){
    //   let data ={
    //     "appid":'wxdd66d0fb17f10a3f',
    //     "redirect_url": 'https://creek.xin/eguess',
    //     "response_type":'code',
    //     "scope": 'snsapi_userinfo',
    //     "#wechat_redirect":''
    //   }
    // }
  },
  mounted:function(){
    this.getBasetoken();
  }
  
})
