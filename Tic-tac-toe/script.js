function player(name, mark) {
    return { name, mark };
}

//GameBoard will contain everything about the game, and methods you can use against the board 2d array i.e. placing 'X' 'O'
const gameBoard = (function () {
    let gameState = "play";

    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]];

    const resetBoard = () => {
        console.log("resetting board")
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]];

        gameState = "play";
        //Set it to empty string as above
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                displayController.updateCell(i, j, "")
            }
        }
    }

    const placeMark = (x, y, player) => {
        if (!board[x][y] && gameState != "win" && gameState != "draw") {
            console.log("Placing " + player.mark + " on: " + x, y, player.mark)
            board[x][y] = player.mark;
            
            //Should probably update the display here as well.
            displayController.updateCell(x, y, player.mark)

            gameState = checkWinner();
            if (gameState == "win") {
                console.log(player.name + " wins as: " + player.mark)
                displayController.displayWinner(player.name + " wins as: " + player.mark)
            }else if(gameState == "draw"){
                displayController.displayWinner("It's a draw!")   
            }

        } else { 
            //Śomething could go here.
        }

    };

    const checkWinner = () => {
        const boardLength = board.length;
        /*
        Checking Rows. Can also do across the columns here in a single for loop rather than making another one. 
        As columns are basically vertical rows
        */
        for (let row = 0; row < boardLength; row++) {
            // console.log(row)
            if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                console.log("Winner across the row: " + row);
                return ("win")
            }

            if (board[0][row] && board[0][row] == board[1][row] && board[1][row] === board[2][row]) {
                console.log("Winner across the column: " + board[0][row] + board[1][row] + board[2][row]);
                return ("win")
            }
        }

        //Checking diagonals
        if (board[2][0] && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            console.log("Winner across the diagonal");
            return ("win")
        }

        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            console.log("Winner across the diagonal");
            return ("win")
        }

        if (board.flat().every(cell => cell !== "")) {
            return ("draw")
        }

    }
    return { placeMark, resetBoard, checkWinner };
})();

//So probably doing everything about the game can be done in playGame.
const playGame = (function () {
    let playerOne;
    let playerTwo;
    let isNextTurn = true;

    const makeMove = (x, y) => {
        if (playerOne && playerTwo) {
            if (isNextTurn) {
                gameBoard.placeMark(x, y, playerOne)
                isNextTurn = false
            } else {
                gameBoard.placeMark(x, y, playerTwo)
                isNextTurn = true;
            }
        } else { console.log("haven't set all players") }
    }

    //Method to set player one
    const setPlayerOne = (name, mark) => {
        playerOne = player(name, mark)
        console.log(playerOne)
    }

    //method to set player two. It sets it as the opposite marker as player one has.
    const setPlayerTwo = (name) => {
        if (playerOne.mark == "X") {
            playerTwo = player(name, "O")
            console.log(playerTwo)
        } else {
            playerTwo = player(name, "X")
            console.log(playerTwo)
        }
        
        //Then display the players top-right
        displayController.displayPlayers(playerOne.name + " as '" + playerOne.mark + "' Vs " + playerTwo.name + " as '" + playerTwo.mark + "'");
    }

    return { makeMove, setPlayerOne, setPlayerTwo }
})();

//Controlsthe everything to do with the U.I and buttons
const displayController = (function () {

    const gridCells = document.querySelectorAll(".cell")
    const dialogPlayerOne = document.getElementById("dialog-player-1")
    const dialogPlayerTwo = document.getElementById("dialog-player-2")
    const buttons = document.querySelectorAll("button")

    //Show modal at the start for the name.
    dialogPlayerOne.showModal()

    gridCells.forEach(cell => {
        cell.addEventListener('click', function () {
            const cellAttr = cell.attributes;
            const xAttr = cellAttr.getNamedItem('data-x').value
            const yAttr = cellAttr.getNamedItem('data-y').value
            playGame.makeMove(xAttr, yAttr)
            console.log(xAttr + " " + yAttr);

        })
    });

    //Method to set the cell to an X, O, or clear it once it's reset.
    const updateCell = (x, y, mark) => {
        const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            const h1 = cell.querySelector("h1")
            h1.textContent = mark;
        }
    }

    //Sets listeners for all buttons on page. 
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (button.id == "reset") {
                gameBoard.resetBoard();
                displayWinner();
            }
            if (button.id == "next-player") {
                const name = document.getElementById("player-one-name")
                if (name.value != "") {
                    const mark = document.getElementById("modal-player-mark").value;
                    playGame.setPlayerOne(name.value, mark)
                    dialogPlayerOne.close()
                    //Show the next dialog for the next player
                    dialogPlayerTwo.showModal();
                } else {
                    name.placeholder = "Read the above again"
                }

            }
            if (button.id == "start-game") {
                const name = document.getElementById("player-two-name");
                if (name.value != "") {
                    playGame.setPlayerTwo(name.value)
                    dialogPlayerTwo.close();
                } else {
                    name.placeholder = "Name goes here mate"
                }
            }
        })
    })

    //Sets the top header as the winner username
    const displayWinner = (text = "Let's see who wins") => {
        const winner = document.getElementById("winner")
        winner.textContent = text;
    }
    
    //Top-right display as to who won the game
    const displayPlayers = (text) => {
        const header = document.getElementById("who-playing")
        header.textContent = text;
    }
    return { updateCell, displayWinner, displayPlayers }
})();