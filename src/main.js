// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import libFlexible from 'lib-flexible/flexible.js'
import $ from 'jquery'
import axios from 'axios'
import tabnav from './components/tabnav'//全局tabnav
import VueResource from 'vue-resource'
import VueCountdown from '@xkeshi/vue-countdown'
Vue.component('countdown', VueCountdown);

//引入加载更多组件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);
Vue.use(VueResource);

//将全局变量挂载到vue实例上
axios.defaults.baseURL = 'https://www.13cai.com.cn/api/v1';
Vue.prototype.$axios = axios;

Vue.component("tabnav",tabnav);//全局注册tabnav组件；
/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{
      getQueryStringArgs:function(){
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;

        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            
            // decodeURIComponent解码
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            
            if (name.length) {
                args[name] = value;
            }
        }

        return args;
    }
  },
  mounted:function(){
    console.log(this.$axios.defaults.baseURL);
     let userobj = this.getQueryStringArgs();
     console.log(userobj);
     if(userobj.wxUser){
       localStorage.setItem("userid",userobj.wxUser);//缓存用户id
       localStorage.setItem('headimg',userobj.avatarUrl);//缓存用户头像
     }
    document.querySelector('body').addEventListener('touchmove',function (ev) {  
        event.preventDefault();  
        
    })
  }
  
})
// window.addEventListener('DOMContentLoaded', function () {
//   var Vue = window.Vue;
//   var VueCountdown = window.VueCountdown;

//   Vue.component('countdown', VueCountdown);

//   new Vue({
//     el: '#app',
//     data: function () {
//       var now = new Date();
//       var newYear = new Date(now.getFullYear() + 1, 0, 1);

//       return {
//         counting: false,
//         time: newYear - now,
//       };
//     },
//     methods: {
//       countdown: function () {
//         this.counting = true;
//       },
//       countdownend: function () {
//         this.counting = false;
//       },
//     },
//   });
// });