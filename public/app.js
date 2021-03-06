var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
         
        .state('main', {
            templateUrl: 'main.html'
        })
         .state('main.dashboard', {
             url: '/dashboard',
             templateUrl: 'dashboard.html',
             controller: "dashboardController"
         })
        .state('main.recorddetail', {
            url: '/recorddetail/:recordid',
            templateUrl: 'recordetail.html',
            controller: 'recordetailController'
        })
        .state('main.assistant', {
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
routerApp.run(function ($state) {
    $state.go('login');
});

routerApp.controller('mainController', function ($scope, $http) {
    
});

routerApp.controller('dashboardController', function ($scope, $http) {
    $http.get('/api/events').
        success(function (data, status, headers, config) {
            $scope.dashboard = data;
        console.log(data);
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

    $scope.deletePerformanceData = function (id) {

        $http.delete('/api/performances/' + id).success(function (data, status, headers, config) {
            for (var i = 0; i < $scope.Songs.length; i++) {
                if ($scope.Songs[i]._id == id)
                    $scope.Songs.splice(i, 1);
            }
            //}).catch(function(err){
            // alert('failed');
            //});
         });
    }
    $scope.updatePerformanceData = function (p) {
        //alert('update record    !!!!!     ' + id +  "       title    !!!!!   " + title);

         console.log(p); return;


        $http.post('/api/performances/' + p).success(function (data, status, headers, config) {
            alert('updated');
        });
    }
    $http.get('/api/participants?selector={"eventid":"' + reocrdid + '"}').
      success(function (data, status, headers, config) {
          $scope.ParticipantInformation = data;
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
routerApp.controller('loginController', function ($window, $scope, $http, $state) {


    var Admin;
    $scope.LoginData = function () {
       
        Admin = "Admin";
        var UserName = "admin";
        var Password = "admin";
        if($scope.Username == UserName && $scope.Password == Password)
        {
            //$window.location.href = '#/home';
            $state.go('main.dashboard');
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

