/**
 * Application cluster
 */

var cluster = require('cluster'),
    os = require('os');

// start a cluster with 1 worker / cpu running the application:
if (cluster.isMaster) {
  var cpus = os.cpus().length;
  console.log('Starting application cluster with %d workers...', cpus);

  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // restart worker in case of failure:
  cluster.on('exit', function(worker) {
    console.log('Worker %d died. Starting new worker...', worker.process.pid);
    cluster.fork();
  });
}
else {
  require('./app');
}
