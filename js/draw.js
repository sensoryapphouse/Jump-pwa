function drawJumping(playerY, angle) {
    clearPlayer()
    ctx.save();
    ctx.translate(playerX, canvas.height - playerY)
    ctx.rotate(angle * Math.PI / 360)
    ctx.fillRect(-playerRadius, -playerRadius, playerRadius * 2, playerRadius * 2);
    ctx.restore();
    playerX += playerMoveSpeed;
}

function drawFalling(playerY) {
    ctx.clearRect(10, 200, playerRadius * 2, 200);
    ctx.fillRect(10, canvas.height - playerRadius * 1.3 - playerY, playerRadius * 2, playerRadius * 2);
    //The coefficient of 1.3 here is used to correct the distance from the ground after landing. Because of the presence of gravity, when the block accelerates to the ground, the falling distance cannot be controlled after the judgment conditions are exceeded, which leads to the ground.。
}

var inCollision = false;

function clearPlayer() {
    ctx.clearRect(0, 100, canvas.width, canvas.height);

    if (playerX >= canvas.width - playerRadius) {
        level++;
        start()
    }

    var col = collision(level);
    if (col == 1) {
        if (!mute.checked)
            gameoverAudio.play();
        death++;
        bloom();
        reset();
    } else if (col == 2) {
        if (inCollision)
            return;
        if (!mute.checked)
            chingAudio.play();
        inCollision = true;
        death -= 2;
        if (death < 0)
            death = 0;
        drawInfo();
        bloom();
    } else inCollision = false;
}


function drawInfo() {
    ctx.clearRect(0, 0, 650, 100);
    ctx.fillText(death, 100, 60);

    //    if (death > 50 && death <= 100) {
    //        ctx.font = "20px Consolas";
    //        ctx.fillText("In some narrow places, you need to press and hold the key and jump through", 150, 60);
    //        ctx.font = "30px Consolas";
    //    } else if (death > 100 && death <= 150) {
    //        ctx.font = "20px Consolas";
    //        ctx.fillText("One key is not easy to use, you can try multiple keys", 170, 60);
    //        ctx.font = "30px Consolas";
    //    } else if (death > 150 && death <= 300) {
    //        ctx.font = "20px Consolas";
    //        ctx.fillText("Many places that are not easy to jump can only be based on feelings", 170, 60);
    //        ctx.font = "30px Consolas";
    //    } else if (death > 300 && death <= 500) {
    //        ctx.font = "20px Consolas";
    //        ctx.fillText("The martyr's old age is full of heart", 230, 60);
    //        ctx.font = "30px Consolas";
    //    } else if (death > 500) {
    //        ctx.font = "20px Consolas";
    //        ctx.fillText("Brother, you're so serious, I should treat you to dinner", 170, 60);
    //        ctx.font = "30px Consolas";
    //    }

    ctx.fillText(level + "/" + (levelMap.length - 1), 500, 60);

}
