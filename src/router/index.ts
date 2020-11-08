import { createRouter, createWebHashHistory } from 'vue-router';
import GomokuGame from '../views/GomokuGame.vue';
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
    component: GomokuGame,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
