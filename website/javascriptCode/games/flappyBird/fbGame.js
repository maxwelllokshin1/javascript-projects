const fbCanvas = document.getElementById('fbCanvas');
const fbCtx = fbCanvas.getContext('2d');
let fbScore = 'fbScore';

document.getElementById(fbScore).style.display = 'none';

var fbGameButton = 'fbStart';

document.getElementById(fbGameButton).addEventListener('click',function(){
    document.getElementById(fbScore).style.display = 'block';
    resetFlappyBird(fbCanvas, fbCtx, fbGameButton, fbScore, 'none');
});

function playerFlappyBird() {

    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            event.preventDefault(); 
            spaceBarPressed = true; 
            velocityY = -(fbGrid / 2); 
        }
    });
}