angular.module('catalogo').controller('CatalogoController', ['$scope', '$routeParams', 'Catalogo',
    function($scope, $routeParams, Catalogo) {

        $scope.getCatalogo = function(){
            $scope.productos = Catalogo.query();
        };

        $scope.getProducto = function() {
            $scope.producto = Catalogo.get({
                sku: $routeParams.sku
            });
        }

    }
]);