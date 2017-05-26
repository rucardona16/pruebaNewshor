(function () {
    "use strict";

    angular
        .module('glanz')
        .factory('utilitiesService', utilitiesService);

    utilitiesService.$inject = [];

    function utilitiesService() {

        var vm = this;

        vm.getToday = function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            var today = yyyy + '-' + mm + '-' + dd;
            return today;
        }

        return {
            getToday: vm.getToday
        }

    }
})();