/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LibraryController", LibraryController);

    function LibraryController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
        $scope.lib = [
            {
                Name: 'Clue',
                Picture: 'https://cf.geekdo-images.com/images/pic884234.jpg',
                Description: 'The object of the game is to determine who murdered the victim, where the crime took place, and which weapon was used. Each player assumes the role of one of the six suspects, and attempts to deduce the correct answer by strategically moving around a game board representing the rooms of a mansion and collecting clues about the circumstances of the murder from the other players.',
                Min_Num_of_Players: 3,
                Max_Num_of_Players: 6,
                Min_Playing_Time: 15,
                Max_Playing_Time: 60,
                Min_Age: 8,
                Max_Age: '',
                Co_op: false,
                Strategy: false,
                Party: false,
                Classic: true,
                Worker_placement: false,
                Resource_management: false,
                Deck_building: false,
                Coolidge_Corner: true,
                Teele_Square: false
            },
            {
                Name: 'Risk',
                Picture: 'https://magisterrex.files.wordpress.com/2010/09/blogrisk2008.jpg',
                Description: 'Risk is a turn-based game for two to six players. The standard version is played on a board depicting a political map of the Earth, divided into forty-two territories, which are grouped into six continents. The object of the game is to occupy every territory on the board and in doing so, eliminate the other players. Players control armies with which they attempt to capture territories from other players, with results determined by dice rolls.',
                Min_Num_of_Players: 2,
                Max_Num_of_Players: 6,
                Min_Playing_Time: 60,
                Max_Playing_Time: 480,
                Min_Age: '',
                Max_Age: '',
                Co_op: false,
                Strategy: false,
                Party: false,
                Classic: true,
                Worker_placement: true,
                Resource_management: false,
                Deck_building: false,
                Coolidge_Corner: true,
                Teele_Square: false
            }
        ];
    }
})();