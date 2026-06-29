var moves = 0;
var seconds = 0;
var timerInterval = null;

function buildBoard() {
	var table = document.getElementById("table");
	table.innerHTML = "";
	var tileNum = 1;
	for (var row = 1; row <= 4; row++) {
		var rowDiv = document.createElement("div");
		rowDiv.id = "row" + row;
		rowDiv.style.display = "table-row";
		for (var col = 1; col <= 4; col++) {
			var cell = document.createElement("div");
			cell.id = "cell" + row + col;
			cell.className = "tile" + tileNum;
			cell.setAttribute("onClick", "clickTile(" + row + ", " + col + ");");
			rowDiv.appendChild(cell);
			tileNum++;
		}
		table.appendChild(rowDiv);
	}
}

function startTimer() {
	clearInterval(timerInterval);
	seconds = 0;
	document.getElementById("timer").textContent = "0s";
	timerInterval = setInterval(function() {
		seconds++;
		document.getElementById("timer").textContent = seconds + "s";
	}, 1000);
}

function incrementMoves() {
	moves++;
	document.getElementById("moves").textContent = moves;
}

function swapTiles(cell1, cell2) {
	var temp = document.getElementById(cell1).className;
	document.getElementById(cell1).className = document.getElementById(cell2).className;
	document.getElementById(cell2).className = temp;
}

function checkWin() {
	var tileNum = 1;
	for (var row = 1; row <= 4; row++) {
		for (var col = 1; col <= 4; col++) {
			if (document.getElementById("cell" + row + col).className !== "tile" + tileNum) {
				return;
			}
			tileNum++;
		}
	}
	clearInterval(timerInterval);
	document.getElementById("win-message").style.display = "block";
	setTimeout(function() {
		if (confirm("You solved it in " + moves + " moves and " + seconds + "s!\nPlay again?")) {
			newGame();
		}
	}, 100);
}

function resetStats() {
	moves = 0;
	document.getElementById("moves").textContent = "0";
	document.getElementById("win-message").style.display = "none";
	startTimer();
}

function shuffle() {
	for (var row = 1; row <= 4; row++) {
		for (var col = 1; col <= 4; col++) {
			var row2 = Math.floor(Math.random() * 4 + 1);
			var col2 = Math.floor(Math.random() * 4 + 1);
			swapTiles("cell" + row + col, "cell" + row2 + col2);
		}
	}
}

function newGame() {
	buildBoard();
	resetStats();
	shuffle();
}

function clickTile(row, col) {
	var tile = document.getElementById("cell" + row + col).className;

	if (tile != "tile16") {
		if (col < 4) {
			if (document.getElementById("cell" + row + (col + 1)).className == "tile16") {
				swapTiles("cell" + row + col, "cell" + row + (col + 1));
				incrementMoves();
				setTimeout(checkWin, 100);
				return;
			}
		}
		if (col > 1) {
			if (document.getElementById("cell" + row + (col - 1)).className == "tile16") {
				swapTiles("cell" + row + col, "cell" + row + (col - 1));
				incrementMoves();
				setTimeout(checkWin, 100);
				return;
			}
		}
		if (row > 1) {
			if (document.getElementById("cell" + (row - 1) + col).className == "tile16") {
				swapTiles("cell" + row + col, "cell" + (row - 1) + col);
				incrementMoves();
				setTimeout(checkWin, 100);
				return;
			}
		}
		if (row < 4) {
			if (document.getElementById("cell" + (row + 1) + col).className == "tile16") {
				swapTiles("cell" + row + col, "cell" + (row + 1) + col);
				incrementMoves();
				setTimeout(checkWin, 100);
				return;
			}
		}
	}
}


newGame();
