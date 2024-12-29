const snakeGameCanvas = document.getElementById('snakeCanvas');
const snakeGameContext = snakeGameCanvas.getContext('2d');

var snakeGamePressStart = 'snakeStart';

document.getElementById(snakeGamePressStart).addEventListener('click', function(){
    resetSnake(snakeGameContext, snakeGameCanvas, snakeGamePressStart, 'NONE');
});
