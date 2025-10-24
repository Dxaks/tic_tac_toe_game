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

    const getBoard = () => board;
    // function to drop token inside the cell.
    const dropToken = (rowNumber, columnNumber, player) => {
    
       const targetCell = board[rowNumber][columnNumber]
        // condition to validate if the spot is empty
       if (targetCell.getCellValue() === 0) {
        targetCell.addCellValue(player);
       } else {console.log('target cell already taken');
        return;
       }
}
    // console log to test the print board
    const printBoard = () => {

        const viewBoard = board.map(row => row.map(cell => cell.getCellValue()));
        console.log(viewBoard)
    }
 
return {
        getBoard,
        dropToken,
        printBoard
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

    const player = [{name: playerOneName, token: 1}, {name: playerTwoName, token: 2}];

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
}
// function to switch play round
 const playRound = (row, column) => {

    gameBoard.dropToken(row, column, getActivePlayer().token);
    gameBoard.printBoard()

    switchTurn()
    getActivePlayer()
 }

 return {
    playRound,
    getActivePlayer
 }

}

// screen controller for UI
function screenController() {

    const game = gameController();
    console.log(game.getActivePlayer().name)

    const board = gameBoard.getBoard();
// html el. for player turn and buttons container
    const playerTurn = document.querySelector('.playerTurnDiv');
    const cellDiv = document.querySelector('.cellDiv');
// update screen function
    const updateScreen = () => {
// new inner el. content for each cellDiv update
        cellDiv.innerHTML = '';

        playerTurn.textContent = `${game.getActivePlayer().name} turn`;

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

        let selectedRow = e.target.dataset.row;
        let selectedColumn = e.target.dataset.column;

        console.log(selectedRow, selectedColumn)
// turn off for accidential click 
        if ((!selectedRow || !selectedColumn)) return;

        game.playRound(selectedRow, selectedColumn);

        updateScreen();

    }

    cellDiv.addEventListener('click', clickHandler);

    updateScreen();

}
screenController();