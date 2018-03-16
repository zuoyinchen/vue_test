// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import libFlexible from 'lib-flexible/flexible.js'
import axios from 'axios'
Vue.prototype.$http = axios

// import alIcon from './assets/img/font_565417_dumdd6p9hgmbo6r/iconfont'
import tabnav from './components/tabnav'

import $ from 'jquery'


import global_data from './components/global'//引入全局变量



//将全局变量挂载到vue实例上
Vue.prototype.GLOBAL = global_data

Vue.config.productionTip = false

Vue.prototype.$axios = axios;


/* eslint-disable no-new */
Vue.component("tabnav",tabnav);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted:function(){
  	const udata ={
  		"appid":'wxa28c32dfe857e642',
  		"redirect_url": 'https://www.baidu.com',
  		"response_type":'code',
  		"scope": 'snsapi_userinfo',
  		"#wechat_redirect":''
  	}
  	this.GLOBAL.userid ='1222';
  	//console.log(this.GLOBAL.userid);
  }
})
