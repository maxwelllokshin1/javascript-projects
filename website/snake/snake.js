var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

var snakeDirection;

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

    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;

    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

var change = 0;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // draw snake one cell at a time
    snake.cells.forEach(function (cell, index) {

        if (change === 0) {
            context.fillStyle = '#45e34a';
            change = 1;
        } else if (change === 1) {
            context.fillStyle = '#208823';
            change = 0;
        }

        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells += 3;

            // canvas is 400x400 which is 25x25 grids 
            placeApple();
        }

        gameOverChecker(cell, index);
    });
}

function gameOverChecker(cell, index) {
    var head = snake.cells[0];
    if (head.x < 0 || head.y < 0 ||
        head.x > canvas.width - grid || head.y > canvas.height - grid) {
        resetGame();
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
        // snake occupies same space as a body part. reset game
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    placeApple();
    // document.getElementById('startButton').disabled = false;
}

function placeApple() {
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}

document.getElementById('startButton').addEventListener('click', function(){
    startGame();
});

function startGame()
{
    snakeDirection = 'RIGHT';
    document.getElementById('startButton').style.display = 'none';
    // listen to keyboard events to move the snake
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
        requestAnimationFrame(loop);
    
        // slow game loop to 15 fps instead of 60 (60/15 = 4)
        if (++count < 4) {
            return;
        }
    
        count = 0;
    
        moveSnake();
        draw();
    }
    
    // start the game
    requestAnimationFrame(loop);
}
