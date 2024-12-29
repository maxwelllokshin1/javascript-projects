const tttCanvas = document.getElementById('tttCanvas');
const tttCtx = tttCanvas.getContext('2d');

const tttGrid = 100;

var switchPlayers = 0;

// 0 is player
// 1 is ai

let board = [
    spaces = 25,
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function drawTicTacToe()
{
    tttCtx.fillStyle = 'black';
    tttCtx.fillRect(0,0, tttCanvas.width, tttCanvas.height)
    
    tttCtx.fillStyle = 'white';
    var moveX = spaces;
    var moveY = spaces;

    for(var i = 0; i<3; i++)
    {
        for(var j = 0; j<3; j++)
        {
            tttCtx.fillRect(moveX, moveY, tttGrid, tttGrid);
            moveX += tttGrid + spaces;
        }
        moveX = spaces;
        moveY += tttGrid + spaces;
    }
}

document.getElementById('tttStart').addEventListener('click',function(){
    document.getElementById('tttStart').style.display = 'none';
    drawTicTacToe();
});