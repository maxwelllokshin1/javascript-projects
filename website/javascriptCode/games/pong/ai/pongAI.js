const pongAIGameCanvas = document.getElementById('pongAIGameCanvas');
const pongAIGameCtx = pongAIGameCanvas.getContext('2d');

var pongAIGameButton = 'pongAIGameStart';

document.getElementById(pongAIGameButton).addEventListener('click', function(){
    document.getElementById(pongAIGameButton).style.display = 'none';
    resetPongGame(pongAIGameCanvas, pongAIGameCtx, pongAIGameButton, 'AI');
});