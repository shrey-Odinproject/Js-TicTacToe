// code has only 1 gameboard, gamecontroller, screencontroller are modules and player is factory function
const gameBoard = ( () => {
    const board = ['','','','','','','','',''];
    
    const getBoard = () => board // will be used by UI module to render board

    const boardFull = () => { // return true if board is full
        for (let i = 0; i < board.length; i++) {
            const cell = board[i];
            if (cell === '') {
                return false
            }
        }
        return true
    }

    const markCell = (cell, marker) => {

        if (boardFull()) {  // check if board full
            return
        }

        if (board[cell] === '') {
            board[cell] = marker
        } else {
            return; // stop execution if try to mark a marked cell
        }
    }

    const printBoard = () => { // wont be needing this later on
        board.forEach((cell) => {console.log(cell)})
    }

    return {getBoard, markCell, printBoard}
})();

const Player = (marker) => {
    const getMarker = () => marker
    return {getMarker}
}

const gameController = (() => {
    const plx = Player('X')
    const plo = Player('O')

    let current_pl = plx

    const switchPl = () => {
        current_pl = current_pl === plx ? plo : plx
    }

    const getActivePl = () => current_pl

    const printNewRound = () => {
        gameBoard.printBoard()
        console.log(`${getActivePl().getMarker()}'s turn`)
    }

    const playRound = (cell) => {
        gameBoard.markCell(cell, getActivePl().getMarker())
        console.log(`${getActivePl().getMarker()} has marked ${cell}`)
        
        // check for game win/draw condition

        switchPl()
        printNewRound()
    }

    return {playRound, getActivePl} // need activepl for UI
})()

const screenController = (() => {
    const boardDiv = document.querySelector('.board')
    const playerTurnDiv = document.querySelector('.turn')

    const updateScreen = () => {
        boardDiv.textContent = '' // clearing the game board

        const board = gameBoard.getBoard() // get latest board version and active player
        const current_pl = gameController.getActivePl()

        playerTurnDiv.textContent = `${current_pl.getMarker()}'s turn...`  // Display player's turn

        board.forEach( (cell, index) => { // render board cells
            const cellButton = document.createElement('button')
            cellButton.classList.add('cell')

            cellButton.dataset.cell_index = index
            cellButton.textContent = cell

            boardDiv.appendChild(cellButton)
        })

    }

    const respondToClick = (e) => { // function responding to a click event
        const clickedCellIndex = e.target.dataset.cell_index

        if (!clickedCellIndex) return // if user click elsewhere apart from the board cell stop execution

        gameController.playRound(clickedCellIndex)
        updateScreen()
    }

    boardDiv.addEventListener('click', respondToClick) // listen to a click

    updateScreen() // initial rendering of board

    // we are not returning anything as everything is used up inside screenController
})()

screenController()