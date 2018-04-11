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
import wx from 'weixin-js-sdk'
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
// axios.defaults.baseURL = 'http://192.168.1.116:1337/api/v1';
router.beforeEach((to, from, next) => {
    console.log("href",router);
    console.log("to",to);
    console.log("from",from);
    const { shareUrl } = to.query;
    console.log("query",to.query);
    console.log("params",to.params);
    console.log(shareUrl);
    if (shareUrl) {
    const { shareUrl } = to.query;
        window.location.href="https://www.13cai.com.cn/api/v1/get_wxlogin?shareUrl="+shareUrl;
    } else {
        next();
    }
});
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
      
  },
  mounted:function(){
    console.log("全局mounted");
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwt');


  },
  beforeCreate:function(){
     let userobj = getQueryStringArgs();
     userobj.id = '5acaf0554b11af29530253da';
     userobj.jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInd4dXNlcmluZm9zIjpbXSwic3RhclRvcGljIjpbXSwidG9BbnN3ZXIiOltdLCJzdGFyQW5zd2VyIjpbXSwiZnJpZW5kcyI6W10sImJlRnJpZW5kcyI6W10sImJldG9waWNzIjpbXSwidXNlcm5hbWUiOiI1NjJAZWd1ZXNzLmNvbSIsIm5pY2tOYW1lIjoiZm9yZ2V0IHlvdSAscmVtZW1iZXIgbWUiLCJhdmF0YXJVcmwiOiJodHRwOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvY3cxejd5U0ZiV0RpYVBlWnZpYnBSSUhac0hVVkZzNThsR0hTbmpYZlV5WWRnSlJKUmlhWWtDdzVDNVlFTXhBOEZnVTdXWUNNZER2c290NlNtQkhTMUJYVncvMTMyIiwiZW1haWwiOiI5MzZAZWd1ZXNzLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJENaYml1RnUxV1JBMTlHdGhYUG1hU081eE1QenZUc0pnejlLdEVTQlFnYU5rQzcwejRNOGtHIiwidGVtcGxhdGUiOiJkZWZhdWx0IiwibGFuZyI6ImVuX1VTIiwiY3JlYXRlZEF0IjoiMjAxOC0wNC0wNFQxMDozMzoxNi4yODZaIiwidXBkYXRlZEF0IjoiMjAxOC0wNC0wNFQxMDozMzoxNi4zMjJaIiwid3hVc2VySW5mbyI6IjVhYzRhOWVjM2ViZDg3ODg3N2UzZWI5MyIsImlkIjoiNWFjNGE5ZWMzZWJkODc4ODc3ZTNlYjkxIiwiaWF0IjoxNTIzMjM2NjQ0fQ.I7rzLRP1NFL49VzfJ27ujIazqr-bJhA_lIvtF20JYGM";
     axios.defaults.headers.common['Authorization'] = 'Bearer '+userobj.jwt ;
     if(userobj.id){
       localStorage.setItem("userid",userobj.id);//缓存用户id
       localStorage.setItem('headimg',userobj.avatarUrl);//缓存用户头像
       localStorage.setItem('nickname',userobj.nickName);//缓存用户头像
       localStorage.setItem('jwt',userobj.jwt);//缓存用户头像
     }
    //  router.push('/index');
    document.addEventListener('touchmove',function (ev) {  
        event.preventDefault();  
    })
  }
})


//获取url参数
function getQueryStringArgs(){
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
Vue.prototype.getQueryStringArgs = getQueryStringArgs;

//公共分享
function commonShare(url){
    //微信js-sdk
    this.$axios.get('/wechat_share', { params: {url: url}}).then(res => {
        console.log(res);
        const appid = res.data.appId;
        const nonceStr = res.data.nonceStr;
        const signature = res.data.signature;
        const timestamp = res.data.timestamp;

        //配置微信js-sdk
        wx.config({
            debug: true, //
            appId: appid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        });

        wx.ready(function() {
            console.log("成功");
            wx.onMenuShareAppMessage({
                title: '筋灵十三猜', // 分享标题
                desc: '筋灵十三猜是一款竞猜的轻应用，问题和回答都很有趣，还在等什么，赶紧来加入吧', // 分享描述
                link: `${url}?shareUrl=`+url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://pic2.16pic.com/00/12/07/16pic_1207885_b.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log("成功");
                },
                cancel: function () {
                    console.log("取消");
                // 用户取消分享后执行的回调函数
                }
                });
        });
        wx.error(function(res) {
            console.log("失败");
        });

    }).catch((error) => {
        console.log(error);
    });
}
