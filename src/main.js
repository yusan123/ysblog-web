// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './reset.css';
import axios from 'axios';

Vue.use(ElementUI);

Vue.config.productionTip = false;
// axios.defaults.baseURL = "http://16od297707.wicp.vip/api" //部署到nginx
axios.defaults.baseURL = "http://localhost:8081/api" //本地调试
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
