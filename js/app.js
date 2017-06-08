(function() {
    'use strict';


    
angular
    .module('app', [
    	/* servicios compartidos y dependencias */
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    ]);



angular
    .module('app').config(['$stateProvider', '$urlRouterProvider' , 
    function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state('maps', {
            url: '/',
            templateUrl: 'app/maps.html',

        });

    }]);

   
})();
