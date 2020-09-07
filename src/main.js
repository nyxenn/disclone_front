import Vue from 'vue'
import App from './App.vue'
import './assets/reset.css';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(VModal);