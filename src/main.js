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
// import wx from 'weixin-js-sdk'
import {MessageBox} from 'mint-ui';
import sharewechat from "./router/sharewechat";

Vue.component(MessageBox.name, MessageBox);
Vue.component('countdown', VueCountdown);

Vue.component("tabnav",tabnav);//全局注册tabnav组件；

//引入加载更多组件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);
Vue.use(VueResource);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'https://www.13cai.com.cn/api/v1';
// axios.defaults.baseURL = 'http://localhost:1337/api/v1';

router.beforeEach((to, from, next) => {
    const { id, avatarUrl,nickName,jwt,uniqueid } = to.query;
    if(localStorage.getItem('jwt') && localStorage.getItem('uniqueid')){
    
        next();
    }else{
        if (jwt) {
            console.log('jwt')
            localStorage.setItem("userid",id);//缓存用户id
            localStorage.setItem('headimg',avatarUrl);//缓存用户头像
            localStorage.setItem('nickname',nickName);//缓存用户头像
            localStorage.setItem('jwt',jwt);//缓存用户头像
            localStorage.setItem('uniqueid',uniqueid)
            axios.defaults.headers.common['Authorization'] = 'Bearer '+jwt;
            next();
        } else {
            console.log('redirect_url')
            // next('/get_wxlogin?redirect_url='+to.path);
            window.location.href="https://www.13cai.com.cn/api/v1/get_wxlogin?redirect_url="+to.path;
        }
       
    }
});

/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{
      
  },
  mounted:function(){
    console.log("全局挂载", localStorage.getItem('jwt'));
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwt');
  },
  beforeCreate:function(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwt');
    document.addEventListener('touchmove',function (ev) {  
        event.preventDefault();  
    })
  }
})