/**
 * Attach Socket.IO to application
 */

var socketio = require('socket.io'),
    redis = require('redis'),
    routes = require('../routes');

module.exports = function(server) {
  var io = socketio.listen(server);

  io.configure(function() {
    var RedisStore = require('socket.io/lib/stores/redis');
    io.set('store', new RedisStore({
      'redisPub': redis.createClient(),
      'redisSub': redis.createClient(),
      'redisClient': redis.createClient()
    }));
  });

  io.sockets.on('connection', routes.socket);
};
