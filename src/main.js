import Vue from 'vue'
import App from './App.vue'
import './assets/reset.css';
import VModal from 'vue-js-modal';
import store from './store.js';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

Vue.use(VModal);