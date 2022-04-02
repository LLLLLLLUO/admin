import router from './router';

router.beforeEach((to, form, next) => {
  let token = sessionStorage.token;
  if (token) {
    if (to.path === '/login') {
      next(form.path);
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});

// export default router
