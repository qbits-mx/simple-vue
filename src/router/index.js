import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import axios from 'axios';


import Home from '@/views/HomeView'
import PageNotFound from '@/views/PageNotFound'
import ThanksRegister from '@/views/ThanksRegister'
import ErrorPage from '@/views/ErrorPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home 
  },
  { 
    path: '/thanks', 
    name: 'thanks', 
    component: ThanksRegister 
  },
  { 
    path: '/error', 
    name: 'error', 
    component: ErrorPage 
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: PageNotFound 
  },

]


const router = createRouter({ 
  history: createWebHistory(), 
  scrollBehavior: () => ({ y: 0 }),
  routes 
})

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function checaJwt() {
}

router.beforeEach((to, from, next) => {
  
  axios.defaults.headers.common = {"X-CSRFToken": 'abc'};
  axios.defaults.headers.common = {"jwt": 'xyz'};
  checaJwt();
  //TODO: VALIDAR  EL JWT porque no tiene el valor de expire
  if (to.matched.some(record => record.meta.allowedRoles )) { // *** El recurso SI requiere autenticación ya que pide ciertos roles

  }
  next(); // *** El recurso NO requiere autenticación
})

export default router
