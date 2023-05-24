switch (gameBoard.markCell(cell, getActivePl().getMarker())) {
            case 0:
                console.log('board full, tie')
                break;
            case -1:
                console.log('already marked cell')
                break;
            default:
                break;
        }


 const markCell = (cell, marker) => {

        if (boardFull()) {  // check if board full
            return 0
        }

        if (board[cell] === '') {
            board[cell] = marker
            return 1
        } else {
            return -1; // stop execution if try to mark a marked cell
        }
    }

Next task:  display messeges on div instead of console
            End the game and don't listen to click if game over (problem is game loop kaha?)
            click on filled cell should not switch player       (same game loop)

results of a round can be -  (note: empty space clicking doesn't start round)
    mark cell
    error cause u try to click already marked
    win
    draw
