// this function is responsible for generating arrays of cells for the entire game
const gameBoard = (() => {

    // this viriable hold the arrays
    const board = [];
    // varible to generate rows inside the board
    const rows = 3;
    // variable to generate columns inside each row
    const columns = 3;
    for (let i = 0; i < rows; i++) {
        // create an empty array for each outer loop
        board[i] = [];
        for (let j = 0; j < columns; j++)
            // push the values of j inside the created array 
            board[i].push(cell());
    }
    // getter function for board
    const getBoard = () => board;
    // function to drop token inside the cell.
    const dropToken = (rowNumber, columnNumber, player) => {
       const targetCell = board[rowNumber][columnNumber]
        // condition to validate if the spot is empty
        if (targetCell.getCellValue() === 0) {targetCell.addCellValue(player);
        } 
    }   
    // console log to test the print board
    const printBoard = () => {
        const viewBoard = board.map(row => row.map(cell => cell.getCellValue()));
        return viewBoard;
    }

    const resetBoard = () => board.map(rows => rows.map(cols => cols.addCellValue(0)))
 
return {
        getBoard,
        dropToken,
        printBoard,
        resetBoard
    }   
})();

// function creation to generate and fill the cells
function cell() {
    // initial value
    let cellvalue = 0;
    // current value after call of addCellValue
    const addCellValue = (culumn) => cellvalue = culumn;
    // getter for cellValue
    const getCellValue = () => cellvalue

    return {
        getCellValue,
        addCellValue
    }
};

// function to control the game flow
function gameController(playerOneName = 'Player one',
playerTwoName = 'player two') {

    const player = [
        {name: prompt('enter name'), token: 1, score: 0}, 
        {name: playerTwoName, token: 2, score: 0}
    ];

    let activePlayer = player[0];

// getter function for active player
    const getActivePlayer = () => activePlayer;
    
// function to change turn for each player
    const switchTurn = () => {
        if (activePlayer === player[0]) {
            activePlayer = player[1]
        } else {
            activePlayer = player[0]
        }
        console.log(getActivePlayer())
    }

    const getPlayer1 = () => player[0];
    const getPlayer2 = () => player[1];

    function isWin(player1, player2) {
        const board = gameBoard.printBoard();
        console.log(board);

        // helper function for win check
        const getScore = (token) => {
            if (token === player1.token) {
                player1.score++;
            } else if (token === player2.token) {
                player2.score++;
            }   
        }
        for (let i = 0; i < board.length; i++) {
            // horizontal check
            if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                getScore(board[i][0]);
                return true;
            }
        }
        for (let j = 0; j < board.length; j++) {
            // vertical check
            if (board[0][j] !== 0 && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
               getScore(board[0][j]);
               return true;
            }
        }
                // diagonal check_left
            if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                getScore(board[0][0]);
                return true;
            }
                // diagonal check_right
            if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                getScore(board[0][2]);
                return true;
            }
        // if no winner return false
        return false;
    }
    // check 3 in a row win 
    const check3InARow = (currentPoint) => {
        if (currentPoint === 3) {
            console.log(`${getActivePlayer().name} wins the game!`);
            return true;
        } else {
            return false
        }
        
    }
    // function to switch play round
    const playRound = (row, column) => {

        gameBoard.dropToken(row, column, getActivePlayer().token);
        gameBoard.printBoard()
         
        if(isWin(player[0], player[1])) {
            gameBoard.resetBoard();
            check3InARow(activePlayer.score)
           
        } else {
            switchTurn();
        }
        getActivePlayer();
    }

 return {
    playRound,
    getActivePlayer,
    getPlayer1,
    getPlayer2,
    check3InARow
 }

}
// screen controller for UI
function screenController() {

    const game = gameController();
    const board = gameBoard.getBoard();
// html el. for player turn, player score and buttons container, etc.
    const playerTurn = document.querySelector('.playerTurnDiv');
    const cellDiv = document.querySelector('.cellDiv');
    const scoreDiv1 = document.querySelector('.player1')
    const scoreDiv2 = document.querySelector('.player2')
    const win = document.querySelector('.win');
// update screen function
    const updateScreen = () => {
// new inner el. content for each cellDiv update
        cellDiv.innerHTML = '';
        const activePlayer = game.getActivePlayer();
        const player1 = game.getPlayer1();
        const player2 = game.getPlayer2();
        const checkWin = game.check3InARow(activePlayer.score);

        playerTurn.textContent = `${activePlayer.name} turn`;
        scoreDiv1.textContent = `Player one: ${player1.score}`;
        scoreDiv2.textContent = `Player two: ${player2.score}`;
        // check gameover
         if (checkWin) {
            console.log(win.textContent = `${activePlayer.name} won!`)
                const ok = document.createElement('button')
                      ok.classList.add('.ok')
                win.appendChild(ok)
                ok.textContent = 'OK';
                ok.addEventListener('click', gameBoard.resetBoard)
            
            console.log('heyyyyyyy')
            return;
        }

        board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {

                const cellBtn = document.createElement('button');
                cellBtn.classList.add('.cell');

                cellBtn.dataset.row = rowIndex;
                cellBtn.dataset.column = colIndex;
                cellDiv.appendChild(cellBtn);
                // logic to update the button text content for each token '0, 1, 2,
                if (col.getCellValue() === 0) {
                    cellBtn.textContent = '';
                } else if (col.getCellValue() === 1){
                    cellBtn.textContent = 'X';
                } else {
                    cellBtn.textContent = 'O';
                }
            })
        })
    }
// click handler function to update playRound with the datasets of the target button as an argument
    const clickHandler = (e) => {

        const board = gameBoard.getBoard()

        let selectedRow = e.target.dataset.row;
        let selectedColumn = e.target.dataset.column;
        console.log(selectedRow, selectedColumn)
        // turn off for accidential click 
        if ((!selectedRow || !selectedColumn)) return;
        // stop if player drops a token in an occupied place
        const selectedCell = board[selectedRow][selectedColumn];
        if (selectedCell.getCellValue() !== 0) return;
        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }
    cellDiv.addEventListener('click', clickHandler);
    updateScreen();
}
screenController();