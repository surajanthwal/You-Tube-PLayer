// public/js/appRoutes.js
//configuration module listing all states and state's variables
angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $routeProvider, $locationProvider, $httpProvider) {
    $stateProvider
        .state('login',{
            url:'/',
            controller:'LoginController as vm',
            templateUrl:'views/login/login.html'
        })
        .state('user', {
            url: '/home',
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


