// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';


import home from '../page/HomePage.vue';
// account
// import login from '@/page/account/LoginPage.vue';



// import { useUserStore } from '../../src/stores/user'
// import { usePlayersStore } from '../../src/stores/player';

const routes = [
  {
    path: '/',
    component: home,
    meta:{
      login: false
    }
  },
 
 
    
];



const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',  
  base:'/',
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const user = useUserStore()
//   const player = usePlayersStore()

//   if ( !user.isLogin && (to.path === '/myRecord'  )) {
//     next('/login')
//    }

 

//   if ( user.isLogin === true && (to.path === '/register' || to.path === '/login' || to.path === '/email_1' || to.path === '/email_2' )) {
//     next('/')
//   } else if (to.meta.login && !user.isLogin) {
//     next('/login')
//   }  
//   else if (to.meta.admin && !user.isAdmin) {
//     next('/')
//   } else {
//     next()
//   }

 

  
// })

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

export default router;
