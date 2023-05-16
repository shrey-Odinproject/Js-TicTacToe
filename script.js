const gameBoard = ( () => {
    const board = ['X','','','','','','O','O','X'];
    
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
    const board = gameBoard

    let current_pl = plx

    const switchPl = () => {
        current_pl = current_pl === plx ? plo : plx
    }

    const getActivePl = () => current_pl

    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePl().getMarker()}'s turn`)
    }

    const playRound = (cell) => {
        board.markCell(cell, getActivePl().getMarker())
        console.log(`${getActivePl().getMarker()} has marked ${cell}`)
        
        // check for game win/draw condition

        switchPl()
        printNewRound()
    }

    return {playRound, getActivePl} // need activepl for UI
})()
