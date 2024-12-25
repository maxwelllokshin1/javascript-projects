var canvas = document.getElementById('snakeCanvas');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    dx: grid,
    dy: 0,

    cells: [],

    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

var snakeDirection;
var gameLoop;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function moveSnake()
{
    if (snakeDirection === 'RIGHT') { snake.dx = grid; snake.dy = 0; }
    if (snakeDirection === 'LEFT') { snake.dx = -grid; snake.dy = 0; }
    if (snakeDirection === 'UP') { snake.dx = 0; snake.dy = -grid; }
    if (snakeDirection === 'DOWN') { snake.dx = 0; snake.dy = grid; }
    if (snakeDirection === 'SPACE') {snake.dx = 0; snake.dy = 0;}

    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

var change = 0;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    snake.cells.forEach(function (cell, index) {

        if (change === 0) {
            context.fillStyle = '#45e34a';
            change = 1;
        } else if (change === 1) {
            context.fillStyle = '#208823';
            change = 0;
        }

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells += 3;

            placeApple();
        }

        gameOverChecker(cell, index);
    });
}

function gameOverChecker(cell, index) {
    var head = snake.cells[0];
    if (head.x < 0 || head.x > canvas.width - grid 
     || head.y < 0 || head.y > canvas.height - grid) {
            endGame();
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            endGame();
        }
    }
}

function endGame()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('snakeStart').style.display = 'block';
    cancelAnimationFrame(gameLoop);
}

function resetGame() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = 0;
    snake.dy = 0;
    placeApple();
    document.getElementById('snakeStart').style.display = 'none';
    startGame();
}

function placeApple() {
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}

document.getElementById('snakeStart').addEventListener('click', function(){
    resetGame();
});

function startGame()
{
    snakeDirection = 'RIGHT';
    document.getElementById('snakeStart').style.display = 'none';
    document.addEventListener('keydown', (event) => {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key))
        {
            event.preventDefault();
        }

        if (event.key === 'ArrowUp' && snakeDirection !== 'DOWN') snakeDirection = 'UP';
        if (event.key === 'ArrowDown' && snakeDirection !== 'UP') snakeDirection = 'DOWN';
        if (event.key === 'ArrowLeft' && snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
        if (event.key === 'ArrowRight' && snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
    });

    function loop() {
        gameLoop = requestAnimationFrame(loop);
    
        if (++count < 4) {
            return;
        }
    
        count = 0;
    
        moveSnake();
        draw();
    }
    
    gameLoop = requestAnimationFrame(loop);
}
