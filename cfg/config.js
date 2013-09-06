/**
 * Application configuration
 */

var extend = require('extend');

var cfg = {
  'all': {
    'port': 3000
  },

  'development': {
  },

  'production': {
  }
};

// export the appropriate configuration based on environment:
module.exports = (function() {
  var env = process.env['NODE_ENV'] || 'development';
  return extend(true, {}, cfg['all'], cfg[env]);
})();
