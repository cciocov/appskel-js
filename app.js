/**
 * Main application module
 */

var express = require('express'),
    http = require('http'),
    redis = require('redis'),
    RedisStore = require('connect-redis')(express),
    consolidate = require('consolidate');

// create:
var app = module.exports = express();
var server = http.createServer(app);

// should we run with optimizations on or not:
var optimized = (process.env.OPTIMIZED == 1 || app.get('env') == 'production');
if (optimized) {
  console.log('Optimized mode enabled.');
}

// configure:
app.engine('dust', consolidate.dust);
app.engine('min.dust', consolidate.dust);

app.set('view engine', (optimized ? 'min.dust' : 'dust'));
app.set('views', __dirname + '/views');

app.use(express.favicon());
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  'store': new RedisStore({
    'client': redis.createClient()
  }),
  'secret': 'session secret'
}));

if (optimized) {
  app.use('/appdata', express.static(__dirname + '/webroot/appdata'));
  app.use('/img', express.static(__dirname + '/webroot/img'));
  app.use(express.static(__dirname + '/webroot/assets'));
}
else {
  app.use(express.static(__dirname + '/webroot'));
}

if (app.get('env') == 'development') {
  app.use(require('connect-livereload')({
  }));
}

app.use(app.router);

// routing:
require('./cfg/urls')(app);

// attach socketIO:
require('./cfg/socketio')(server);

// start:
server.listen(3000, function() {
  console.log('Application running on port %d with PID %d.', 3000, process.pid);
});
