// this function is responsible for generating arrays of cells for the entire game
function gameboard() {

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
       } else {
        console.log('target cell already taken');
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
   
}

const game = gameboard();
game.dropToken(1,2,1);
game.printBoard()
game.dropToken(1,2,1);

// functiion creation to generate and fill the cells
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