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
        var startPos = null;
        var endPos = null;
        function link(scope, element, attrs) {
            $(element).sortable({
//                items: "li",
//                placeholder: ".ui-state-highlight",
                start: function(event, ui) {
                    startPos = ui.item.index();
                    console.log(startPos);
                },
                stop: function(event, ui) {
                    endPos = ui.item.index();
                    console.log(endPos);
                    var temp = scope.sortableArray[startPos];
                    scope.sortableArray.splice(startPos, 1);
                    scope.sortableArray.splice(endPos,0,temp);
                }
            });
//            $(element).disableSelection();
        }
        return {
            link: link
        }
    }
})();