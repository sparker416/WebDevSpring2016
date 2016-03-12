/**
 * Created by spark on 3/10/2016.
 */
"use strict";
var library = [
    {
        "Name": "Clue",
        "Picture": "https://cf.geekdo-images.com/images/pic884234.jpg",
        "Description": "The object of the game is to determine who murdered the game's victim, where the crime took place, and which weapon was used. Each player assumes the role of one of the six suspects, and attempts to deduce the correct answer by strategically moving around a game board representing the rooms of a mansion and collecting clues about the circumstances of the murder from the other players.",
        "Min_Num_of_Players": 3,
        "Max_Num_of_Players": 6,
        "Min_Playing_Time": 15,
        "Max_Playing_Time": 60,
        "Min_Age": 8,
        "Max_Age": "",
        "Co_op": "",
        "Strategy": "",
        "Party": "",
        "Classic": true,
        "Worker_placement": "",
        "Resource_management": "",
        "Deck_building": "",
        "Coolidge_Corner": true,
        "Teele_Square": ""
    },
    {
        "Name": "Risk",
        "Picture": "https://magisterrex.files.wordpress.com/2010/09/blogrisk2008.jpg",
        "Description": "Risk is a turn-based game for two to six players. The standard version is played on a board depicting a political map of the Earth, divided into forty-two territories, which are grouped into six continents. The object of the game is to occupy every territory on the board and in doing so, eliminate the other players. Players control armies with which they attempt to capture territories from other players, with results determined by dice rolls.",
        "Min_Num_of_Players": 2,
        "Max_Num_of_Players": 6,
        "Min_Playing_Time": 60,
        "Max_Playing_Time": 480,
        "Min_Age": "",
        "Max_Age": "",
        "Co_op": "",
        "Strategy": "",
        "Party": "",
        "Classic": true,
        "Worker_placement": true,
        "Resource_management": "",
        "Deck_building": "",
        "Coolidge_Corner": true,
        "Teele_Square": ""
    }
];

(function() {
    var tr = "";
    var i = 0;

    tr = tr +
        "<tr>" +
        "<th>Name</th>" +
        "<th>Picture</th>" +
        "<th>Description</th>" +
        "<th>Number of Players</th>" +
        "<th>Playing Time</th>" +
        "<th>Age Range</th>" +
        "<th>Type(s)</th>" +
        "<th>Location</th>" +
        "</tr>";

    while (i < library.length) {
        tr = tr + "<tr>"
            + "<td>" + library[i].Name + "</td>"
            + "<td><img src='" + library[i].Picture + "' width='100px'/></td>"
            + "<td>" + library[i].Description + "</td>"
            + "<td>" + library[i].Min_Num_of_Players + "-" + library[i].Max_Num_of_Players + "</td>"
            + "<td>" + library[i].Min_Playing_Time + "-" + library[i].Max_Playing_Time + "</td>"
            + "<td>" + library[i].Min_Age + "-" + library[i].Max_Age + "</td>"
            + "<td>";
        if (library[i].Co_op !== "") {
            tr = tr + "Co-op<br>";
        } if (library[i].Strategy !== "") {
            tr = tr + "Strategy<br>";
        } if (library[i].Party !== "") {
            tr = tr + "Party<br>";
        } if (library[i].Classic !== "") {
            tr = tr + "Classic<br>";
        } if (library[i].Worker_placement !== "") {
            tr = tr + "Worker placement<br>";
        } if (library[i].Resource_management !== "") {
            tr = tr + "Resource management" + "<br>";
        } if (library[i].Deck_building !== "") {
            tr = tr + "Deck building";
        } else {
            tr = tr + "";
        }
        tr = tr + "</td>"
            + "<td>";
        if (library[i].Coolidge_Corner === true) {
            tr = tr + "Coolidge Corner<br>";
        } if (library[i].Teele_Square === true) {
            tr = tr + "Teele Square";
        } else {
            tr = tr + "";
        }
        tr = tr + "</tr>";
        i++;
    }
    document.getElementById("library_table").innerHTML = tr;
})();
