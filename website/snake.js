const grid = 16;
let count = 0;

let snake = {
    x: 160,
    y: 160,

    dx: grid,
    dy: 0,

    cells: [],

    maxCells: 4
};
let apple = {
    x: 320,
    y: 320
};

let snakeDirection;
let gameLoop;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function moveSnake()
{
    if (snakeDirection === 'RIGHT') { snake.dx = grid; snake.dy = 0; }
    if (snakeDirection === 'LEFT') { snake.dx = -grid; snake.dy = 0; }
    if (snakeDirection === 'UP') { snake.dx = 0; snake.dy = -grid; }
    if (snakeDirection === 'DOWN') { snake.dx = 0; snake.dy = grid; }

    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

let changeColor = 0;

function draw(ctx,canvas, buttonName) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    snake.cells.forEach(function (cell, index) {

        if (changeColor === 0) {
            ctx.fillStyle = '#45e34a';
            changeColor = 1;
        } else if (changeColor === 1) {
            ctx.fillStyle = '#208823';
            changeColor = 0;
        }

        ctx.fillRect(cell.x, cell.y, grid, grid);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells += 3;

            placeApple();
        }

        gameOverChecker(cell, index, ctx, canvas, buttonName);
    });
}

function gameOverChecker(cell, index, ctx, canvas, buttonName) {
    let head = snake.cells[0];
    if (head.x < 0 || head.x > canvas.width - grid ||
        head.y < 0 || head.y > canvas.height - grid) {
            endGame(canvas, ctx, buttonName, gameLoop);
    }
    for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            endGame(canvas, ctx, buttonName, gameLoop);
        }
    }
}

function resetSnake(ctx, canvas, buttonName, choiceAI) {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = 0;
    snake.dy = 0;
    placeApple();
    document.getElementById(buttonName).style.display = 'none';
    startSnake(ctx, canvas, buttonName, choiceAI);
}

function placeApple() {

    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}

function appleOnSnake()
{
    for (let i = 0; i < snake.cells.length; i++) {
        if (apple.x === snake.cells[i].x && apple.y === snake.cells[i].y) {
            return true;
        }
    }
    return false;
}

function playerMoves(){
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
}

function startSnake(ctx, canvas, buttonName, choiceAI)
{
    snakeDirection = 'RIGHT';
    document.getElementById(buttonName).style.display = 'none';

    function loop() {
        gameLoop = requestAnimationFrame(loop);
    
        switch(choiceAI){
            case "GREEDY":
                console.log("GREEDY");
                moveGreedySnake();
                break;
            case "BFS":
                console.log("BFS");
                moveBFSSnake();
                break;
            default:
                playerMoves();
                break;
        }
        if (++count < 4) {
            return;
        }
    
        count = 0;
        moveSnake();
        draw(ctx, canvas, buttonName);
    }
    
    gameLoop = requestAnimationFrame(loop);
}
