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
                activeTab: "profile"
            })
            .when("/api/assignment/user", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                activeTab: "profile"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                activeTab: "admin"
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
            .when("/fields", {
                templateUrl: "client/views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();