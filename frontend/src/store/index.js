import Vue from 'vue';
import Vuex from 'vuex';
import playerModule from './player';
import authModule from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player: playerModule,
    auth: authModule,
  },
  strict: process.env.NODE_ENV !== 'production',
});
