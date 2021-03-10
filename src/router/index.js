import Vue from 'vue';
import VueRouter from 'vue-router';
import DpsCalc from '../views/DpsCalc.vue';
import About from '../views/About.vue';
import DataManagement from '../views/DataManagement.vue';
import LoadoutManagement from '../views/LoadoutManagement.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'DpsCalc',
    component: DpsCalc,
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
  {
    path: '/loadouts',
    name: 'LoadoutManagement',
    component: LoadoutManagement,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
