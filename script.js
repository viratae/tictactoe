//Variables
gameButtons = document.querySelectorAll(".gameButton");

//Factory function that creates a new gameboard
function gameboard() {
    let turnIndex = 0;
    
    const board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    //---Methods we'll use and not return (Private)---
    
    //---Methods we'll return (Public)---
    function reset() {
        for(i=0; i<=2; i++) {
            for(j=0; j<=2; j++){
                board[i][j] = 0;
            }
        }
    }
    //return board
    function getBoard() {
        return board;
    }
    //mark square
    function mark(row, column, player) {
        //check if tile already occupied
        if(board[row][column] == 0){
            board[row][column] = player;
        }
        else {
            console.log("Spot taken!");
        }
        
    }
    function displayBoard() {
        console.log(board);
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
    return {
        turnIndex, getBoard, mark, displayBoard, checkWins, reset
    };
}
function GameController() {
    const board = gameboard();

    let turnIndex = 0;
    //---Private Method---
    function chooseToken(turnIndex) {
        if(turnIndex % 2 == 0) {
            return 1;
        }
        else {
            return 2;
        }
    }
    //---Public Method---
    function playTurn(row, column) {
        board.mark(row, column, chooseToken(turnIndex));
        console.log(board.checkWins());
        turnIndex +=1;
        screen.render();
    }
    function resetGame() {
        board.reset();
        turnIndex = 0;
    }
    return {
        board, playTurn, resetGame
    };
}
function ScreenController() {
    resultText = document.querySelector("#resultText");
    gameButtons.forEach(button => {
        button.addEventListener("click", handleClick);
    })
    
    function render() {
        const board = game.board.getBoard();
        gameButtons.forEach(button => {
            const row = Number(button.dataset.row);
            const col = Number(button.dataset.col);
                
            const squareValue = board[row][col];
            if(squareValue == 1) {
                button.textContent ="x";
            }
            else if (squareValue == 2) {
                button.textContent = "o";
            }
            else if(squareValue == 0) {
                button.textContent="";
            }
        });
        if(game.board.checkWins() == 1) {
            resultText.textContent = "Player X won!";
        }
        else if(game.board.checkWins() == 2) {
            resultText.textContent = "Player O won!";
        }
        else if(game.board.checkWins() == "tie") {
            resultText.textContent = "It's a tie!";
        }
    }

    function handleClick(e) {
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        game.playTurn(row, col);
        render();
    }
    const resetButton = document.querySelector("#resetButton");
    resetButton.addEventListener("click", () => {
        game.resetGame();
        render();
    })
    return {
        render, 
    };
      
}
const game = GameController();
const screen = ScreenController();
// game.playTurn(0,0);
// game.playTurn(0,2);
// game.playTurn(0,1)
// game.playTurn(1,0)
// game.playTurn(1,2)
// game.playTurn(1,1)
// game.playTurn(2,0)
// game.playTurn(2,2)
// game.playTurn(2,1)



game.board.displayBoard();
