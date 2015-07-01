angular.module('catalogo').factory('Catalogo', ['$resource',
    function($resource){
        return $resource('http://api-ecommerce-aws.next-cloud.mx/v1.0/demo.next-cloud.mx/products/:sku')
    }
]);