angular.module('catalogo').controller('CatalogoController', ['$scope', '$routeParams', 'Catalogo',
    function($scope, $routeParams, Catalogo) {

        $scope.predicate = 'price';
        $scope.reverse = false;
        $scope.catalogo = null;

        $scope.getCatalogo = function(){
            Catalogo.query().$promise.then(function(data){
                $scope.catalogo = data;
                $scope.productos = data.splice(0, 100);
            });
        };

        $scope.getProducto = function() {
            $scope.producto = Catalogo.get({
                sku: $routeParams.sku
            });
        }

    }
]);