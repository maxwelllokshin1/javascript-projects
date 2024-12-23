# javascript-projects

<img width="1127" alt="image" src="https://github.com/user-attachments/assets/41f29571-0888-43b1-9075-09f4c21d3154" />



- Made using HTML, CSS, JavaScript
- Created it one website **DOMAIN COMING SOON**
- All projects such as games, AI, and full stack projects will be posted on the website
- **WEBSITE STILL IN PROGRESS**

## CODE

### HTML
```sh
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNAKE</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">HOME</a></li>
                <li><a href="#snek">SNAKE</a></li>
            </ul>
        </nav>
    </header>

    <section id = "home">
        <div class = "hero">
            <h1>WEBSITE MAX</h1>
            <p>games and stuff...</p>
        </div>
    </section>

    <section id = "snek">
        <div class = "gameScreen">
            <h1>SNAKE</h1>
            <p>snake game here...</p>

            <div id="snakeCanvas">
                <canvas width="400" height="400" id="game"></canvas>
                <menu id="startButton">START GAME</menu>
            </div>
        </div>
    </section>
    <script src="snake.js"></script>
</body>
</html>
```

### CSS
```sh
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', snas-serif;
    line-height: 1.6;
    background-color: #d0d0d0;
    color: #333;
    /* display: flex;
    align-items: center;
    justify-content: center; */
}

header {
    background-color: #222;
    padding: 20px 0;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
}

nav ul{
    display: flex;
    justify-content: center;
    list-style: none;
}

nav ul li{
    margin: 0 20px;
}

nav ul li a{
    color: #f9f9f9;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s ease;
}

nav ul li a:hover {
    color: #006f02;
}

.hero {
    text-align: center;
    background-color: #00ad05;  /* Green background */
    color: white;
    padding: 80px 20px;
    border-radius: 25px;
}

.hero h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

.hero p {
    font-size: 1.2em;
    margin-bottom: 30px;
}

section {
    padding: 60px 20px;
    text-align: center;
}

section h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

#snek{
    text-align:left;
}

.gameScreen {
    background-color: white;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: inline-block;
    width: calc(33% - 40px);
    
    text-align:center;
}

.gameScreen h3 {
    font-size: 1.8em;
    margin-bottom: 10px;
}

#snakeCanvas {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0 auto;
}

menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the button */
    padding: 12px 30px;
    background-color: #000;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 10; /* Ensure it's above the canvas */
}

menu:hover {
    background-color: #006f02;
}

canvas {
    background-color: #333;
    border: 1px solid white;
    border-radius: 25px;
    z-index: 1; /* Canvas is below the button */
}
```

## SNAKE
<img width="331" alt="image" src="https://github.com/user-attachments/assets/3e8508a9-060d-4595-9722-d16662e5a261" />

### JAVASCRIPT FOR SNAKE CODE
```sh
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

```
