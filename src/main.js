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
    console.log('to', to, from);
    let isIOS = function() {
        var isIphone = navigator.userAgent.includes('iPhone');
        var isIpad = navigator.userAgent.includes('iPad');
        return isIphone || isIpad;
    };
    // console.log("路径", url, isIOS(), id, to.path, shareUrl);
    let sflag = false;
    if (to.name === '/answerDetail'|| to.name === '/answercomment' || to.name === '/answerQuestions') {
        sflag = true;
    }
    // sharewechat.shareReady(url,sflag);

    let _url = window.location.origin + to.fullPath;
    if (shareUrl) {
        const { shareUrl } = to.query;
        window.location.href="https://www.13cai.com.cn/api/v1/get_wxlogin?shareUrl="+shareUrl;
    } else if (id) {
        localStorage.setItem("userid",id);//缓存用户id
        localStorage.setItem('headimg',avatarUrl);//缓存用户头像
        localStorage.setItem('nickname',nickName);//缓存用户头像
        localStorage.setItem('jwt',jwt);//缓存用户头像
        axios.defaults.headers.common['Authorization'] = 'Bearer '+jwt;

        let url = 'https://'+window.location.host+from.path;
        sharewechat.shareReady(url, sflag);
        if (window.__wxjs_is_wkwebview !== true) {
            sharewechat.shareConfig(_url)
            next(to.path);
        }
        if (window.__wxjs_is_wkwebview === true) {
            alert('ios')
            _url = window.location.href.split('#')[0]
            sharewechat.shareConfig(encodeURIComponent(_url))
            next(to.path);
        }
    } else {
        if (window.__wxjs_is_wkwebview === true) {
            _url = window.location.origin + to.fullPath;
            sharewechat.shareConfig(encodeURIComponent(_url))
        } else {
            sharewechat.shareConfig(_url);
        }
        sharewechat.shareReady(_url, sflag);
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