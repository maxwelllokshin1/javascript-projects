const fbGrid = 16;
var fbCount = 0;

let bird = {
    x: fbGrid*2,
    y: 400/2
};

let topPipe = {
    x: 400,
    y: 0
};

let bottomPipe = {
    x: 400,
    y: 0
};

var gravity = 1;
var velocityY = 0;
let flappyBirdLoop;
var movePipes = 5;

function moveBird(){
    velocityY += gravity;
    bird.y += velocityY;

    bird.y = Math.max(bird.y, 0);

    topPipe.x -= movePipes;
    bottomPipe.x -= movePipes;

    if(topPipe.x < -fbGrid*3)
    {
        resetPipes();
        spawnPipes();

    }
}

function resetPipes()
{
    topPipe.x = 400;
    topPipe.y = 0;
    bottomPipe.x = 400;
    bottomPipe.y = 0;
}

function spawnPipes(max, min){
    topPipe.y = getRandomInt(4, 15) * fbGrid;
    bottomPipe.y = topPipe.y + (fbGrid * 6);
}

function drawFlappyBird(canvas, ctx, buttonName){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'green';
    ctx.fillRect(topPipe.x, topPipe.y, fbGrid*3, -(fbGrid*25));
    ctx.fillRect(bottomPipe.x, bottomPipe.y, fbGrid*3, fbGrid*25);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, fbGrid, fbGrid);

    

    checkFBCollision(canvas, ctx, buttonName);
}

function checkFBCollision(canvas, ctx, buttonName){
    if(bird.y > canvas.height) {
        endGame(canvas, ctx, buttonName, flappyBirdLoop);
    }

}

function resetFlappyBird(canvas, ctx, buttonName){
    bird.x = fbGrid*2;
    bird.y = canvas.width/2;
    velocityY = 0;
    resetPipes();
    spawnPipes();
    document.getElementById(buttonName).style.display = 'none';
    startFlappyBird(canvas,ctx, buttonName);
}

function playerFlappyBird(){
    document.addEventListener('keydown', (event)=>{
        if([' '].includes(event.key))
        {
            event.preventDefault();
        }

        if(event.key === ' ') velocityY = -(fbGrid/2);
    });
}

function startFlappyBird(canvas, ctx, buttonName)
{
    document.getElementById(buttonName).style.display = 'none';

    playerFlappyBird();

    function loop(){
        flappyBirdLoop = requestAnimationFrame(loop);
        if(++fbCount < 2)
        {
            return;
        }

        fbCount = 0;

        moveBird();
        drawFlappyBird(canvas, ctx, buttonName);
    }

    flappyBirdLoop = requestAnimationFrame(loop);
}