'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found

        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path();
            var hasTrailingSlash = path[path.length - 1] === '/';
            if (hasTrailingSlash) {
                //if last charcter is a slash, return the same url without the slash  
                var newPath = path.substr(0, path.length - 1);
                return newPath;
            }

        });


        $urlRouterProvider
            .when('', '/campaigns')
            .when('/', '/campaigns');




        // Home state routing
        /*
        $stateProvider.
        state('home', {
            url: '/',
            templateUrl: 'modules/core/views/home.client.view.html'
        });
        */

    }
]);
