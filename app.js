var mainApplicationModuleName = 'nextcloud';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'slick', 'LocalStorageModule', 'catalogo']);

mainApplicationModule
    .config(['localStorageServiceProvider',
        function(localStorageServiceProvider){
            localStorageServiceProvider
                .setPrefix('nextcloud');
        }
    ]);

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName])
});