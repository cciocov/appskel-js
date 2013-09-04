/**
 * Application URLs
 */

var routes = require('../routes');

module.exports = function(app) {
  app.get(
    '/',
    routes.home.index
  );
};
