/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, UserGameService) {
        $scope.$location = $location;

        $scope.search = search;
        $scope.searchGameForKeywords = searchGameForKeywords;

        var games = [];

        UserGameService
            .findAllGames()
            .then(function(response){
                games = response.data;
            });

        function searchGameForKeywords(keywords, game)
        {
            var terms = keywords.split(',');
            var descTerms = game.Description.split(' ');

            for(var t in terms){
                for(var d in descTerms){
                    if(terms[t]==descTerms[d]){
                        return true;
                    }
                }
            }
            return false;
        }

        function search(criteria)
        {
            var results = [];

            for(var g in games) {
                if (criteria.numPlayers && criteria.numPlayers>=games[g].Min_Num_of_Players && criteria.numPlayers<=games[g].Max_Num_of_Players){
                    if(criteria.keywords){
                        if(searchGameForKeywords(criteria.keywords, games[g])){
                            if((criteria.strategy && games[g].Strategy) ||
                                (criteria.party && games[g].Party) ||
                                (criteria.classic && games[g].Classic) ||
                                (criteria.worker && games[g].Worker_placement) ||
                                (criteria.resource && games[g].Resource_management) ||
                                (criteria.deck && games[g].Deck_building)){
                                if((criteria.CC && games[g].Coolidge_Corner) || (criteria.Teele && games[g].Teele_Square)){
                                    if(criteria.lowAge && criteria.lowAge>=games[g].Min_Age){
                                        if(criteria.playTime && criteria.playtime>=games[g].Min_Playing_Time && criteria.playtime<=games[g].Max_Playing_Time){
                                            results.push(games[g]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            $scope.results = results;
        }
    }
})();