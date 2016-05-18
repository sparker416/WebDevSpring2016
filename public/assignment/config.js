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
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                activeTab: "profile"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                activeTab: "admin"
            })
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                activeTab: "home"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                activeTab: "forms"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();