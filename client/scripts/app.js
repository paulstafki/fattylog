var myApp = angular.module('myApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/search', {
            templateUrl: "/assets/views/routes/search.html",
            controller: "EstablishmentController"
        }).
        when('/addhh', {
            templateUrl: "/assets/views/routes/addhh.html",
            controller: "UserController"
        }).
        when('/results', {
            templateUrl: "/assets/views/routes/results.html",
            controller: "EstablishmentController"
        }).
        otherwise({
            redirectTo: "/search"
        })
}]);