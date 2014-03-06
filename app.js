/**
 * Main application module
 */

var express = require('express'),
    http = require('http'),
    consolidate = require('consolidate');

// load application configuration:
var cfg = require('./cfg/config');

// create:
var app = module.exports = express();
var server = http.createServer(app);

// should we run with optimizations on or not:
var optimized = (process.env.OPTIMIZED == 1 || app.get('env') == 'production');
if (optimized) {
  console.log('Optimized mode enabled.');
}

// configure express:
app.engine('dust', consolidate.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views' + (optimized ? '/min' : ''));
app.enable('trust proxy');

app.use(express.favicon());
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

if (optimized) {
  app.use('/appdata', express.static(__dirname + '/webroot/appdata'));
  app.use('/img', express.static(__dirname + '/webroot/img'));
  app.use(express.static(__dirname + '/webroot/assets'));
}
else {
  app.use(express.static(__dirname + '/webroot'));
}

app.use(app.router);

// routing:
require('./cfg/urls')(app);

// attach socketIO:
//require('./cfg/socketio')(server);

// start:
server.listen(cfg.port, '127.0.0.1', function() {
  console.log(
    'Application running on port %d with PID %d.',
    cfg.port,
    process.pid
  );
});
