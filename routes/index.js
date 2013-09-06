/**
 * Routes Loader
 */

var path = require('path'),
    fs = require('fs');

// compile a list of all available routes:
module.exports = (function f(dir) {
  var items = fs.readdirSync(dir),
      routes = {};

  for (var i = 0; i < items.length; i++) {
    var item_path = dir + '/' + items[i];

    if (item_path == __filename) {
      continue;
    }

    var stats = fs.statSync(item_path);

    if (stats.isDirectory()) {
      routes[items[i]] = f(item_path);
    }
    else {
      if (item_path.match(/\.js$/i)) {
        routes[path.basename(items[i], '.js')] = require(item_path);
      }
    }
  }

  return routes;
})(__dirname);
