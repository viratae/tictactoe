// =======================================================================
//     USING CLOSURES, FACTORY FUNCTIONS, AND IIFEs
// =======================================================================


/* Factory Function */
function gameboard() {
    const rows = 3;
    const columns = 3;

    const board = [];
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i][j] = 0;
        }
    }

    // --- Private Methods --- //

    // --- Public Methods --- //
    function displayBoard() {
        console.log(board);
    }
    function getBoard() {
        return board;
    }
    function checkWins(){
        //---WINS---
        //rows
        for(i=0; i<=2; i++) {
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0){
                if(board[i][0] == 1) {
                    return 1;
                }
                else if(board[i][0] == 2) {
                    return 2;
                }
            }
        }
        //columns
        for(i=0; i<=2; i++) {
            if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0){
                if(board[0][i] == 1) {
                    return 1;
                }
                else if(board[0][i] == 2) {
                    return 2;
                }
            }
        }
        //diagonal top left -> bottom right
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {
            if(board[0][0] == 1) {
                return 1;
            }
            else if(board[0][0] == 2) {
                return 2;
            }
        }
        //diagonal bottom left -> top right
        if(board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != 0) {
            if(board[2][0] == 1) {
                return 1;
            }
            else if(board[2][0] == 2) {
                return 2;
            }
        }
        //---TIE---
        if(!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0)) {
            return "tie";
        }
            
    }
    function mark(row, col, marker) {
        if(board[row][col] == 0) {
            board[row][col] = marker;
            return true;
        }
        else if(board[row][col] != 0) {
            console.log("too late!"); 
            return false;
        }
    }
    function reset() {
        for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i][j] = 0;
        }
    }
    }
    return {
        displayBoard, 
        getBoard,
        checkWins,
        mark,
        reset
    };
}
/* IIFE - Game (previously GameController) */
const game = (function GameController() {
    const board = gameboard();
    let turnIndex = 0;
    let player1 = "x";
    let player2 = "o";
    // --- Private Methods --- //
    function changeTurn() {
        turnIndex++;
        
    }
    function getTurn() {
        if((turnIndex % 2) == 0) {
            return 1;
        }
        else if((turnIndex % 2)== 1) {
            return 2;
        }
    }

    // --- Public Methods --- //
    playerNameForm.addEventListener("submit", e => {
        
        e.preventDefault();
        const playerForm = document.querySelector("playerNameForm");
        const player1Name = document.querySelector("#player1Name").value;
        const player2Name = document.querySelector("#player2Name").value;

        player1 = player1Name;
        player2 = player2Name;
        screen.render();
    })
    function getPlayer1() {
        return player1;
    }
    function getPlayer2() {
        return player2;
    }
    /* In order to not expose the board, we use a getBoard() function in gameboard()
    However, in order for ScreenController to access the same board, we must return it again */
    function getBoard() {
        return board.getBoard();
    }
    function checkWins() {
        return board.checkWins();
    }
    function playTurn(row, col) {
        if(board.mark(row,col,getTurn())) {
            changeTurn();
        }
        
    }
    function displayBoard() {
        board.displayBoard();
    }
    function resetGame() {
        board.reset();
        turnIndex = 0;
    }
    return { 
        getPlayer1,
        getPlayer2,
        checkWins,
        getTurn,
        getBoard,
        playTurn,
        displayBoard,
        resetGame
    };
}());
/* IIFE */
const screen = (function ScreenController() {
    const gameButtons = document.querySelectorAll(".gameButton");
    const resultText = document.querySelector("#resultText");
    const playerTurn = document.querySelector("#playerTurn");
    gameButtons.forEach(button => {
        button.addEventListener("click", handleClick);
    })
    function handleClick(e) {
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        game.playTurn(row, col);
        render();
        console.log(game.getBoard());
    }
    function disableButtons() {
        gameButtons.forEach(button => {
            button.disabled = true;
        })
    }
    function enableButtons() {
        gameButtons.forEach(button => {
            button.disabled = false;
        })
    }
    function render() {
        const board = game.getBoard();
        gameButtons.forEach(button => {
            const row = Number(button.dataset.row);
            const col = Number(button.dataset.col);

            const tileNumber = board[row][col];
            if(tileNumber == 0) {
                button.textContent = "";
            }
            else if(tileNumber == 1) {
                button.textContent = "x";
            }
            else if(tileNumber == 2) {
                button.textContent = "o";
            }
        })
        if(game.checkWins() == 1) {
            resultText.textContent = `Player ${game.getPlayer1()} won!`;
            disableButtons();
        }
        else if(game.checkWins() == 2) {
            resultText.textContent = `Player ${game.getPlayer2()} won!`;
            disableButtons();
        }
        else if(game.checkWins() == "tie") {
            resultText.textContent = "It's a tie!";
            disableButtons();
        }

        if(game.getTurn() == 1) {
            playerTurn.textContent = game.getPlayer1();
            console.log(game.getPlayer1())
        }
        else if(game.getTurn() == 2) {
            playerTurn.textContent = game.getPlayer2();
            console.log(game.getPlayer1())
        }
    }
    const resetButton = document.querySelector("#resetButton");
    resetButton.addEventListener("click", () => {
        game.resetGame();
        render();
        resultText.textContent = "";
        enableButtons();
    })
    return {
        render
    }
}());
