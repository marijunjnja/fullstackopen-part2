<!DOCTYPE html>
<html>
<!-- Author: Alex Tanner -->
<title>Concentration</title>
<head>
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
</head>
<body>
<script language="JavaScript">
	<!-- These prompts grab the player names and the size of the board. -->
	var player1name = prompt("Player 1, please enter your name", "Player 1");
	var player2name = prompt("Player 2, please enter your name", "Player 2");
	var boardsize = prompt("Please choose an even number between 4 and 10 for the size of your board", 4);

	<!-- This function checks is the submitted number is odd. -->
	function oddNumber(number) { return number % 2; }

	<!-- This loop ensures that the boardsize requested by the players is a valid choice. -->
	while(isNaN(boardsize) || boardsize < 4 || boardsize > 10 || oddNumber(boardsize)){
		boardsize = prompt("Invalid choice. Please choose an even number between 4 and 10", 4);
	}

	<!-- These global variables hold the total boardsize, the current player's turn, and the players's scores. -->
	var totalBoardSize = boardsize*boardsize;
	var currentPlayerTurn = player1name;
	var player1score = 0;
	var player2score = 0;

	<!-- This table prepares to receive the variables for the player names and scores. -->
	document.write("<table><tr><td><table border='1;'><tr><td id='player1name' border='1;' style='width:75px;text-align:right;'></td></tr></table></td><td id='player1score' style='width:25px;text-align:left;'></td><td style='width:100px;'></td><td><table border='1;'><tr><td id='player2name' style='width:75px;text-align:right;'></td></tr></table></td><td id='player2score' style='width:25px;text-align:left;'></td></tr></table>");

	<!-- These lines write the player names and scores to the above table. -->
	document.getElementById("player1name").innerHTML = player1name;
	document.getElementById("player1score").innerHTML = player1score;
	document.getElementById("player2name").innerHTML = player2name;
	document.getElementById("player2score").innerHTML = player2score;
	document.write("<br><br><br><br>");

	<!-- These global variables hold an array of the cell locations, an array of the pieces, an array which holds which cards are currently open, and an id of "solved" which cards are set to whenever they are matched. -->
	var cells = [];
	var pieces = [];
	var openCards = [];
	var solved = "solved";

	<!-- This for loop generates the pieces, pushing two copies of each piece that is created. The numbers go higher than 4, since on a 10x10 grid, the colors specified in the assignment and using only numbers 1-4 inclusive does not generate enough pieces for the board. -->
	while (pieces.length < totalBoardSize){
		for (var numberCreation=1; numberCreation<4; numberCreation++) {
			var piece = [numberCreation, "red"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "yellow"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "green"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "blue"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "orange"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "purple"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "gray"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "maroon"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "lime"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
			var piece = [numberCreation, "white"];
			pieces.push(piece);
			pieces.push(piece);
			if (pieces.length >= totalBoardSize){ break; }
		}
	}

	<!-- This function flips a game piece from face down to face up, or back again. -->
	function flipCell() {
		<!-- This if statement covers all of the code in the case that a card is flipped from face down to face up. -->
		if (this.style.backgroundColor == "black") {
			<!-- The following for loop and if statement looks through the cells array to find the matching piece for the card that has been flipped. -->
			for (var cellIndex=0; cellIndex<cells.length; cellIndex++){
 				if (cells[cellIndex][0] == this.id) {
					<!-- The following three lines set the flipped card to the background color and number according to its piece, and then pushes the piece to the openCards array. -->
 					this.style.backgroundColor = cells[cellIndex][1][0][1];
					this.innerHTML = cells[cellIndex][1][0][0];
					openCards.push(cells[cellIndex]);
					<!-- This if statement governs situations where two cards are current flipped over. -->
					if (openCards.length == 2){
						<!-- This if statement governs situations where the two cards that have been flipped over match. The score is updated with a point for the current player and the id's of the matched cards are set to "solved." -->
						if (openCards[0][1][0][0] == openCards[1][1][0][0] && openCards[0][1][0][1] == openCards[1][1][0][1]) {
							if (currentPlayerTurn == player1name){
								player1score = player1score + 1;
								document.getElementById("player1score").innerHTML = player1score;
							}
							else {
								player2score = player2score + 1;
								document.getElementById("player2score").innerHTML = player2score;
							}
							var firstID = openCards[0][0];
							var secondID = openCards[1][0];
							for (var boardIterator1=0; boardIterator1<boardsize; boardIterator1++){
								for (var boardIterator2=0; boardIterator2<boardsize; boardIterator2++){
									var cellID = String(boardIterator1) + String (boardIterator2);
									if (cellID == firstID || cellID == secondID){
										document.getElementById(cellID).removeEventListener("click", flipCell);
										document.getElementById(cellID).id = solved;
									}
								}
							}
						}
						<!-- This else statement governs situations where the two flipped cards do not match. The event listeners on all cells are removed, and the "Next Turn" button is highlighted red. -->
						else {
							for (var boardIterator1=0; boardIterator1<boardsize; boardIterator1++){
								for (var boardIterator2=0; boardIterator2<boardsize; boardIterator2++){
									var cellID = String(boardIterator1) + String(boardIterator2);
									if (document.getElementById(cellID) != null){
										document.getElementById(cellID).removeEventListener("click", flipCell);
									}
								}
							}
							document.getElementById("nextTurn").style.backgroundColor = "red";
						}
						<!-- Once the two flipped cards have been dealt with (whether they match or not), the openCards array is emptied, and the script checks if the game is over. If the game is over, an appropriate message is displayed, and the event listeners for the "Next Turn" and "Concede Game" buttons are removed. -->
						openCards.length = 0;
						if ((player1score + player2score) == (totalBoardSize/2)){
							if (player1score > player2score) {
								alert("Congratulations " + player1name + ", you win!");
							}
							else if (player2score > player1score) {
								alert("Congratulations " + player2name + ", you win!");
							}
							else {
								alert("It's a tie game, congratulations everyone!");
							}
							document.getElementById("nextTurn").removeEventListener("click", nextTurn);
							document.getElementById("concedeGame").removeEventListener("click", concedeGame);
						}
					}
				}
			}
		}
		<!-- This else statement governs situations where a card is face up and needs to be turned back to face down. -->
		else {
			this.style.backgroundColor = "black";
			this.innerHTML = "";
		}
	}

	<!-- The following code creates the actual game board, pushing the locations into the cells array, assigning a random piece to that cell, and turning the "click" event listener on for each cell. -->
	document.write("<table>");
	for(var boardCreator1=0; boardCreator1<boardsize; boardCreator1++){
		document.write("<tr>");
			for(var boardCreator2=0; boardCreator2<boardsize; boardCreator2++){
				var cellID = String(boardCreator1) + String(boardCreator2);
				document.write("<td id='cell' style='width:50px;height:50px;text-align:center;font-size:27px;font-weight:bold;background-color:black;'></td>");
				document.getElementById("cell").id = cellID;
 				var cellPiece = pieces.splice(Math.floor(Math.random()*pieces.length), 1);
 				newCell = [cellID, cellPiece];
				cells.push(newCell);
				document.getElementById(cellID).addEventListener("click", flipCell);
			}
		document.write("</tr>")
	}
	document.write("</table>")
	document.write("<br><br><br><br>")

	<!-- This line creates the bottom table that holds the current player's turn, and the "Next Turn" and "Concede Game" buttons. -->
 	document.write("<table><tr><td><table border='1;'><tr><td>Current Player</td></tr></table></td><td id='currentPlayerTurn'></td><td style='width:100px;'></td><td><table border='1;'><tr><td id='nextTurn'>Next Turn</td></tr></table></td><td style='width:50px;'></td><td><table border='1;'><tr><td id='concedeGame'>Concede Game</td></tr></table></td>")

	<!-- This function executes when the "Next Turn" button is clicked. -->
	function nextTurn() {
		<!-- This line empties the openCards array. -->
		openCards.length = 0;
		<!-- These for loops sets all cards that have not been solved back to being face down. -->
		for (var boardIterator1=0; boardIterator1<boardsize; boardIterator1++){
			for (var boardIterator2=0; boardIterator2<boardsize; boardIterator2++){
				var cellID = String(boardIterator1) + String(boardIterator2);
				if (document.getElementById(cellID) != null){
					document.getElementById(cellID).innerHTML = "";
					document.getElementById(cellID).style.backgroundColor = "black";
					document.getElementById(cellID).addEventListener("click", flipCell);
				}
			}
		}
		<!-- The following if/else statement sets the current player turn to the next player. -->
		if (currentPlayerTurn == player1name) {
			currentPlayerTurn = player2name;
			document.getElementById("currentPlayerTurn").innerHTML = currentPlayerTurn;
		}
		else {
			currentPlayerTurn = player1name;
			document.getElementById("currentPlayerTurn").innerHTML = currentPlayerTurn;
		}
		<!-- This line sets the background of the "Next Turn" button back to white if it has been highlighted red. -->
		document.getElementById("nextTurn").style.backgroundColor = "white";
	}

	<!-- This function executes when the "Concede Game" button is clicked. It alerts the non-active player that they've won, and removes all event listeners. -->
	function concedeGame() {
		if (currentPlayerTurn == player1name){
			alert("Congratulations " + player2name + ", you win!");
		}
		else {
			alert("Congratulations " + player1name + ", you win!");
		}
		for (var boardIterator1=0; boardIterator1<boardsize; boardIterator1++){
			for (var boardIterator2=0; boardIterator2<boardsize; boardIterator2++){
				var cellID = String(boardIterator1) + String(boardIterator2);
				if (document.getElementById(cellID) != null){
					document.getElementById(cellID).removeEventListener("click", flipCell);
				}
			}
		}
		document.getElementById("nextTurn").removeEventListener("click", nextTurn);
		document.getElementById("concedeGame").removeEventListener("click", concedeGame);
	}

	<!-- These final lines set the event listeners for the "Next Turn" and "Concede Game" buttons, and sets the current player's turn. -->
	document.getElementById("nextTurn").addEventListener("click", nextTurn);
	document.getElementById("concedeGame").addEventListener("click", concedeGame);
	document.getElementById("currentPlayerTurn").innerHTML = currentPlayerTurn;
		
</script>
</body>
</html>
