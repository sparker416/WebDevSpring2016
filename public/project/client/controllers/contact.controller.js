/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("ContactController", ContactController);

    function ContactController($location, $window) {
        var vm = this;
        vm.$location = $location;

        vm.mail = mail;

        function mail(name, email, message){
            $window.location="mailto:sparker416@gmail.com?subject=Message%20from%20" + name + "%20at%20" + email +
                "&body=" +message;
        }
    }
})();