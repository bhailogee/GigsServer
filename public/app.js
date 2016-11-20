var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
         
        .state('home', {
            url: '/home',
            templateUrl: 'dashboard.html'
        })
         .state('dashboard', {
             url: '/dashboard',
             templateUrl: 'dashboard.html',
             controller: "dashboardController"
         })
        .state('recorddetail', {
            url: '/recorddetail/:recordid',
            templateUrl: 'recordetail.html',
            controller: 'recordetailController'
        })
        .state('assistant', {
            url: '/assistant',
            templateUrl: 'assistant.html',
            controller: 'assistantController'
        })
         .state('addassistant', {
             url: '/addassistant',
             templateUrl: 'addassistant.html'
         })
    .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginController'
    })
    $urlRouterProvider.otherwise('/login');
    //$locationProvider.html5Mode(true);
});

routerApp.controller('dashboardController', function ($scope, $http) {
    $http.get('/api/events').
        success(function (data, status, headers, config) {
            $scope.dashboard = data;
        });
});
routerApp.controller('recordetailController', function ($scope, $http, $stateParams) {
    var reocrdid = $stateParams.recordid;
    $http.get('/api/events?selector={"_id":"' + reocrdid + '"}').
      success(function (data, status, headers, config) {
          $scope.instituteData = data;
      });

    $http.get('/api/performances?selector={"eventid":"' + reocrdid + '"}').
      success(function (data, status, headers, config) {
          $scope.Songs = data;
      });

    $http.get('/api/participants?selector={"eventid":"' + reocrdid + '"}').
      success(function (data, status, headers, config) {
          $scope.ParticipantInformation = data;
          console.log(data);
      });

    var PictureInformation = [
        {
            pictureURL: 'img/user2.jpg'
        },
        {
            pictureURL: 'img/user.jpg'
        }
    ];

    $scope.PictureInformation = PictureInformation;



})
routerApp.controller('assistantController', function ($window,$scope, $http) {
    $http.get('/api/users?=').
      success(function (data, status, headers, config) {
          $scope.userData = data;
          console.log(data);
      });
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    $scope.insertData = function () {
        var id = makeid();
        $http.post('/api/users?selector=', {
            '_id': id,
            'imei': $scope.IMEI,
            'name': $scope.name,
            'password': $scope.password,
            'username': $scope.username
        })
        $window.location.href = '#/assistant';
    }
})
routerApp.controller('loginController', function ($window, $scope, $http) {
    var Admin;
    $scope.LoginData = function () {
       
        Admin = "Admin";
        var UserName = "admin";
        var Password = "admin";
        if($scope.Username == UserName && $scope.Password == Password)
        {
            $window.location.href = '#/home';
        }
        else {
            alert("User name and password does not match ! :(")
        }
    }

    function Logout() {
        Admin = "";
        $window.location.href = '#/login';
    }
    $scope.Admin = Admin;
})

