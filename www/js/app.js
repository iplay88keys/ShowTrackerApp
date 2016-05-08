// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var showTracker = angular.module('showTracker', ['ionic', 'ngCordova']);

showTracker.run(function($rootScope, $state, $ionicPlatform) {
    $rootScope.key = "";
    if(window.localStorage.getItem("key") !== undefined) {
        $rootScope.key = window.localStorage.getItem("key");
    }

    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        $state.go("watchlist");
    });
    
    $rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams, options) {
        console.log("here");
        console.log($rootScope.key);
        if ($rootScope.key == undefined || $rootScope.key == "") {
            // There is no key so redirect to /login
            if (toState.name != "login") {
                event.preventDefault();
                $state.go("login");
            }
        }
    });
});

showTracker.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
    .state('watchlist', {
        url: '/watchlist',
        templateUrl: 'templates/watchlist.html',
        controller: 'lstCtrl'
    });

    //$urlRouterProvider.otherwise('/watchlist');
});

showTracker.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
