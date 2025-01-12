import { RouteRecordRaw } from 'vue-router';
import ContactPage from '../views/pages/ContactPage.vue';
import ErrorNotFound from '../views/pages/ErrorNotFound.vue';
import IndexPage from '../views/pages/IndexPage.vue';
import LoginPage from '../views/pages/LoginPage.vue';
import MainLayout from '../views/layouts/MainLayout.vue';
import ProductsPage from '../views/pages/ProductsPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: IndexPage,
      },
      {
        path: '/contact',
        name: 'contact',
        component: ContactPage,
      },
      {
        path: '/products',
        name: 'products',
        component: ProductsPage,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
