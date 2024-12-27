const snakeGameCanvas = document.getElementById('snakeCanvas');
const snakeGameContext = snakeGameCanvas.getContext('2d');

var snakeGamePressStart = 'snakeStart';

document.getElementById(snakeGamePressStart).addEventListener('click', function(){
    resetGame(snakeGameContext, snakeGameCanvas, snakeGamePressStart, 'NONE');
});
