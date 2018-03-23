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
    const $url = 'http://192.168.1.116:1337';
    const openid= 'oR7BM5bSwd0SssGhYVs162zKxefQ';
    const nickname= '夏晨阳';
    const headimgurl= 'http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0';
    localStorage.setItem('headimg',headimgurl);
    const user_data = {
      "openid":openid,
      "nickName":nickname,
      "avtarUrl":headimgurl
    };
    this.$axios.get($url+'/wxuserinfo',{params:user_data}).then(function(res){
      localStorage.setItem("userid",res.data);
    }).catch(function(error){
      console.log(error);
    })
  }
  
})
