module.exports = function(grunt) {
  // show elapsed time:
  require('time-grunt')(grunt);

  // load all Grunt tasks:
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'cfg': {
    },

    'copy': {
      'views': {
        'files': [
          {
            'expand': true,
            'cwd': 'views/',
            'src': ['**/*.dust', '!min/**/*.dust'],
            'dest': 'views/.min/'
          }
        ]
      },
      'fonts': {
        'files': [
          {
            'expand': true,
            'cwd': 'webroot/libs/bower/bootstrap/dist/fonts/',
            'src': '*',
            'dest': 'webroot/assets/fonts/'
          }
        ]
      }
    },

    'useminPrepare': {
      'options': {
        'dest': 'webroot/assets/',
      },
      'html': 'views/.min/**/*.dust'
    },

    'usemin': {
      'options': {
        'dirs': ['webroot/assets/'],
        'basedir': 'webroot/assets/'
      },
      'html': ['views/.min/**/*.dust'],
      'css': ['webroot/assets/css/**/*.css']
    },

    'rev': {
      'files': {
        'src': ['webroot/assets/**/*.{js,css}']
      }
    },

    'less': {
      'all': {
        'files': [{
          'expand': true,
          'cwd': 'webroot/less/',
          'src': '**/*.less',
          'dest': 'webroot/css/',
          'ext': '.less.css'
        }]
      }
    },

    'clean': {
      'views': {
        'files': [{
          'expand': true,
          'src': 'views/.min/**/*.dust'
        }]
      },
      'assets': {
        'files': [{
          'expand': true,
          'src': 'webroot/assets/**/*'
        }]
      },
      'less': {
        'files': [{
          'expand': true,
          'src': 'webroot/css/**/*.less.css'
        }]
      },
      'everythingelse': {
        'files': [{
          'src': ['node_modules/']
        }]
      }
    },

    'concurrent': {
      'runapp': {
        'tasks': ['nodemon:app', 'watch:less'],
        'options': {
          'logConcurrentOutput': true
        }
      },
      'runapp-optimized': {
        'tasks': ['nodemon:app-optimized', 'watch'],
        'options': {
          'logConcurrentOutput': true
        }
      },
      'runcluster': {
        'tasks': ['nodemon:cluster', 'watch:less'],
        'options': {
          'logConcurrentOutput': true
        }
      },
      'runcluster-optimized': {
        'tasks': ['nodemon:cluster-optimized', 'watch'],
        'options': {
          'logConcurrentOutput': true
        }
      },
      'build': {
        'tasks': [
          'copy',
          'less'
        ]
      }
    },

    'watch': {
      'less': {
        'files': ['webroot/less/**/*.less'],
        'tasks': ['clean:less', 'less']
      },
      'views': {
        'files': ['views/**/*.dust', '!views/.min/**/*.dust'],
        'tasks': ['build']
      }
    },

    'nodemon': {
      'options': {
        'cwd': __dirname
      },
      'app': {
      },
      'app-optimized': {
        'options': {
          'env': {
            'OPTIMIZED': 1
          }
        }
      },
      'cluster': {
        'options': {
          'file': 'cluster.js'
        }
      },
      'cluster-optimized': {
        'options': {
          'file': 'cluster.js',
          'env': {
            'OPTIMIZED': 1
          }
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:views',
    'clean:assets',
    'clean:less',
    'concurrent:build',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('app', function(target) {
    grunt.task.run(['build']);

    if (target == 'optimized') {
      grunt.task.run(['concurrent:runapp-optimized']);
    }
    else {
      grunt.task.run(['concurrent:runapp']);
    }
  });
  
  grunt.registerTask('cluster', function(target) {
    grunt.task.run(['build']);

    if (target == 'optimized') {
      grunt.task.run(['concurrent:runcluster-optimized']);
    }
    else {
      grunt.task.run(['concurrent:runcluster']);
    }
  });

  grunt.registerTask('default', ['app']);
};
