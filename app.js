var mainApplicationModuleName = 'nextcloud';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'catalogo']);

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName])
});