"use strict";

angular
    .module('glanz')
    .config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider'];

function routes($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
   
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/features/home/home.view.html',
            controller: 'homeController as home'
        });


    $urlRouterProvider.otherwise('/')
}