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
    const playerTurn = document.querySelector('.playerTurn');
    
    squares.forEach( square => {
        square.addEventListener('click', (event) => {
            if ( game.isEndGame() || gameboard.getSquare(event.target.dataset.index) !== '' ) return;
            game.playRound(parseInt(event.target.dataset.index))
            renderSquareContent();
        })
    })

    restartButton.addEventListener('click', () => {
        gameboard.resetGrid();
        game.restartGame();
        renderSquareContent();
        setMessage("Player X turn");
    });

    const renderSquareContent = () => {
        for ( let i = 0; i < squares.length; i++) {
            squares[i].textContent = gameboard.getSquare(i);
        }
    };

    const setMessage = ( message ) => {
        playerTurn.textContent = message;
    }

    return { setMessage }

})();

const game = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let gameEndedWithWinner = false;

    const playRound = (index) => {
        gameboard.setSquare(index, getPlayerSign());
        if( round >= 5 ) {
            checkWinner(index);
        }

        if( !gameEndedWithWinner && round !== 9 ) {
            round++;
            displayController.setMessage(`Player ${getPlayerSign()} turn`);
        } else if ( round === 9 ) {
            displayController.setMessage(`Tie`);
        }
    }

    const getPlayerSign = () => {
        if (round % 2 === 1) {
            return playerX.getSign();
        } else {
            return playerO.getSign();
        }
    };

    const checkWinner = (index) => {
        const winnableSituations = [    
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const subarraysWithThree = winnableSituations.filter(subarray => subarray.includes(index));
        
        subarraysWithThree.forEach(subarray => {
            const isWinningSituation = subarray.every(squareIndex => gameboard.getSquare(squareIndex) === getPlayerSign());
            if (isWinningSituation) {
                displayController.setMessage(`Player ${getPlayerSign()} has won!`);
                gameEndedWithWinner = true;
            }
        });
    };

    const isEndGame = () => {
        return gameEndedWithWinner;
    }

    const restartGame = () => {
        round = 1;
        gameEndedWithWinner = false;
    }

    return {playRound, isEndGame, restartGame};
})();