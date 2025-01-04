const pongGameCanvas = document.getElementById('pongGameCanvas');
const pongGameCtx = pongGameCanvas.getContext('2d');

var pongGameButton = 'pongGameStart';

document.getElementById(pongGameButton).addEventListener('click', function(){
    document.getElementById(pongGameButton).style.display = 'none';
    resetPongGame(pongGameCanvas, pongGameCtx, pongGameButton, 'none');
});