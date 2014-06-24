(function() {
  var app = angular.module('app', [
    'ui.router',
    'app.controllers',
    'app.services'
  ]);

  // define application states:
  app.config([
    '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $stateProvider
      .state('index', {
        'url': '/',
        'templateUrl': '/views/partials/index',
        'controller': 'IndexCtrl'
      });

      $urlRouterProvider.otherwise('/');
    }
  ]);

  // log state change errors:
  app.run([
    '$rootScope',
    function($rootScope) {
      $rootScope.$on('$stateChangeError', function() {
        console.log(arguments);
      });
    }
  ]);
})();
