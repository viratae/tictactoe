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
        if(board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[0][0] != 0) {
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
        turnIndex, getBoard, mark, displayBoard, checkWins
    };
}
function GameController() {
    const board = gameboard();

    let turnIndex = 0;
    function chooseToken(turnIndex) {
        if(turnIndex % 2 == 0) {
            return 1;
        }
        else {
            return 2;
        }
    }
    function playTurn(row, column) {
        board.mark(row, column, chooseToken(turnIndex));
        console.log(board.checkWins());
        turnIndex +=1;
    }
    return {
        board, playTurn
    };
}
function ScreenController() {
    function render() {
        const board = gameboard();
        gameButtons.forEach(button => {
            button.addEventListener("click", () => {
                const row = Number(button.dataset.row);
                const col = Number(button.dataset.col);
                
                const squareValue = board[row][col];
                if(squareValue == 1) {
                    button.textContent ="X"
                }
            })
        });
    }  
}
const game = GameController();
game.playTurn(0,0);
game.playTurn(0,2);
game.playTurn(0,1)
game.playTurn(1,0)
game.playTurn(1,2)
game.playTurn(1,1)
game.playTurn(2,0)
game.playTurn(2,2)
game.playTurn(2,1)



game.board.displayBoard();
