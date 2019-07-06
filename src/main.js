import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Snotify, { SnotifyPosition } from "vue-snotify";
import 'vue-snotify/styles/material.css';

Vue.config.productionTip = false

const options = {
  toast: {
    position: SnotifyPosition.centerTop,
    timeout: 1000,
    pauseOnHover: false,
    showProgressBar: false
  }
};

Vue.use(Snotify, options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
