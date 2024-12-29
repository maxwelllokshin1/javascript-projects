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
var pipeSpeed = 0;
var passedPipe = false;
var score = 1;
var fbScoreValue;

function moveBird(){
    velocityY += gravity;
    bird.y += velocityY;

    bird.y = Math.max(bird.y, 0);

    topPipe.x -= pipeSpeed;
    bottomPipe.x -= pipeSpeed;

    if(!passedPipe && topPipe.x < bird.x)
    {
        passedPipe = true;
        score += 1;
        // if(score % 5 === 0) { pipeSpeed += 2; }
    }
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
    passedPipe = false;
}

function spawnPipes(max, min){
    topPipe.y = getRandomInt(4, 15) * fbGrid;
    bottomPipe.y = topPipe.y + (fbGrid * 6);
}

function drawFlappyBird(canvas, ctx, buttonName, scoreBoard){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'green';
    ctx.fillRect(topPipe.x, topPipe.y, fbGrid*3, -(fbGrid*25));
    ctx.fillRect(bottomPipe.x, bottomPipe.y, fbGrid*3, fbGrid*25);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, fbGrid, fbGrid);

    fbScoreValue.textContent = 'SCORE: ' + score;
    if(spaceBarPressed)
    {
        fbScoreValue.textContent += ' PLAYER';
    }else
    {
        fbScoreValue.textContent += ' AI';
    }
    

    checkFBCollision(canvas, ctx, buttonName, scoreBoard);
}

function checkFBCollision(canvas, ctx, buttonName, scoreBoard){
    if(bird.y > canvas.height) {
        endGame(canvas, ctx, buttonName, flappyBirdLoop);
        document.getElementById(scoreBoard).style.display = 'none';
    }

    if(bird.x < topPipe.x+(fbGrid*3) && bird.x+fbGrid > topPipe.x &&
       bird.y < topPipe.y && bird.y + fbGrid > topPipe.y -(fbGrid*25)){
        endGame(canvas, ctx, buttonName, flappyBirdLoop);
        document.getElementById(scoreBoard).style.display = 'none';
    }

    if(bird.x < bottomPipe.x+(fbGrid*3) && bird.x+fbGrid > bottomPipe.x &&
       bird.y > bottomPipe.y && bird.y + fbGrid < bottomPipe.y +(fbGrid*25)){
        endGame(canvas, ctx, buttonName, flappyBirdLoop);
        document.getElementById(scoreBoard).style.display = 'none';
    }
}

function resetFlappyBird(canvas, ctx, buttonName, scoreBoard, choiceAI){

    fbScoreValue = document.getElementById(scoreBoard);
    bird.x = fbGrid*2;
    bird.y = canvas.width/2;
    velocityY = 0;
    score = 0;
    passedPipe = false;

    switch(choiceAI)
        {
            case 'GREEDY':
                spaceBarPressed = false;
                break;
            default:
                spaceBarPressed = true;
                break;
        }


    pipeSpeed = 10;
    resetPipes();
    spawnPipes();
    document.getElementById(buttonName).style.display = 'none';
    startFlappyBird(canvas,ctx, buttonName, choiceAI, scoreBoard);
}


let spaceBarPressed = false;

function startFlappyBird(canvas, ctx, buttonName, choiceAI, scoreBoard)
{
    document.getElementById(buttonName).style.display = 'none';

    function loop(){
        flappyBirdLoop = requestAnimationFrame(loop);
        if(++fbCount < 2)
        {
            return;
        }

        fbCount = 0;

        switch(choiceAI)
        {
            case 'GREEDY':
                playerFlappyBirdAI();
                break;
            default:
                playerFlappyBird();
                break;
        }
        moveBird();
        drawFlappyBird(canvas, ctx, buttonName, scoreBoard);
    }

    flappyBirdLoop = requestAnimationFrame(loop);
}