/**
 * Created by spark on 6/2/2016.
 */
/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("sortableFields", [])
        .directive("sortableFields", sortableFields);

    function sortableFields() {
        var start = null;
        var end = null;
        function link(scope, element) {
            $(element).sortable({
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.sortableArray[start];
                    scope.sortableArray[start] = scope.sortableArray[end];
                    scope.sortableArray[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();