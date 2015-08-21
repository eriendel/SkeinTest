'use strict';

/**
 * @ngdoc overview
 * @name skeinTestApp
 * @description
 * # skeinTestApp
 *
 * Main module of the application.
 */
angular
  .module('skeinTestApp', [
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    OAuth.initialize('4Mra4gWqYgC5ILAX0unh2U_ehLU');
    App42.initialize("4c8e53b2d53c89ac17dfa46f7065a3fc9bfc7204f7f86aea60d837a42c5e395c","6dfe702141e93a91af4011eee961d3ee379cb043dfbe290ad0815824cfe1bc6d");

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
