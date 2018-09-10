import Vue from 'vue';
import * as actions from './actions';

export default {
  state: {
    player: null,
    currentTrack: null,
  },
  mutations: {
    setPlayerInstance: (state, player) => {
      Vue.set(state, 'player', player);
    },
  },
  actions: {
    ...actions,
  },
};
