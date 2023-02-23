const Player = (name, square) => {

}

const gameboard = (() => {
    const board = [];
    for( let i = 0; i < 9; i++) {
        board.push('X');
    }
})();

const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    
    squares.forEach( square => {
        square.addEventListener('click', (event) => {
            console.log(event.target.dataset.index)
        })
    })
})();