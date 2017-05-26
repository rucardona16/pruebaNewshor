(function () {
    "use strict";

    angular
        .module('glanz')
        .factory('urlService', urlService);

    urlService.$inject = [];

    function urlService() {

        var vm = this;
        var endpoint = "http://localhost:8080"

        vm.PostClient = function () {
            return endpoint + '/client/searchClient';
        };

        return {
            PostClient: vm.PostClient
        }

    }
})();