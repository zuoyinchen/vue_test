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

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component("tabnav",tabnav);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
