import Vue from 'vue';
import R from 'ramda';
import axios from 'axios';
import { nowMs } from '../utils';

const notNil = R.complement(R.isNil);

export default {
  state: {
    user: null,
    jwt: null,
    validUntil: 0, // unix timestamp in seconds
  },
  getters: {
    isLoggedIn: () => R.allPass([
      R.propSatisfies(notNil, 'user'),
      R.propSatisfies(R.lt(nowMs()), 'validUntil'),
    ]),
  },
  mutations: {
    setJwt(state, jwt) {
      Vue.set(state, 'jwt', jwt);
    },
    setValidUntilTimestamp(state, timestamp) {
      Vue.set(state, 'validUntil', timestamp);
    },
    setUser(state, user) {
      Vue.set(state, 'user', user);
    },
  },
  actions: {
    setToken({ commit }, { token, validUntil }) {
      commit('setJwt', token);
      commit('setValidUntilTimestamp', validUntil);
    },
    refreshToken() {
      console.log('Refreshing token...');
    },
    setUser({ commit, state }) {
      const instance = axios.create({});
      instance.defaults.headers.common.Authorization = `Bearer ${state.jwt}`;
      instance
        .get('/api/users/me')
        .then(({ data }) => {
          const { user } = data;
          commit('setUser', user);
        });
    },
  },
};
