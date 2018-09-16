import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import { initAuth } from './modules/auth';

Vue.config.productionTip = false;

initAuth();

const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common.Authorization = token;
}

window.onSpotifyWebPlaybackSDKReady = () => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
};
