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
router.beforeEach((to, from, next) => {
    const { shareUrl,id, avatarUrl,nickName,jwt} = to.query;
    const nextpath = to.path;
    console.log('to', to);
    let isIOS = function() {
        var isIphone = navigator.userAgent.includes('iPhone');
        var isIpad = navigator.userAgent.includes('iPad');
        return isIphone || isIpad;
    };
    const url = 'https://'+window.location.host+to.path;
    // console.log("路径", url, isIOS(), id, to.path, shareUrl);
    let sflag = false;
    if (to.name === '/answerDetail'|| to.name === '/answercomment' || to.name === '/answerQuestions') {
        sflag = true;
    }
    // sharewechat.shareReady(url,sflag);
    if (shareUrl) {
        const { shareUrl } = to.query;
        window.location.href="https://www.13cai.com.cn/api/v1/get_wxlogin?shareUrl="+shareUrl;
    } else if (id) {
        console.log('id', url);
        localStorage.setItem("userid",id);//缓存用户id
        localStorage.setItem('headimg',avatarUrl);//缓存用户头像
        localStorage.setItem('nickname',nickName);//缓存用户头像
        localStorage.setItem('jwt',jwt);//缓存用户头像
        axios.defaults.headers.common['Authorization'] = 'Bearer '+jwt ;
        sharewechat.shareReady(url, sflag);
        if (isIOS()) {
            if (to.path === '/index') {
                sharewechat.shareConfig(url);
                console.log("第一次");
                next(to.path);
            } else {
                next(to.path);
            }
        } else {
            sharewechat.shareConfig(url);
            console.log("每次");
            next(to.path);
        }
    } else {
        console.log('else', url);
        sharewechat.shareConfig(url, sflag);
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwt');
        next();
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