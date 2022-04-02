import router from './router/index.js';

router.beforeEach((to, form, next) => {
  let token = sessionStorage.token;
  if (token) {
    if (to.path === '/login') {
      next(form.path);
    } else {
      next();
    }
    next()
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
