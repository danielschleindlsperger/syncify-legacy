import Vue from 'vue';
import Vuex from 'vuex';
import playerModule from './player';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player: playerModule,
  },
  strict: process.env.NODE_ENV !== 'production',
});
