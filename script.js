// code has only 1 gameboard, gamecontroller, screencontroller are modules and player is factory function
const gameBoard = ( () => {
    const board = ['','','','','','','','',''];
    
    const getBoard = () => board // will be used by UI module to render board

    const markCell = (cell, marker) => {

        if (board[cell] === '') {
            board[cell] = marker
        } else {
            return; // stop execution if try to mark a marked cell
        }
    }

    return {getBoard, markCell}
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

    const winCondition = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (const combo of winningCombos) {
            const [a, b, c] = combo
            const board = gameBoard.getBoard()
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
                return true
            }
        }
        return false
    }

    const boardFull = () => { 
        const board = gameBoard.getBoard()  // return true if board is full
        for (let i = 0; i < board.length; i++) {
            const cell = board[i];
            if (cell === '') {
                return false
            }
        }
        return true
    }

    const playRound = (cell) => {
        gameBoard.markCell(cell, getActivePl().getMarker())
        
        if (winCondition()) {
            return 'win'// so that player switch no hoppen after win or draw also return help us display message in div
        }
        
        else if (boardFull()) {
            return 'draw'
        }  

        switchPl()
    }

    return {playRound, getActivePl} // need activepl for UI
})()

const screenController = (() => {
    const boardDiv = document.querySelector('.board')
    const playerTurnDiv = document.querySelector('.turn')
    const resultDiv = document.querySelector('.result')

    const updateScreen = (roundResult = '') => {
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

        if (roundResult === 'win') {
            resultDiv.textContent = ` ${current_pl.getMarker()} has won `

        } else if (roundResult === 'draw') {
            resultDiv.textContent = `draw`
        }

    }

    const respondToClick = (e) => { // function responding to a click event
        const clickedCellIndex = e.target.dataset.cell_index

        if (!clickedCellIndex) return // if user click elsewhere apart from the board cell stop execution

        let roundResult = gameController.playRound(clickedCellIndex) // maybe display messages on div based on what playround returns
    
        updateScreen(roundResult) // we can give update screen inputs and display draw/win from inside update-screen using the argument given, writing if else and updating div here makes less sense
    }

    boardDiv.addEventListener('click', respondToClick) // listen to a click

    updateScreen() // initial rendering of board

    // we are not returning anything as everything is used up inside screenController
})()
