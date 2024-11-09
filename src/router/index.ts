import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isLogged = !!sessionStorage.getItem('token');

  switch (to.name) {
    case 'login':
      next();
      break;
    default:
      if (isLogged) {
        next();
      } else {
        next({ name: 'login' });
      }
      break;
  }
});

export default router;
