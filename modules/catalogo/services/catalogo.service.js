angular.module('catalogo').factory('Catalogo', ['$resource',
    function($resource){
        return $resource('http://api-ecommerce-aws.next-cloud.mx/v1.0/bekko.next-cloud.mx/products/:sku', {sku: '@sku'})
    }
]);