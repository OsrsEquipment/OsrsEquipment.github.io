import Vue from 'vue';
import VueRouter from 'vue-router';
import DpsCalc from '../views/DpsCalc.vue';
import About from '../views/About.vue';
import DataManagement from '../views/DataManagement.vue';
import Target from '../views/Target.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'DpsCalc',
    component: DpsCalc,
  },
  {
    path: '/target',
    name: 'Target',
    component: Target,
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
