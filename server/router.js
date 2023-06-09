const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getBuilds', mid.requiresLogin, controllers.Build.getBuilds);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Build.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Build.makeBuild);

  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', controllers.Build.notFound)
};

module.exports = router;
