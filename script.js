const boardDiv = document.getElementsByClassName('board')[0]

const gameBoard = ( () => {
    let board = ['x','.','.','.','.','.','o','o','x'];
    const displayBoard = () => {
        board.forEach((value) => {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.textContent = value
            boardDiv.appendChild(cell)
        })
    }
    return {displayBoard}
})();

gameBoard.displayBoard()