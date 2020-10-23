import Vue from 'vue'
import App from './App.vue'
import './assets/reset.css';
import './assets/whitney.css';
import './assets/global.css';
import VModal from 'vue-js-modal';
import store from './store.js';
import VueClipboard from "vue-clipboard2";
import VTooltip from "v-tooltip";
import VueResizeText from "vue-resize-text";
import VueChatScroll from "vue-chat-scroll";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserFriends, faUser, faUsers, faUserTag, faUserPlus, faCommentAlt, faTrashAlt, faPlus, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
VueClipboard.config.autoSetContainer = true;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');

Vue.use(VModal);
Vue.use(VueClipboard);
Vue.use(VTooltip, {defaultDelay: 100, disposeTimeout: 500});
Vue.use(VueResizeText);
Vue.use(VueChatScroll);


// Font Awesome icons
library.add(faUserFriends, faUser, faUsers, faUserTag, faUserPlus, faCommentAlt, faTrashAlt, faPlus, faHashtag);
Vue.component('font-awesome-icon', FontAwesomeIcon);