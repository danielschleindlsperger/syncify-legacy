import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

console.log(window.location.search);

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
