const fbCanvas = document.getElementById('fbCanvas');
const fbCtx = fbCanvas.getContext('2d');

var fbGameButton = 'fbStart';

document.getElementById(fbGameButton).addEventListener('click',function(){
    resetFlappyBird(fbCanvas, fbCtx, fbGameButton);
});