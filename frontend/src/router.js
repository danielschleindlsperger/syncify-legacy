import Vue from 'vue';
import Router from 'vue-router';
import RoomOverview from './views/RoomOverview.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: RoomOverview,
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import(/* webpackChunkName: "room" */ './views/Room.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
