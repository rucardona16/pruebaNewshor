'use strict';

angular
    .module('homeModule')
    .controller('homeController', homeController);

//Inject dependencies
homeController.$inject = ['$state', 'homeService', '$window', 'FileSaver', 'Blob'];

function homeController($state, homeService, $window, FileSaver, Blob) {

    $window.scrollTo(0, 0);
    var vm = this;
    vm.clients = null;
    var datos = {};

    vm.readRegistrado = function(file){
        datos.registrado = file.content.split(/\n/);
    }

    vm.readContenido = function(file){
        datos.contenido = file.content.split(/\n/);
    }

    vm.download = function() {
        homeService.PostClient(datos).then(function(data){
            var txt = data.data.toString().replace (/,/g,'\n');
            var datatxt = new Blob([txt], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(datatxt, 'RESULTADOS.txt');
        }, function(error){
            console.log(error);
        });
    };

}