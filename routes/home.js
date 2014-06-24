var cfg = require('../cfg/config');

exports.index = function(req, res) {
  res.render('index', {
    'cfg': JSON.stringify({
    })
  });
};
