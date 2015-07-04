angular.module('catalogo').controller('CatalogoController', ['$scope', '$sce', '$routeParams', 'Catalogo', 'localStorageService', 'toaster',
    function($scope, $sce, $routeParams, Catalogo, localStorageService, toaster) {

        $scope.predicate = 'fecha_alta';
        $scope.reverse = true;
        $scope.orders = [
            {predicate: 'fecha_alta', reverse:true, name: 'Ordenar por: Más recientes'},
            {predicate: 'sku', reverse:false, name: 'Ordenar por: Alfabéticamente A-Z'},
            {predicate: 'sku', reverse:true, name: 'Ordenar por: Alfabéticamente Z-A'},
            {predicate: 'price', reverse:false, name: 'Ordenar por: Menor a Mayor Precio'},
            {predicate: 'price', reverse:true, name: 'Ordenar por: Mayor a Menor Precio'}
        ];

        $scope.total = 0;

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
        };

        $scope.agregarAlCarrito = function(sku){
            var formCantidad = this.cantidad;
            this.cantidad = null;
            if(formCantidad == null || formCantidad == 0){
                formCantidad = 1;
            }
            var producto = Catalogo.get({sku: sku}, function(){
                var carrolocal = localStorageService.get('carrito');
                if(carrolocal){
                    if(carrolocal[sku]){
                        carrolocal[sku].cantidad += formCantidad;
                    } else {
                        carrolocal[sku] = {
                            'sku': producto.sku,
                            'precio': producto.price,
                            'cantidad': formCantidad
                        };
                    }

                } else {
                    var carro = {};
                    carro[sku] = {
                        'sku': producto.sku,
                        'precio': producto.price,
                        'cantidad': formCantidad
                    };
                    carrolocal = carro;
                }
                toaster.pop('success', "Producto agregado", "¡El producto se agregó con éxito al carrito!");
                return localStorageService.set('carrito', carrolocal);
            });
        };

        $scope.getCarrito = function(){
            var carrito = localStorageService.get('carrito');
            var total = 0;
            for(var producto in carrito){
                if(carrito.hasOwnProperty(producto)){
                    var obj = carrito[producto];
                    var totalObj = obj.cantidad * obj.precio;
                    total += totalObj;
                }
            }
            $scope.carrito = carrito;
            $scope.total = total;
            $scope.sizeCarrito = Object.size(carrito);
        };

        $scope.eliminarProducto = function(sku){
            var carrolocal = localStorageService.get('carrito');
            delete carrolocal[sku];
            if(localStorageService.set('carrito', carrolocal)){
                toaster.pop('error', "Producto eliminado", "¡El producto se eliminó con éxito del carrito!");
                $scope.getCarrito();
            }
        };

        $scope.cambio = function(sku){
            var carrolocal = localStorageService.get('carrito');
            carrolocal[sku].cantidad = this.producto.cantidad;
            if(localStorageService.set('carrito', carrolocal)){
                $scope.getCarrito();
            }
        };

        Object.size = function(obj) {
            var size = 0, key;
            for(key in obj){
                if(obj.hasOwnProperty(key)) size++;
            }
            return size;
        }

    }
]);