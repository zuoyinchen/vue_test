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
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
import {MessageBox} from 'mint-ui';

Vue.component(MessageBox.name, MessageBox);

Vue.component('countdown', VueCountdown);

//引入加载更多组件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);
Vue.use(VueResource);

//将全局变量挂载到vue实例上

axios.defaults.baseURL = 'https://www.13cai.com.cn/api/v1';
//axios.defaults.baseURL = 'http://192.168.1.116:1337/api/v1';



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
    
     let userobj = this.getQueryStringArgs();
     if(userobj.wxUser){
       localStorage.setItem("userid",userobj.wxUser);//缓存用户id
       localStorage.setItem('headimg',userobj.avatarUrl);//缓存用户头像
       localStorage.setItem('nickname',userobj.nickName);//缓存用户头像
     }
    document.querySelector('body').addEventListener('touchmove',function (ev) {  
        event.preventDefault();  
        
    })
  }
  
})
