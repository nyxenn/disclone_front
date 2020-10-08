import Vue from 'vue'
import App from './App.vue'
import './assets/reset.css';
import VModal from 'vue-js-modal';
import store from './store.js';
import VueClipboard from "vue-clipboard2";
import VTooltip from "v-tooltip";

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

Vue.use(VModal);
Vue.use(VueClipboard);
Vue.use(VTooltip, {defaultDelay: 100, disposeTimeout: 500});