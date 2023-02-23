const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
}

const gameboard = (() => {
    const board = [];

    for( let i = 0; i < 9; i++) {
        board.push('');
    };

    const getSquare = (index) => {
        return board[index];
    };

    const setSquare = (index, symbol) => {
        board[index] = symbol;
    }

    const resetGrid = () => {
        for( let i = 0; i < 9; i++) {
            board[i] = '';
        };
    };

    return {getSquare, setSquare, resetGrid};

})();

const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    const restartButton = document.querySelector('.restartBtn');
    
    squares.forEach( square => {
        square.addEventListener('click', (event) => {
            if ( gameboard.getSquare(event.target.dataset.index) !== '' ) {
                return
            }

            game.playRound(event.target.dataset.index)
            renderSquareContent();
        })
    })

    restartButton.addEventListener('click', () => {
        gameboard.resetGrid();
        renderSquareContent();
    });

    const renderSquareContent = () => {
        for ( let i = 0; i < squares.length; i++) {
            squares[i].textContent = gameboard.getSquare(i);
        }
    };
})();

const game = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;

    const playRound = (index) => {
        gameboard.setSquare(index, getPlayerSign());
        round++;
    }

    const getPlayerSign = () => {
        if (round % 2 === 1) {
            return playerX.getSign();
        } else {
            return playerO.getSign();
        }
    }

    return {playRound};
})();