exports.views = function(req, res) {
  var view = req.params[0];
  res.render(view);
};
