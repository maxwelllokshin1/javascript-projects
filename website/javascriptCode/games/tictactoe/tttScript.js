const tttCanvas = document.getElementById('tttCanvas');
const tttCtx = tttCanvas.getContext('2d');

const tttGrid = 100;
const spaces = 25;

var currentPlayer = 0;

var startOfGame = 1;
var gameOver = false;

// 0 is player
// 1 is ai

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function drawTicTacToe() {
    tttCtx.fillStyle = '#727272';
    tttCtx.fillRect(0, 0, tttCanvas.width, tttCanvas.height);

    tttCtx.strokeStyle = 'black';
    tttCtx.strokeStyle = 25;
    var moveX = spaces;
    var moveY = spaces;

    // tttCtx.strokeStyle = gradient;
    tttCtx.lineWidth = 4;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            tttCtx.strokeRect(moveX, moveY, tttGrid, tttGrid);
            moveX += tttGrid + spaces;
        }
        moveX = spaces;
        moveY += tttGrid + spaces;
    }

    gameOver = false;
}

function drawSymbol(x, y, symbol) {
    let centerX = x * (tttGrid + spaces) + tttGrid / 2 + spaces;
    let centerY = y * (tttGrid + spaces) + tttGrid / 2 + spaces;

    tttCtx.font = '48px sans-serif';
    tttCtx.textAlign = 'center';
    tttCtx.textBaseline = 'middle';

    tttCtx.strokeStyle = 'black';
    tttCtx.lineWidth = 25;
    if (symbol === 'X') {
        tttCtx.beginPath();
        tttCtx.moveTo(centerX - 30, centerY - 30);
        tttCtx.lineTo(centerX + 30, centerY + 30);
        tttCtx.moveTo(centerX + 30, centerY - 30);
        tttCtx.lineTo(centerX - 30, centerY + 30);
        tttCtx.stroke();
    } else if (symbol === 'O') {
        tttCtx.beginPath();
        tttCtx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        tttCtx.stroke();
    }
}


function clearCell(x, y) {
    tttCtx.clearRect(x * (tttGrid + spaces) + spaces, y * (tttGrid + spaces) + spaces, tttGrid, tttGrid);
}

function handleClick(event) {

    const rect = tttCanvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left - spaces) / (tttGrid + spaces));
    const y = Math.floor((event.clientY - rect.top - spaces) / (tttGrid + spaces));


    if (currentPlayer === 0 && !gameOver) {
        if (board[y][x] === ' ') {
            if (startOfGame === 1) { startOfGame = 0; }
            board[y][x] = 'X';
            drawSymbol(x, y, 'X');
            currentPlayer = 1;
            tttEndGame();
            if (currentPlayer === 1 && !gameOver) {
                setTimeout(() => {
                    placeO();
                    currentPlayer = 0;
                    tttEndGame();
                }, 1000);
            }
        }
    }

    tttEndGame();



}

function checkWinningMove(row, col, player) {
    board[row][col] = player;

    const win = checkWinner();

    board[row][col] = ' ';

    return win === player;
}

function placeO() {

    // check if o is close to a win

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(board[i][j] === ' ' && checkWinningMove(i, j, 'O'))
            {
                board[i][j] = 'O';
                drawSymbol(j, i, 'O');
                return;
            }
        }
    }

    // check if x is close to a win

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(board[i][j] === ' ' && checkWinningMove(i, j,'X'))
            {
                board[i][j] = 'O';
                drawSymbol(j, i, 'O');
                return;
            }
        }
    }

    // default to random
    let col = Math.floor(Math.random() * 3);
    let row = Math.floor(Math.random() * 3);
    while (board[row][col] !== ' ') {
        col = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
    }

    board[row][col] = 'O';
    drawSymbol(col, row, 'O');
    return;
}

function tttEndGame() {
    var winner = checkWinner();

    if (winner) {
        gameOver = true;
        currentPlayer = 2;
        displayWinner(winner);
        document.addEventListener('keydown', (event) => {
            if ([' '].includes(event.key)) {
                event.preventDefault();
            }

            if (event.key === ' ') resetTTTGame();
        });
    }
}




function resetTTTGame() {
    tttCtx.clearRect(0, 0, tttCanvas.width, tttCanvas.height);
    currentPlayer = 0;

    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    startOfGame = 1;

    drawTicTacToe();
}

function checkALL(row, col) {
    if (col == 3) { col = 0; row += 1; }
    if (row == 3) return true;
    return checkALL(row, col + 1) && board[row][col] !== ' ';
}

function checkWinner() {

    for (let row = 0; row < 3; row++) {
        if (board[row][0] !== ' ' && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return board[row][0];
        }
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== ' ' && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col];
        }
    }

    if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }

    if (board[2][0] !== ' ' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        return board[2][0];
    }

    if (startOfGame === 0) {
        if (checkALL(0, 0)) {
            return ' ';
        }
    }

    return null;
}

function displayWinner(winner) {
    tttCtx.font = 'bold 72px sans-serif';
    tttCtx.textAlign = 'center';
    tttCtx.textBaseline = 'middle';
    tttCtx.fillStyle = 'white';

    if (winner === ' ') {
        tttCtx.fillText("Tie", tttCanvas.width / 2, tttCanvas.height / 2);
    } else {
        tttCtx.fillText(winner + " Wins!", tttCanvas.width / 2, tttCanvas.height / 2);
    }
}

// Start the game and initialize the canvas
document.getElementById('tttStart').addEventListener('click', function () {
    document.getElementById('tttStart').style.display = 'none';
    drawTicTacToe();
    tttCanvas.addEventListener('click', handleClick); // Listen for player clicks
});
