function endGame(canvas, ctx, buttonName, loops)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById(buttonName).style.display = 'block';
    cancelAnimationFrame(loops);
}
