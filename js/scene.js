function start() {

    if (jumpProcess != null) clearInterval(jumpProcess)
    if (moveProcess != null) clearInterval(moveProcess)

    if (level < levelMap.length) {
        drawInfo()
        createObstacles(level)
        setTimeout(fallDown, 1)
    } else {
        setTimeout(win, 1)
    }

}

function reset() {
    if (inMenu)
        return;
    drawInfo()
    setTimeout(fallDown, 1)

    //fallDown()
    isStart = true;
}


function win() {
    if (jumpProcess != null) clearInterval(jumpProcess)
    if (moveProcess != null) clearInterval(moveProcess)

    isStart = false;
    isWin = true;
    isJumping = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);

    //    ctx.fillText("you finally finished the game! T_T", 50, canvas.height / 4);
    //    ctx.fillText("and dead " + death + " times", 200, 130);
    //    ctx.fillText("can you do better ? :-D", 130, 200);
    ctx.fillText("ENTER to restart", 200, 260);
}
