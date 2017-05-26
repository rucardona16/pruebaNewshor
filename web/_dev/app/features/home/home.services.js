"use strict";

angular
    .module('homeModule')
    .factory('homeService', homeService);

homeService.$inject = ['$q', '$window', '$http', 'urlService'];

function homeService($q, $window, $http, urlService) {

    var vm = this;

    vm.PostClient = function (data) {
        var deferred = $q.defer();
        var req = {
            method: 'POST',
            url: urlService.PostClient(),
            data: data
        };
        $http(req).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.resolve(err);
        });
        return deferred.promise;
    };


    return {
        PostClient: vm.PostClient
    }
}