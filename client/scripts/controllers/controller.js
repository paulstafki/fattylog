myApp.controller('AddhappyhourController', ["$scope", function($scope){
}]);

myApp.controller('UserController', ["$scope", '$http', function($scope, $http){
    $scope.currentUser = {};
    $scope.userOnLoad = function() {
        $http({
            url: "/username",
            method: 'GET'
        }).success(function (data) {
            $scope.currentUser = data;
        }).error(function () {
            console.log("error");
        });
    };
    $scope.userOnLoad();
    $scope.rank = $scope.currentUser.rank;
    $scope.incUserActivity = function(){
        var user = $scope.currentUser;
        user.useractivity += 1;
        console.log(user.rank);
        console.log(user.useractivity);
        switch (true){
            case (user.useractivity < 5):
                user.rank = "Newb";
                break;
            case (user.useractivity > 4 && user.useractivity < 10):
                user.rank = "Hoser";
                break;
            case (user.useractivity > 9 && user.useractivity < 20):
                user.rank = "Knob";
                break;
            case (user.useractivity > 19 && user.useractivity < 30):
                user.rank = "Jelly Donut";
                break;
            case (user.useractivity > 29 && user.useractivity < 40):
                user.rank = "Brewmeister Smith";
                break;
            case (user.useractivity > 39 && user.useractivity < 50):
                user.rank = "Mad Von Sydow";
                break;
            case (user.useractivity > 49 && user.useractivity < 60):
                user.rank = "Rosie LaRose";
                break;
            case (user.useractivity > 59 && user.useractivity < 70):
                user.rank = "Bob McKenzie";
                break;
            case (user.useractivity > 69 && user.useractivity < 80):
                user.rank = "Doug McKenzie";
                break;
            case (user.useractivity > 79 && user.useractivity < 100):
                user.rank = "Hosehead";
                break;
            case (user.useractivity > 99 && user.useractivity < 9999999):
                user.rank = "Admin?";
                break;
            default:
                user.rank = "newb";
        }
        console.log(user.rank);
        console.log(user.useractivity);
        $http({ url: '/incUser/' + user._id,
            method: 'PUT',
            data: user,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            console.log(res);
        }, function(error) {
            console.log(error);
        });
    };
}]);

myApp.controller("EstablishmentController", ['$scope', '$http', '$location', '$rootScope', 'EstablishmentService', function($scope, $http, $location, $rootScope, EstablishmentService){
    $scope.establishment = {};
    $scope.data = EstablishmentService.data;
    $scope.establishments = $scope.data.establishments;
    $scope.getEstablishments = function(){
        //EstablishmentService.getHappyHours($scope.zipcode).then(function(result){
        //    console.log(result);
        //    $location.path("results");        //mirrors the promise(.then) in the Est.Service below
        //});
        EstablishmentService.getHappyHours($scope.city);
        console.log(EstablishmentService.data.establishments);
        console.log('getEstablishments city ' + $scope.city);
    };
    $scope.reportFalse = function(note){        //PUT for flagging false HH info
        $http({ url: '/flag/' + note._id,
            method: 'PUT',
            data: note,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            alert("False information flagged - we'll get right on it, thank you!");
        }, function(error) {
            console.log(error);
        });
    };
    $scope.upvote = function(note){ //PUT for upvotes
        note.upvotes += 1;
        $http({ url: '/upvote/' + note._id,
            method: 'PUT',
            data: note,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            console.log(res);
        }, function(error) {
            console.log(error);
        });
    };
    $scope.downvote = function(note){        //PUT for downvotes
        note.downvotes += 1;
        $http({ url: '/downvote/' + note._id,
            method: 'PUT',
            data: note,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            console.log(res);
        }, function(error) {
            console.log(error);
        });
    };
}]);

myApp.factory('EstablishmentService', ['$http', '$location', function($http, $location){
    var data;
    data = {                    //data object
        establishments : []         //array contains data object
    };
    return {
        getHappyHours : function(param){
            console.log("Est Servive city " + param);          //functioned designed to allow passing in of city
            return $http.post('/happyhour/' + param).then(function(response){      //retrieves establishments
                data.establishments = response.data;
                console.log(response.data);       // console logs no longer needed
                $location.path("results");
            })
        },
        data : data
    };
}]);