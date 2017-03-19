// public/js/appRoutes.js
angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $routeProvider, $locationProvider, $httpProvider) {

    // $routeProvider
    //
    //     // home page
    //     .when('/', {
    //         templateUrl: 'views/home.html',
    //         controller: 'MainController'
    //     })
    //
    //     // nerds page that will use the NerdController
    //     .when('/nerds', {
    //         templateUrl: 'views/nerd.html',
    //         controller: 'NerdController'
    //     });

    $stateProvider
        .state('user', {
            url: '/',
            controller: 'UserController as vm',
            templateUrl: 'views/user/user.html'
        })
        .state('patients', {
            url: '/allPatients',
            controller: "AllPatients as vm",
            templateUrl: 'views/allPatients.html',
            resolve: {
                allUsers: function ($http) {
                    return $http.get('/allUsers');
                }
            }
        });
    $locationProvider.html5Mode(true);

}]);


