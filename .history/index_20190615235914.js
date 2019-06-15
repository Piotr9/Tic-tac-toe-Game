const player1 = 'fa-circle-o';
const player2 = 'fa-times';
let round = 1;
let winner = null;
const board =[
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click',pick));

function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? player2 : player1;
    if (board[row][column] !== ''||winner !== null) return;

    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;

    console.log(check());
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null );
    combinations.forEach(combinations => {
        if(combinations.every(index => moves[player1].indexOf(index) > -1)) {
            winner = 'Winner: Player 1';
            document.getElementsById("end").setAttribute("visibility", "visible");
            document.getElementById("x").innerHTML = 'O';
        }
        if(combinations.every(index => moves[player2].indexOf(index) > -1)) {
            winner = 'Winner: Player 2';
            document.getElementsById("end").setAttribute("visibility", "visible");
            document.getElementById("x").innerHTML = 'X';
        }
    })
    return winner;
}
