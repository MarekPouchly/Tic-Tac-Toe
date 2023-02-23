const Player = (name, square) => {

}

const gameboard = (() => {
    const board = [];
    for( let i = 0; i < 9; i++) {
        board.push('X');
    }

    const getSymbol = (index) => {
        return board[index];
    }

    return {getSymbol};

})();

const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    
    squares.forEach( square => {
        square.addEventListener('click', (event) => {
            console.log(event.target.dataset.index)
            renderContent();
        })
    })

    const renderContent = () => {
        for ( let i = 0; i < squares.length; i++) {
            squares[i].textContent = gameboard.getSymbol(i);
        }
    }; 
})();