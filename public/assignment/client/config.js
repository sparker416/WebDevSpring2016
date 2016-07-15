/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                activeTab: "profile",
                resolve: {
                    loggedin : checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                activeTab: "admin",
                resolve: {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/home",{
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                activeTab: "home"
            })
            .when("/forms", {
                templateUrl: "client/views/forms/forms.view.html",
                controller: "FormController",
                activeTab: "forms"
            })
            .when("/form/:formId/fields", {
                templateUrl: "client/views/forms/fields.view.html",
                controller: "FieldController"
            })
            .when("/fields", {
                templateUrl: "client/views/forms/fields.view.html",
                controller: "FieldController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

function checkLoggedIn($q, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get("/api/assignment/loggedin")
        .success(function(user){
            if(user != '0'){
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.currentUser = null;
                deferred.reject();
                $location.url("/login");
            }
        });
    return deferred.promise;
}

function checkIsAdmin($q, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get("/api/assignment/isAdmin")
        .success(function(user){
            if(user != '0'){
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url("/home");
            }
        });
    return deferred.promise;
}

