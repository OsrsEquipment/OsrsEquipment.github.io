import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import DataManagement from '../views/DataManagement.vue';
import Loadouts from '../views/Loadouts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Loadouts',
    component: Loadouts,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/data',
    name: 'DataManagement',
    component: DataManagement,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
