/*
 When the page loads, the startup screen should appear.
 Use the tictactoe-01-start.png mockup,
 and the start.txt HTML snippet to guide you.
 */

var gameModule;

gameModule = function (exports) {
    exports = {
        //Store the player Name
        playerName: "" ,
        //Store the Name of the Computer Player
        computerName: "Computer" ,
        //Store the location of the player 1
        player1: [] ,
        //Store the location of the Player 2
        player2: [] ,

        //Store all possible win pattern indexes on the board
        winPattern: [ 
                     [0,1,2],  //Horizontal Win Patterns
                     [3,4,5],  
                     [6,7,8],
                     [0,3,6],  //Vertical Win Patterns
                     [1,4,7],
                     [2,5,8],
                     [0,4,8],  //Diagonal
                     [2,4,6]
                    ]

    };

    //Check of the player name has a value
    exports.checkName = function () {
        $('#player-name').bind("blur" , function () {

            exports.playerName = $(this).val();
            //Display a red box indicating empty field
            if ( exports.playerName === "" ) {
                $(this).css("border" , "2px solid red");

            } else {
                //Green box indicating field not empty
                $(this).css("border" , "2px solid green");
                exports.startGame();
            }

        });
    };

    //Function to load the start page on load of the document
    exports.load_start = function () {
        var $div;
        //Hide the board
        $('#board').css("display" , "none");
        //Hide the finish page if navigating from finish to start
        $('#finish').css("display" , "none");
        //Add the attributes to the start page div
        $div = $("<div>").attr({
            class: "screen screen-start" ,
            id: "start"
        });
        //Append the player Name and Start game link to the header
        var $header = $("<header>");
        $header.append("<h2>Enter Player Name:</h2><input type='text' id='player-name'>");
        $header.append("<h1>Tic Tac Toe</h1>");
        $header.append('<a href="#" class="button">Start game</a>');
        $div.append($header);
        //Append the header to the body of the page
        $("body").append($div);
    };

    //Function to display the board on click of the start button
    exports.startGame = function () {
        $('#start').find('.button').on("click" , function () {
            //Hide the start page
            $('#start').css("display" , "none");
            //Start with the first player
            $('#player1').addClass("active");
            //Show the board  //Show a welcome message with the players name
            $("#board").css("display" , "block").find("header").append("<h3 id='welcome' style ='text-align:center'>Welcome to the game " + exports.playerName + "</h3>");
            //Hide the Welcome message after 5 seconds
            $("#welcome").fadeOut(5000 , function () {
            });
        });
    };
    //function to check the player move and call the checkWinner each move greater than 2
    exports.play = function (selection) {
        var board_o = $('.box.box-filled-1').length;
        var board_x = $('.box.box-filled-2').length;
        var value = 0;
        var $box = $('.box');
        for(var i = 0; i < $box.length; i++){ value += $('ul.boxes').children()[i].classList.length}
        $box.each(function () {
            var indexOfPlayer = $(this).index();
            //Get the index of both players selection
            if ( $(this).hasClass(selection) && selection == 'box-filled-1' ) {
                //Check if the value exist in the array before pushing the value
                if ( jQuery.inArray(indexOfPlayer , exports.player1) == -1 ) {
                    //If it doesn't exist push the value to the array
                    exports.player1.push(indexOfPlayer);
                }
            }
            if ( $(this).hasClass(selection) && selection == 'box-filled-2' ) {

                if ( jQuery.inArray(indexOfPlayer , exports.player2) == -1 ) {
                    exports.player2.push(indexOfPlayer);
                }
            }
        });

        //Check if o is the winner
        if(board_o >= 3 || board_x >= 3){
           var playerWin =  exports.checkWinner(exports.player1,exports.player2);
        }           
        if (playerWin == 1){
            exports.win('one');
        }
        if (playerWin == 2){
            exports.win('two');
        }
        if(board_x >= 4 && board_o >= 4 && value > 17 &&playerWin != 1 && playerWin != 2){
            exports.win('tie');
        }     

   };

    exports.checkWinner = function (player1, player2) {
        //Function to check the winner between player1 and 2 if 
        //No one wins send the draw if player 1 or two wins send the 
        //Playername and player ('one', 'two') 
        var winner1;
        var winner2;

        $.each(exports.winPattern, function(index, array){
            winner1 = array.length == player1.length && array.every(function(v,i) { 
                                return ($.inArray(v,player1) != -1)});
            winner2 = array.length == player2.length && array.every(function(v,i) { 
                                return ($.inArray(v,player2) != -1)});
            if(player1.length > 3){
                //Implement a check of 
                winner1 = array.every(function(v,i) { 
                                return ($.inArray(v,player1) != -1)});
            }
            if(player2.length > 3){
                winner2 = array.every(function(v,i) { 
                                return ($.inArray(v,player2) != -1)});
            }
            if(winner1){
                return false;
            }
            if(winner2){
                return false;
            }
        });
        if(winner1){
            return 1;
        }
        if(winner2){
            return 2;
        }

    };

    //Function to Switch between players 
    exports.changePlayer = function () {
        //Switch to the next player
        $(".players").each(function () {
            //If this selected player isn't active set it to active and remove the 
            //active class from the adjacent player and add class 'players-turn'
            if ( !$(this).hasClass("active") ) {
                $(this).addClass("active").addClass("players-turn");
            } else {
                $(this).removeClass("active").removeClass("players-turn");

            }
        });
    };

    //Remove Active class from all players
    exports.removeActive = function () {
        //Remove active class from players x and o
        $(".players").each(function () {
            $(this).removeClass("active").removeClass("players-turn");
        });
    };

    exports.win = function (value) {
        var $windiv;
        var player;
        if (value === "one"){
            player =  exports.playerName + ' WINS';
        }
        if (value === "two"){
            player =  exports.computerName + ' WINS';
        }
        if (value === "tie"){
            player = 'Its a Tie';
        }

        $('#board').css("display" , "none");
        $windiv = $("<div>").attr({
            class: "screen screen-win screen-win-" + value ,
            id: "finish"
        });
        var $header = $("<header>");
        $header.append("<h1>Tic Tac Toe</h1>");
        $header.append('<p class="message">' + player + '</p>');
        $header.append('<a href="#" class="button" onclick= gameModule.restart()>New game</a>');
        $windiv.append($header);
        $("body").append($windiv);
    };

    exports.restart = function () {
        window.location.href = window.location.pathname;
    };

    return exports;

}({} || gameModule);

$(function(){
    //Load the Start page on load
    gameModule.load_start();
    //Focus on the player name input
    $('#player-name').focus();
    //Play the game
    gameModule.checkName();

});

//
//Event to each player selected
$('.players').on("click", function(){
   gameModule.removeActive();
    //Add an active class to the current selected player
  $(this).addClass("active").addClass("players-turn");
});

//Store the classes of both x and o
//When the user selects x or o and clicks the boxes
//Display the selected element in the boxes

$('.box').click(function(){
    //Check the index of the selected element and return the class name selected
    var selection =  (($('.players.active').index() == 0) ? 'box-filled-1' :  'box-filled-2');
    //Check if the class contains more than one class e.g [box, box-filled1]
    if (this.classList.length != 1) {
        //Check if the classList doesn't contain the selection
        if (!this.classList.contains(selection)) {
            //remove the class selection
            $(this).removeClass(selection);
        }
    } else {
        //Add the class of selection
        $(this).addClass(selection);
        //Remove the appended image
        $(this).children().remove();
        //Switch to the the next player
        gameModule.changePlayer();
    }
     gameModule.play(selection);
}).hover(function(){
    //Show the image of the selected

    //Check the index of the selected element and return the class name selected
    var source =  (($('.players.active').index() == 0) ? 'img/o.svg' :  'img/x.svg');
    //Check if image already appended to the box
    if ($(this).children().length != 0) {
        $(this).children().remove();
    } else {
        //Check if the box already doesn't contain box-filled class
        if (this.classList.length == 1) {
            //If no image append the image of the selected player
            $(this).append('<img src =' + source + " height = \"100px\" width =\"100px\" >");
        }
    }
});


//When the user Presses the Back button restarts the game
window.onhashchange= function(e){
  if(e.newURL.length < e.oldURL.length){
    window.location.href = e.newURL;
  }
};
