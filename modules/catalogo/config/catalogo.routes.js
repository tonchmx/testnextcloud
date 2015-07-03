angular.module('catalogo').config(['$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/modules/catalogo/views/catalogo.view.html'
            })
            .when('/carrito', {
                templateUrl: '/modules/catalogo/views/carrito.view.html'
            })
            .when('/:sku', {
                templateUrl: '/modules/catalogo/views/producto.view.html'
            })
            .otherwise('/')
    }
]);