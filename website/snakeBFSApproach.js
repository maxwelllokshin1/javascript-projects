const snakeBFSCanvas = document.getElementById('snakeBFSCanvas');
const snakeBFSContext = snakeBFSCanvas.getContext('2d');

var snakeBFSPressStart = 'snakeBFSStart';

document.getElementById(snakeBFSPressStart).addEventListener('click', function(){
    resetGame(snakeBFSContext, snakeBFSCanvas, snakeBFSPressStart, 'BFS');
});

function bfsPathFinding(){
    if(snake.cells[0] == null) return [];
    const head = snake.cells[0];
    const visited = new Set();
    const queue = [{position: head, path: []}];
    visited.add(`${head.x},${head.y}`);

    while(queue.length > 0)
    {
        const{position, path} = queue.shift();
        const directions = [
            { x: 0, y: -grid},
            { x: 0, y: grid},
            { x: -grid, y: 0},
            { x: grid, y: 0},

        ];

        for(const dir of directions)
        {
            const newPos = { x: position.x + dir.x, y: position.y + dir.y};

            if(isValidMove(newPos) && !visited.has(`${newPos.x},${newPos.y}`))
            {
                const newPath = [...path, dir];

                if(newPos.x === apple.x && newPos.y === apple.y)
                {
                    return newPath;
                }

                queue.push({ position: newPos, path: newPath});
                visited.add(`${newPos.x},${newPos.y}`);
            }
        }
    }
    return [];
}

function isValidMove(pos){
    if(pos.x < 0 || pos.x >= snakeBFSCanvas.width - grid ||
       pos.y < 0 || pos.y >= snakeBFSCanvas.height - grid){
        return false;
    }

    snake.cells.forEach(function (index) {
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (pos.x === snake.cells[i].x && pos.y === snake.cells[i].y) {
                return false;
            }
        }
    });
    return true;
}

function moveBFSSnake(){
    const path = bfsPathFinding();

    if(path.length > 0){
        const nextMove = path[0];
        if (nextMove.x === 0 && nextMove.y === -grid) snakeDirection = 'UP';
        if (nextMove.x === 0 && nextMove.y === grid) snakeDirection = 'DOWN';
        if (nextMove.x === -grid && nextMove.y === 0) snakeDirection = 'LEFT';
        if (nextMove.x === grid && nextMove.y === 0) snakeDirection = 'RIGHT';
    }
}
