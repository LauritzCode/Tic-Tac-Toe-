const gameBoard = () => {

let board = [
    ["","",""],
    ["","",""],
    ["","",""]
];


let currentPlayer = "X" 
let gameOver = false;
let xScore = 0
let oScore = 0

const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("statusText");
const cells = document.querySelectorAll("#cell");
const scoreX = document.querySelector("#x-score")
const scoreO = document.querySelector("#o-score")

const getGameOver = () => gameOver

const changePlayer = () => {
   currentPlayer = currentPlayer === "X" ? "O" : "X"
   
};

const updateScore = () => {

    if (checkWinner() && currentPlayer === "X") {
        xScore++
        scoreX.textContent = xScore 
    } else if (checkWinner() && currentPlayer === "O") {
        oScore++ 
        scoreO.textContent = oScore

    } else return 


}


const updateBoard = (row, col) => {
    
    if (gameOver === true) {
        return 
    } else {

        if (board[row][col] === "") {
            board[row][col] = currentPlayer
            const winner = checkWinner();
            const tie = checkTie(); 
            if (winner) {
                updateScore();
                statusText.textContent = `${winner} wins!`
                gameOver = true

            } else if (tie) { 
                statusText.textContent ="It's a tie!"
                gameOver = true;
            }
            else { 
                changePlayer();
                statusText.textContent = `${currentPlayer}'s turn`
            }
        
            } else {
                statusText.textContent ="Spot's already taken";
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
        currentPlayer = "X"
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const row = cell.dataset.row
        const col = cell.dataset.col

    if (getGameOver() || cell.textContent !== "") return
 
    cell.textContent = `${currentPlayer}`
    cell.classList.add("clicked")
    cell.classList.add(currentPlayer === "X" ? "playerx" : "playero");
    console.log(cell.classList);
    updateBoard(row, col);
})
})

restartBtn.addEventListener("click", () => {
    gameReset() 
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("clicked");
        cell.classList.remove("playero");
        cell.classList.remove("playerx");
        statusText.textContent = `${currentPlayer}'s turn!`
    })

})


return { updateBoard, changePlayer, getBoard, checkWinner, checkTie, gameReset, getGameOver, updateScore };

};

const game = gameBoard();