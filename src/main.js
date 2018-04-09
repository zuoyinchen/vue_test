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
// axios.defaults.baseURL = 'http://192.168.1.116:1337/api/v1';



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
    console.log(localStorage.getItem('jwt'));
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwt');
  },
  beforeCreate:function(){
      console.log("nihao");
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
     let userobj = getQueryStringArgs();
     userobj.id = '5ac195bae7b60f475ac6d66d';
     userobj.jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInd4dXNlcmluZm9zIjpbXSwic3RhclRvcGljIjpbXSwidG9BbnN3ZXIiOltdLCJzdGFyQW5zd2VyIjpbXSwiZnJpZW5kcyI6W10sImJlRnJpZW5kcyI6W10sImJldG9waWNzIjpbXSwidXNlcm5hbWUiOiI1NjJAZWd1ZXNzLmNvbSIsIm5pY2tOYW1lIjoiZm9yZ2V0IHlvdSAscmVtZW1iZXIgbWUiLCJhdmF0YXJVcmwiOiJodHRwOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvY3cxejd5U0ZiV0RpYVBlWnZpYnBSSUhac0hVVkZzNThsR0hTbmpYZlV5WWRnSlJKUmlhWWtDdzVDNVlFTXhBOEZnVTdXWUNNZER2c290NlNtQkhTMUJYVncvMTMyIiwiZW1haWwiOiI5MzZAZWd1ZXNzLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJENaYml1RnUxV1JBMTlHdGhYUG1hU081eE1QenZUc0pnejlLdEVTQlFnYU5rQzcwejRNOGtHIiwidGVtcGxhdGUiOiJkZWZhdWx0IiwibGFuZyI6ImVuX1VTIiwiY3JlYXRlZEF0IjoiMjAxOC0wNC0wNFQxMDozMzoxNi4yODZaIiwidXBkYXRlZEF0IjoiMjAxOC0wNC0wNFQxMDozMzoxNi4zMjJaIiwid3hVc2VySW5mbyI6IjVhYzRhOWVjM2ViZDg3ODg3N2UzZWI5MyIsImlkIjoiNWFjNGE5ZWMzZWJkODc4ODc3ZTNlYjkxIiwiaWF0IjoxNTIzMjM2NjQ0fQ.I7rzLRP1NFL49VzfJ27ujIazqr-bJhA_lIvtF20JYGM";
     if(userobj.id){
       localStorage.setItem("userid",userobj.id);//缓存用户id
       localStorage.setItem('headimg',userobj.avatarUrl);//缓存用户头像
       localStorage.setItem('nickname',userobj.nickName);//缓存用户头像
       localStorage.setItem('jwt',userobj.jwt);//缓存用户头像
       
     }
    document.addEventListener('touchmove',function (ev) {  
        event.preventDefault();  
        
    })
  }
  
})
