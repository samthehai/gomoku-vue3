import { createRouter, createWebHashHistory } from 'vue-router';
import Gomoku from '../views/Gomoku.vue';
import Home from '../views/Home.vue';

const routes: Array<any> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/gomoku",
    name: "Gomoku",
    component: Gomoku,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
