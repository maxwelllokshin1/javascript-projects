let pongGameLoop;
let pongCounter = 0;

let pongPlayersWidth = grid / 2;
let pongPlayersHeight = grid * 3;

let playerOne = {
    x: grid,
    y: 400 / 2,
    dy: 0,
    score: 0
};

let playerTwo = {
    x: 400 - grid * 2,
    y: 400 / 2,
    dy: 0,
    score: 0
};

let pongBall = {
    x: 400 / 2,
    y: 400 / 2,
    dx: -grid / 4,
    dy: -grid / 4
};

function drawPongGame(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';

    let midBlocksMoveY = grid;
    for (let i = 0; i < 15; i++) {
        ctx.fillRect(canvas.width / 2, midBlocksMoveY, pongPlayersWidth / 4, grid);
        midBlocksMoveY += grid * 2;
    }

    ctx.font = 'bold 72px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(playerOne.score, canvas.width/4, canvas.height/2);
    ctx.fillText(playerTwo.score, canvas.width- canvas.width/4, canvas.height/2);

    ctx.fillRect(pongBall.x, pongBall.y, grid, grid);

    ctx.fillRect(playerOne.x, playerOne.y, pongPlayersWidth, pongPlayersHeight);
    ctx.fillRect(playerTwo.x, playerTwo.y, pongPlayersWidth, pongPlayersHeight);

}

function moveBall(canvas, ctx, button, choiceAI) {
    pongBall.x += pongBall.dx;
    pongBall.y += pongBall.dy;
    if(collidingBallAndPaddle(playerOne, canvas)) resetPongGame(canvas,ctx,button,choiceAI);
    if(collidingBallAndPaddle(playerTwo, canvas)) resetPongGame(canvas,ctx,button,choiceAI);
}


function collidingBallAndPaddle(paddle, canvas) {
    if (pongBall.y <= paddle.y + pongPlayersHeight && pongBall.y + grid >= paddle.y &&
        pongBall.x <= paddle.x + pongPlayersWidth && pongBall.x + grid >= paddle.x) {
            pongBall.dx = -(pongBall.dx);
    }
    if (pongBall.y <= 0 /*|| (pongBall.y <= paddle.y + pongPlayersHeight && pongBall.x <= paddle.x + pongPlayersWidth && pongBall.x + grid >= paddle.x)*/) {
        pongBall.dy = grid / 4;
    } else if (pongBall.y + grid >= canvas.height /*|| (pongBall.y + grid >= paddle.y && pongBall.x <= paddle.x + pongPlayersWidth && pongBall.x + grid >= paddle.x)*/) {
        pongBall.dy = -grid / 4;
    }

    if (pongBall.x <= 0) {
        playerTwo.score += 1;
        return true;
    } else if (pongBall.x + grid >= canvas.width) {
        playerOne.score += 1;
        return true;
    }
    return false;
}

function pongPlayerOne(canvas, choiceAI) {
    if(choiceAI === 'none'){
        document.addEventListener('mousemove', function (event) {
            const rect = canvas.getBoundingClientRect();
            const mouseY = event.clientY - rect.top;

            playerOne.y = mouseY;
            // playerOne.y = Math.max(0, playerOne.y);
            // playerOne.y = Math.min(playerOne.y, canvas.height - pongPlayersHeight);
        });
    }else if(choiceAI === 'AI'){
        playerOne.y += playerOne.dy;
    }
    playerOne.y = Math.max(0, playerOne.y)
    playerOne.y = Math.min(playerOne.y, canvas.height - pongPlayersHeight);
}

function pongPlayerTwo(canvas) {

    playerTwo.y += playerTwo.dy;
    playerTwo.y = Math.max(0, playerTwo.y)
    playerTwo.y = Math.min(playerTwo.y, canvas.height - pongPlayersHeight);
}

function resetPongGame(canvas, ctx, button, choiceAI) {
    cancelAnimationFrame(pongGameLoop);
    let randX = Math.floor(Math.random() * 2);
    let randY = Math.floor(Math.random() * 2);
    if (randX === 0) { pongBall.dx = -grid / 4; }
    else { pongBall.dx = grid / 4; }
    if (randY === 0) { pongBall.dy = -grid / 4; }
    else { pongBall.dy = grid / 4; }

    pongBall.x = 400 / 2;
    pongBall.y = 400 / 2;

    // playerOne.y = 400 / 2;
    // playerTwo.y = 400 / 2;

    playerOne.dy = 0;
    playerTwo.dy = 0;

    startPongGame(canvas, ctx, button, choiceAI);
}

function startPongGame(canvas, ctx, button, choiceAI) {
    let randMove = 0;
    // setInterval(() => {
        // playerTwo.dy = 0;
        // randMove = Math.floor(Math.random()*2);
        // if (randMove === 0) {
        //     playerTwo.dy = -grid;
        // } else {
        //     playerTwo.dy = grid;
        // }

    //     if(pongBall.y < playerTwo.y + pongPlayersHeight/2)
    //         {
    //             playerTwo.dy = -grid;
    //         }else if(pongBall.y > playerTwo.y + pongPlayersHeight/2){
    //             playerTwo.dy = grid;
    //         }

    // }, 500);
    setInterval(()=>{

        if(choiceAI === 'AI')
        {
            if(pongBall.x <= canvas.width/2){
                if (pongBall.y > playerOne.y + pongPlayersHeight || pongBall.y + grid < playerOne.y) {
                    if(pongBall.y < playerOne.y + pongPlayersHeight){
                        playerOne.dy = -grid;
                    }else if (pongBall.y + grid > playerOne.y) {
                        playerOne.dy = grid;
                    }
                }else{
                    playerOne.dy = 0;
                }
            }else{
                // playerOne.dy = 0;
                randMove = Math.floor(Math.random()*4);
                if (randMove === 0) {
                    playerOne.dy = -grid;
                } else if(randMove === 1){
                    playerOne.dy = grid;
                }else if(randMove === 2 || randMove === 3){
                    playerOne.dy = 0;
                }
            }
        }


        if(pongBall.x >= canvas.width/2){
            if (pongBall.y > playerTwo.y + pongPlayersHeight || pongBall.y + grid < playerTwo.y) {
                if(pongBall.y < playerTwo.y + pongPlayersHeight){
                    playerTwo.dy = -grid;
                }else if (pongBall.y + grid > playerTwo.y) {
                    playerTwo.dy = grid;
                }
            }else{
                playerTwo.dy = 0;
            }
        }else{
            // playerTwo.dy = 0;
            randMove = Math.floor(Math.random()*4);
            if (randMove === 0) {
                playerTwo.dy = -grid;
            } else if(randMove === 1){
                playerTwo.dy = grid;
            }else if(randMove === 2 || randMove === 3){
                playerTwo.dy = 0;
            }
        }
    }, 250);

    function pongLoop() {
        pongGameLoop = requestAnimationFrame(pongLoop);

        // if(++pongCounter < 4){
        //     return;
        // }
        // pongCounter = 0;

        pongPlayerOne(canvas, choiceAI);

        pongPlayerTwo(canvas);

        moveBall(canvas, ctx, button, choiceAI);
        drawPongGame(canvas, ctx);
    }

    pongGameLoop = requestAnimationFrame(pongLoop);
}