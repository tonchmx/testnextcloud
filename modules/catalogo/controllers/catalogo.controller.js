angular.module('catalogo').controller('CatalogoController', ['$scope', '$sce', '$routeParams', 'Catalogo',
    function($scope, $sce, $routeParams, Catalogo) {

        $scope.predicate = 'fecha_alta';
        $scope.reverse = true;

        $scope.sizes = [ {code: 1, name: 'n1'}, {code: 2, name: 'n2'}];
        $scope.update = function() {
            console.log($scope.item.code, $scope.item.name)
        };


        $scope.orders = [
            {predicate: 'fecha_alta', reverse:true, name: 'Ordenar por: Más recientes'},
            {predicate: 'sku', reverse:false, name: 'Ordenar por: Alfabéticamente A-Z'},
            {predicate: 'sku', reverse:true, name: 'Ordenar por: Alfabéticamente Z-A'},
            {predicate: 'price', reverse:false, name: 'Ordenar por: Menor a Mayor Precio'},
            {predicate: 'price', reverse:true, name: 'Ordenar por: Mayor a Menor Precio'}
        ];

        $scope.cambiarOrden = function(){
            $scope.predicate = $scope.orden.predicate;
            $scope.reverse = $scope.orden.reverse;
        };

        $scope.getCatalogo = function(){
            Catalogo.query().$promise.then(function(data){
                $scope.catalogo = data;
                $scope.productos = data.splice(0, 100);
            });
        };

        $scope.getProducto = function() {
            $scope.producto = Catalogo.get({sku: $routeParams.sku}, function(){
                if($scope.producto.review !== "NULL") {
                    $scope.producto.review = $sce.trustAsHtml($scope.producto.review);
                }
            });
        }

    }
]);