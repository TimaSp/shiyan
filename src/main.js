// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import wilddog from 'wilddog'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(iView);

const config = {
  syncURL: "https://ju21ly.wilddogio.com/",
  authDomain: "ju21ly.wilddog.com"
};
wilddog.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
