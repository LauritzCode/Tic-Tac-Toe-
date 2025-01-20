const gameBoard = () => {

let board = [
    ["","",""],
    ["","",""],
    ["","",""]
];


let currentPlayer = "X" 
let gameOver = false;

const changePlayer = () => {
   currentPlayer = currentPlayer === "X" ? "O" : "X"
};

const updateBoard = (row, col) => {

    if (gameOver === true) {
        return 
    } else {
        if (board[row][col] === "") {
            board[row][col] = currentPlayer
            const winner = checkWinner();
            const tie = checkTie(); 
            if (winner) {
                console.log(`${winner} wins!`)
                gameOver = true

            } else if (tie) { 
                console.log("It's a tie!");
                gameOver = true;
            }
            else { 
                changePlayer();
            }
        
            } else {
                console.log("Spot's already taken");
            }
    }
   
};

const getBoard = () => board; 

const checkWinner = () => {

    for (let i = 0; i < board.length; i++) {

        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            return board[i][0]
        } 

        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            return board[0][i]
        }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return board[0][0]
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        return board[0][2]
    }

    

    return null
}

const checkTie = () => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === "") {
                return false
            } 
        }

    }
    return true
}

const gameReset = () => {
    gameOver = false;
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = "";
        }
    }
}

return { updateBoard, changePlayer, getBoard, checkWinner, checkTie, gameReset };

};

const game = gameBoard();



game.updateBoard(0, 0)
game.updateBoard(0, 1)
game.updateBoard(0, 2)
game.updateBoard(1, 0)
game.updateBoard(1, 2)
game.updateBoard(2, 0)
game.updateBoard(2, 1)
game.updateBoard(2, 2)
game.updateBoard(1, 1)


console.log(game.getBoard())
console.log(game.gameOver)

