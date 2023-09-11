canvasBg = document.getElementById("background");
ctxBg = canvasBg.getContext("2d");
ctxBg.fillStyle = "#9b59b6"; // or #D4AF37

var objWidth = 26;

function createObstacles(level) {
    ctxBg.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < levelMap[level].length; i++) {
        if (levelMap[level][i] < 100) {
            drawObstacle(i, levelMap[level][i]);
        } else if (levelMap[level][i] == 'l') {
            drawFloat(i);
        } else if (levelMap[level][i] == 'm') {
            drawFloat2(i);
        } else if (levelMap[level][i] == 'h') {
            drawFloat3(i);
        } else if (levelMap[level][i] == '*') {
            drawFloat4(i);
        }
    }
}

function drawObstacle(position, height) {
    var objHeight = 0,
        thisProcess = setInterval(function () {
            if (objHeight < height) {
                ctxBg.fillRect(objWidth * position, canvas.height - objHeight, objWidth, objHeight);
                objHeight += 1;
            } else {
                clearInterval(thisProcess);
            }
        }, 5);
}

function drawFloat(position) {
    var objHeight = 0,
        thisProcess = setInterval(function () {
            if (objHeight < 20) {
                ctxBg.fillRect(objWidth * position, canvas.height - objHeight - playerRadius * 2 - 1, objWidth, objHeight);
                objHeight += 1;
            } else {
                clearInterval(thisProcess);
            }
        }, 5);
}

function drawFloat2(position) {
    var objHeight = 0,
        thisProcess = setInterval(function () {
            if (objHeight < 20) {
                ctxBg.fillRect(objWidth * position, canvas.height - objHeight - playerRadius * 4 - 1, objWidth, objHeight);
                objHeight += 1;
            } else {
                clearInterval(thisProcess);
            }
        }, 5);
}

function drawFloat3(position) {
    var objHeight = 0,
        thisProcess = setInterval(function () {
            if (objHeight < 20) {
                ctxBg.fillRect(objWidth * position, canvas.height - objHeight - playerRadius * 6 - 1, objWidth, objHeight);
                objHeight += 1;
            } else {
                clearInterval(thisProcess);
            }
        }, 5);
}

function drawFloat4(position) {
    var objHeight = 0,
        thisProcess = setInterval(function () {
            if (objHeight < 20) {
                ctxBg.fillStyle = "#D4AF37";
                ctxBg.fillRect(objWidth * position, canvas.height - objHeight - playerRadius * 6 - 1, objWidth, objHeight);
                objHeight += 1;
                ctxBg.fillStyle = "#9b59b6";
            } else {
                clearInterval(thisProcess);
            }
        }, 5);
}
