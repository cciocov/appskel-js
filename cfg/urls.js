/**
 * Application URLs
 */

var routes = require('../routes');

module.exports = function(app) {
  app.get(
    '/',
    routes.home.index
  );

  /**
   * Generic URLs
   */

  // render a view:
  app.get(
    /^\/views\/(.+)/,
    routes.generic.views
  );
};
