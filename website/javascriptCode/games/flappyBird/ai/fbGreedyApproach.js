const fbGreedyCanvas = document.getElementById('fbGreedyCanvas');
const fbGreedyCtx = fbGreedyCanvas.getContext('2d');
let fbGreedyScore = 'fbGreedyAIScore';

document.getElementById(fbGreedyScore).style.display = 'none';

var fbGreedyGameButton = 'fbGreedyStart';

document.getElementById(fbGreedyGameButton).addEventListener('click',function(){
    document.getElementById(fbGreedyScore).style.display = 'block';
    resetFlappyBird(fbGreedyCanvas, fbGreedyCtx, fbGreedyGameButton, fbGreedyScore, 'GREEDY');
});

function playerFlappyBirdAI() {
    let spaceBarTimeout;

    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            event.preventDefault(); 
            spaceBarPressed = true; 
            velocityY = -(fbGrid / 2); 

            clearTimeout(spaceBarTimeout);
            spaceBarTimeout = setTimeout(() => {
                spaceBarPressed = false; 
            }, 1000);
        }
    });

    function controlBird() {
        if (!spaceBarPressed) {
            greedyFlappyBirdAI();
        }
    }

    setInterval(controlBird, 10);
}

function greedyFlappyBirdAI() {
    var midPoint = ((topPipe.y + fbGrid) + bottomPipe.y) / 2;
    if (bird.y + (fbGrid / 2) > midPoint) {
        velocityY = -(fbGrid / 2);
    }
}