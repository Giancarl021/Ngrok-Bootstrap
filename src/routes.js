const express = require('express');
const Controllers = require('./controllers');

const routes = express.Router();
const controllers = Controllers();

routes.get('/start', controllers.start);
routes.get('/stop', controllers.stop);
routes.get('/status', controllers.status);

routes.get(/^\/(?!app).*/, controllers.redirect);

module.exports = routes;