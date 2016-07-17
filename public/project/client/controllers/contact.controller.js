/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("ContactController", ContactController);

    function ContactController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();