const express = require('express');
const authRoute = require('./auth.route');
const projectRoute = require('./project.route');
const subprojectRoute = require('./subproject.route');
const agendaRoute = require('./agenda.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/subproject',
    route: subprojectRoute,
  },
  {
    path: '/agenda',
    route: agendaRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
