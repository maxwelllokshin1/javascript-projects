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
    if(collidingBallAndPaddle(playerOne, canvas) || collidingBallAndPaddle(playerTwo, canvas)) resetPongGame(canvas,ctx,button,choiceAI);
}


function collidingBallAndPaddle(paddle, canvas) {
    const ballHitsPaddle = pongBall.y <= paddle.y + pongPlayersHeight && pongBall.y + grid >= paddle.y &&
    pongBall.x <= paddle.x + pongPlayersWidth && pongBall.x + grid >= paddle.x;
    if (ballHitsPaddle) {
            pongBall.dx = -pongBall.dx;
            if (pongBall.y + grid <= paddle.y + pongPlayersHeight / 3) {
                pongBall.dy = -Math.abs(pongBall.dy); // Top of the paddle
                pongBall.dx = -pongBall.dx;
            } else if (pongBall.y >= paddle.y + pongPlayersHeight * 2 / 3) {
                pongBall.dy = Math.abs(pongBall.dy); // Bottom of the paddle
                pongBall.dx = -pongBall.dx;
            }
    }
    if (pongBall.y <= 0 ) pongBall.dy = grid / 4;
    if (pongBall.y + grid >= canvas.height ) pongBall.dy = -grid / 4;

    if (pongBall.x <= 0) {
        playerTwo.score += 1;
        return true;
    } else if (pongBall.x + grid >= canvas.width) {
        playerOne.score += 1;
        return true;
    }
    return false;
}

function pongPlayerMovement(player, canvas, choiceAI){
    if(choiceAI === 'none'){
        document.addEventListener('mousemove', function (event) {
            const rect = canvas.getBoundingClientRect();
            player.y = event.clientY - rect.top;
        });
    }else if (choiceAI === 'AI'){ player.y += player.dy; }
    player.y = Math.max(0, Math.min(player.y, canvas.height - pongPlayersHeight));
}


function resetPongGame(canvas, ctx, button, choiceAI) {
    cancelAnimationFrame(pongGameLoop);

    playerOne = {
        x: grid,
        y: playerOne.y,
        dy: 0,
        score: playerOne.score
    };
    playerTwo = {
        x: canvas.width - grid * 2 - pongPlayersWidth,
        y: canvas.height / 2 - pongPlayersHeight / 2,
        dy: 0,
        score: playerTwo.score
    };
    pongBall = {
        x: canvas.width / 2 - grid / 2,
        y: canvas.height / 2 - grid / 2,
        dx: Math.random() > 0.5 ? grid / 4 : -grid / 4,
        dy: Math.random() > 0.5 ? grid / 4 : -grid / 4
    };

    startPongGame(canvas, ctx, button, choiceAI);
}

function startPongGame(canvas, ctx, button, choiceAI) {
    let randMove = 0;
    setInterval(()=>{

        if(choiceAI === 'AI')
        {
            if(pongBall.x <= canvas.width/2){
                // if (pongBall.y > playerOne.y + pongPlayersHeight || pongBall.y + grid < playerOne.y) {
                //     playerOne.dy = pongBall.y < playerOne.y + pongPlayersHeight ? -grid : grid;
                // } else {
                //     playerOne.dy = 0;
                // }
                let projectedBallX = pongBall.x;
                let projectedBallY = pongBall.y;
                while(projectedBallX > grid && projectedBallX < canvas.width - grid*2)
                {
                    projectedBallX += pongBall.dx;
                    projectedBallY += pongBall.dy;
                }

                // console.log('projectedBallX: ' + projectedBallX + ' projectedBallY:' + projectedBallY);

                // move to projected spot

                if(playerOne.y <= projectedBallY && playerOne.y + pongPlayersHeight >= projectedBallY) playerOne.dy = 0;
                else if(playerOne.y  < projectedBallY) playerOne.dy = grid;
                else if(playerOne.y + pongPlayersHeight/2 > projectedBallY) playerOne.dy = -grid;
            }else{
                randMove = Math.floor(Math.random()*4);
                if (randMove === 0)playerOne.dy = -grid;
                else if(randMove === 1)playerOne.dy = grid;
                else playerOne.dy = 0;
            }
        }

        if (pongBall.x >= canvas.width / 2) {
            // if (pongBall.y > playerTwo.y + pongPlayersHeight || pongBall.y + grid < playerTwo.y) {
            //     if(pongBall.y -grid <= playerTwo.y + pongPlayersHeight/2){
            //         console.log('less');
            //         playerTwo.dy = -grid;
            //     }else if(pongBall.y >= playerTwo.y){
            //         console.log('greater');
            //         playerTwo.dy = grid;
            //     }
            // } else {
            //     playerTwo.dy = 0;
            // }

            // create projected path
            let projectedBallX = pongBall.x;
            let projectedBallY = pongBall.y;
            while(projectedBallX > grid && projectedBallX < canvas.width - grid*2)
            {
                projectedBallX += pongBall.dx;
                projectedBallY += pongBall.dy;
            }

            // console.log('projectedBallX: ' + projectedBallX + ' projectedBallY:' + projectedBallY);

            // move to projected spot

            if(playerTwo.y <= projectedBallY && playerTwo.y + pongPlayersHeight >= projectedBallY) playerTwo.dy = 0;
            else if(playerTwo.y  < projectedBallY) playerTwo.dy = grid;
            else if(playerTwo.y + pongPlayersHeight/2 > projectedBallY) playerTwo.dy = -grid;


        } else {
            randMove = Math.floor(Math.random() * 4);
            if (randMove === 0) playerTwo.dy = -grid;
            else if (randMove === 1) playerTwo.dy = grid;
            else playerTwo.dy = 0;
        }
    }, 1);

    function pongLoop() {
        pongGameLoop = requestAnimationFrame(pongLoop);

        // if(++pongCounter < 4){
        //     return;
        // }
        // pongCounter = 0;

        pongPlayerMovement(playerOne, canvas, choiceAI);

        pongPlayerMovement(playerTwo, canvas, 'AI');

        moveBall(canvas, ctx, button, choiceAI);
        drawPongGame(canvas, ctx);
    }

    pongGameLoop = requestAnimationFrame(pongLoop);
}