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
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "loginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "profileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "homeController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "formController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();