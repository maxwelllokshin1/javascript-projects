const snakeGreedyCanvas = document.getElementById('snakeGreedyCanvas');
const snakeGreedyContext = snakeGreedyCanvas.getContext('2d');

var snakeGreedyPressStart = 'snakeGreedyStart';

document.getElementById(snakeGreedyPressStart).addEventListener('click', function(){
    resetGame(snakeGreedyContext, snakeGreedyCanvas, snakeGreedyPressStart, 'GREEDY');
});

function moveGreedySnake(){
    if(snake.cells[0] == null) return;
    var head = snake.cells[0];
    const foodX = apple.x;
    const foodY = apple.y;

    if (head.x < foodX) {
        if(snakeDirection !==  'LEFT') snakeDirection = 'RIGHT';
    } else if (head.x > foodX) {
        if(snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
    } else if (head.y < foodY) {
        if(snakeDirection !== 'UP') snakeDirection = 'DOWN';
    } else if (head.y > foodY) {
        if(snakeDirection !== 'DOWN') snakeDirection = 'UP';
    }
}
