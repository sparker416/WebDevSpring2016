/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home.view.html",
                controller: "HomeController"
            })
            .when("/about", {
                templateUrl: "views/about.view.html",
                controller: "AboutController"
            })
            .when("/contact", {
                templateUrl: "views/contact.view.html",
                controller: "ContactController"
            })
            .when("/directions", {
                templateUrl: "views/directions.view.html",
                controller: "DirectionsController"
            })
            .when("/events", {
                templateUrl: "views/events.view.html",
                controller: "EventsController"
            })
            .when("/faq", {
                templateUrl: "views/faq.view.html",
                controller: "FAQController"
            })
            .when("/library", {
                templateUrl: "views/library.view.html",
                controller: "LibraryController"
            })
            .when("/login", {
                templateUrl: "views/login.view.html",
                controller: "LoginController"
            })
            .when("/news", {
                templateUrl: "views/news.view.html",
                controller: "NewsController"
            })
            .when("/pricing", {
                templateUrl: "views/pricing.view.html",
                controller: "PricingController"
            })
            .when("/profile", {
                templateUrl: "views/profile.view.html",
                controller: "GameController"
            })
            .when("/update", {
                templateUrl: "views/update.view.html",
                controller: "UpdateController"
            })
            .when("/register", {
                templateUrl: "views/register.view.html",
                controller: "RegisterController"
            })
            .when("/search", {
                templateUrl: "views/search.view.html",
                controller: "SearchController"
            })
            .when("/admin", {
                templateUrl: "views/admin.view.html",
                controller: "AdminController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();