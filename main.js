window.onload = function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
    main();
    setUpPanel();
}

var splash;
var button;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var home;
var inMenu = true;
var panelvisible = false;

var spdSlider;
var width;
var mute = false;

function hideMenu() {
    splash.hidden = true;
    button.hidden = true;
    button1.hidden = true;
    button2.hidden = true;
    button3.hidden = true;
    button4.hidden = true;
    button5.hidden = true;
    button6.hidden = true;
    button6.hidden = true;
    button7.hidden = true;
    home.hidden = false;
    inMenu = false;
}

function showMenu() {
    splash.hidden = false;
    button.hidden = false;
    button1.hidden = false;
    button2.hidden = false;
    button3.hidden = false;
    button4.hidden = false;
    button5.hidden = false;
    button6.hidden = false;
    button6.hidden = false;
    button7.hidden = false;
    home.hidden = true;
    inMenu = true;
}

function setSpeed() {
    switch (spdSlider.value) {
        case "1":
            speed = 2.5;
            break;
        case "2":
            speed = 2;
            break;
        case "3":
            speed = 1.5;
            break;
        case "4":
            speed = 1;
            break;
    }
    playerMoveSpeed = 4 / Math.sqrt(speed); // PB 4,  1.2, 2. 2.5, 3. 3, 4. 3.5, 5.4
    g = 4000 / Math.sqrt(speed); // 4000 gravity 1. 800, 5. 4000
}

function setSize() {
    switch (width.value) {
        case "1":
            playerRadius = 8;
            break;
        case "2":
            playerRadius = 11;
            break;
        case "3":
            playerRadius = 15;
            break;
    }
}


function setUpPanel() {
    panel.style.left = "130vw";
    slideTo(panel, 130);
    mute = document.createElement("INPUT");
    mute.style.position = "absolute";
    mute.style.height = "3vh";
    mute.style.width = "3vw";
    mute.style.left = "16.5vw";
    mute.style.top = "3.2vh";
    mute.checked = false;
    mute.setAttribute("type", "checkbox");
    mute.checked = false;
    spdSlider = document.createElement("INPUT");
    spdSlider.setAttribute("type", "range");
    spdSlider.style.position = "absolute";
    spdSlider.style.height = "2vh";
    spdSlider.style.width = "14vw";
    spdSlider.style.left = "4.3vw";
    spdSlider.style.top = "13vh";
    spdSlider.style.color = 'green';
    spdSlider.value = 3;
    spdSlider.min = 1;
    spdSlider.max = 4;
    width = document.createElement("INPUT");
    width.setAttribute("type", "range");
    width.style.position = "absolute";
    width.style.height = "2vh";
    width.style.width = "14vw";
    width.style.left = "4.3vw";
    width.style.top = "22vh";
    width.style.color = 'green';
    width.value = 3;
    width.min = 1;
    width.max = 3;

    panel.appendChild(mute);
    panel.appendChild(spdSlider);
    panel.appendChild(width);

    settings.style.left = "92vw";
    // Retrieve settings
    var s = localStorage.getItem("SensoryJump.mute");
    mute.checked = (s == "true");
    s = parseInt(localStorage.getItem("SensoryJump.spdSlider"));
    if (s < 1 || s > 5)
        s = 3;
    spdSlider.value = s.toString();
    setSpeed();

    s = parseInt(localStorage.getItem("SensoryJump.width"));
    if (s < 1 || s > 5)
        s = 3;
    width.value = s.toString();
    setSize();


    mute.onclick = function (e) {
        e.stopPropagation();
        localStorage.setItem("SensoryJump.mute", mute.checked);
    }
    spdSlider.onclick = function (e) {
        e.stopPropagation();
        localStorage.setItem("SensoryJump.speed", spdSlider.value);
        setSpeed();
    }
    width.onclick = function (e) {
        e.stopPropagation();
        localStorage.setItem("SensoryJump.width", width.value);
        setSize();
    }

    panel.onmousedown = function (e) { // speed, paddle size, ball size
        e.stopPropagation();
    }

    settings.onmousedown = function (e) { // speed, paddle size, ball size
        e.stopPropagation();
        if (panelvisible) { // save stored values
            slideTo(panel, 130);
            slideTo(settings, 92);
        } else {
            slideTo(panel, 75);
            slideTo(settings, 78);
        }
        panelvisible = !panelvisible;
    }

    function slideTo(el, left) {
        var steps = 5;
        var timer = 50;
        var elLeft = parseInt(el.style.left) || 0;
        var diff = left - elLeft;
        var stepSize = diff / steps;
        console.log(stepSize, ", ", steps);

        function step() {
            elLeft += stepSize;
            el.style.left = elLeft + "vw";
            if (--steps) {
                setTimeout(step, timer);
            }
        }
        step();
    }
}


function main() {
    panel = document.querySelector('panel');
    settings = document.querySelector('settings');
    splash = document.querySelector('splash');
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');
    button4 = document.querySelector('button4');
    button5 = document.querySelector('button5');
    button6 = document.querySelector('button6');
    button7 = document.querySelector('button7');
    home = document.querySelector('home');
    addEventListener("keydown", function (e) {
        keyDown(e);
    }, false);

    addEventListener('touchstart', touch, false);
    //            addEventListener('touchmove', touch, false);
    addEventListener('mousedown', touch, false);
    //            addEventListener('mousemove', touch, false);


    button.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(0);
    }
    button1.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(1);
    }
    button2.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(2);
    }
    button3.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(3);
    }
    button4.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(4);
    }
    button5.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(5);
    }
    button6.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(6);
    }
    button7.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(7);
    }

    button.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(0);
    }
    button1.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(1);
    }
    button2.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(2);
    }
    button3.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(3);
    }
    button4.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(4);
    }
    button5.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(5);
    }
    button6.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(6);
    }
    button7.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        Go(7);
    }

    home.onmousedown = function (e) {
        event.preventDefault();
        e.stopPropagation();
        restart();
    }
    home.ontouchstart = function (e) {
        event.preventDefault();
        e.stopPropagation();
        restart();
    }
}

function Go(i) {
    levelMap = null;
    splash.hidden = true;
    switch (i) {
        case 0:
            levelMap = levelMap1;
            break;
        case 1:
            levelMap = levelMap2;
            break;
        case 2:
            levelMap = levelMap3;
            break;
        case 3:
            levelMap = levelMap4;
            break;
        case 4:
            levelMap = levelMap5;
            break;
        case 5:
            levelMap = levelMap6;
            break;
        case 6:
            levelMap = levelMap7;
            break;
        case 7:
            levelMap = levelMap8;
            break;
    }
    inMenu = false;
    hideMenu();
    keyDown();
}

function restart() {
    showMenu();
    death = 0;
    level = 0;
    isStart = false;
    inMenu = true;
}

function keyDown(e) {
    try {
        if (e.keyCode == 27) {
            restart();
            return;
        }
    } catch (e1) {}
    if (inMenu)
        return;
    if (!isStart && !isWin) {
        start();
        isStart = true;
        //       backgroundAudio.play();
        //       backgroundAudio.volume = "0.3";
    } else if (!isStart && isWin) { //  && e.keyCode == 13
        death = 0;
        level = 0;
        start()
        isStart = true;
    } else if (isStart && !isJumping) {
        if (moveProcess != null) clearInterval(moveProcess);
        jump();
    }
}


function touch(event) {
    var event = event || window.event;
    switch (event.type) {
        case "touchstart":
            keyDown()
            break;
            // case "touchmove":
            // event.preventDefault();
            // keyDown()
            // break;
        case "mousedown":
            keyDown()
            break;
    }
}

let //backgroundAudio = document.getElementById("Background-AudioPlayer"),
    jumpAudio = document.getElementById("Jump-AudioPlayer"),
    gameoverAudio = document.getElementById("GameOver-AudioPlayer"),
    chingAudio = document.getElementById("Ching-AudioPlayer"),
    canvas = document.getElementById("player"),
    ctx = canvas.getContext("2d");

ctx.fillStyle = "#2196f3";
ctx.font = "20px Consolas";
//ctx.fillText("jumping-box", 245, 150);
ctx.font = "30px Consolas";
//ctx.fillText("Loading", 250, 180);

let speed = 1, // PB 1, 1.5, 2, 2.5 ***
    playerRadius = 11, // PB 8, 11, 15 ***
    death = 0,
    playerX, playerY, //X,Y Is the center point of the block, initially in mid-air, ready to fall
    playSpeed = 1000 / 60, // PB 1000/ 60
    playerMoveSpeed = 4 / Math.sqrt(speed), // PB 4,  1.2, 2. 2.5, 3. 3, 4. 3.5, 5.4
    jumpProcess, moveProcess,
    vt = 1000, // 1000 take off speed 1000, 1. 500, 5. 1000
    v0 = 0,
    g = 4000 / Math.sqrt(speed), // 4000 gravity 1. 800, 5. 4000
    s = 40,
    t = (playSpeed / 1000), // playSpeed / 1000,
    angle = 0,
    spin = 12, // 12, 18, 24
    vFall = 0,
    sFall = 0,
    isJumping = false,
    isStart = false,
    isWin = false;
level = 0,
    levelMap1 = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
    levelMap2 = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0],
            ],
    levelMap3 = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
    levelMap4 = [
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 10, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 10, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 30, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0],

                [0, 0, 0, 0, 0, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 10, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 10, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 50, 10, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 10, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 10, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 10, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            ],
    levelMap5 = [
                ['l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'l', 'l', 'l', 'l', 'l'],
                ['l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'l', 'l', 'l', 'l', 'l'],
                ['l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'l', 'l', 'l', 'l', 'l'],
                ['l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'l', 'l', 'l', 'l', 'l'],
                ['l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'l', 'l', 'l', 'l', 'l'],
                ['l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'l', 'l', 'l', 'l', 'l'],

                ['l', 'l', 'l', 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50],
                ['l', 'l', 'l', 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 'l'],
                ['l', 'l', 'l', 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 'l'],
                ['l', 'l', 'l', 0, 0, 0, 0, 0, 50, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50],
                ['l', 'l', 'l', 0, 0, 0, 0, 50, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50],

                ['l', 'l', 'l', 0, 0, 0, 0, 50, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50],
                ['l', 'l', 'l', 0, 0, 0, 0, 50, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 'l'],
                ['l', 'l', 'l', 0, 0, 0, 0, 50, 40, 0, 0, 0, 0, 'l', 'l', 'l', 0, 0, 0, 0, 0, 0, 0, 51, 'l'],
                ['l', 'l', 'l', 0, 0, 0, 0, 50, 40, 0, 0, 0, 0, 'l', 'l', 'l', 0, 0, 0, 0, 0, 0, 'l', 51, 0],
                ['l', 'l', 'l', 0, 0, 0, 0, 50, 40, 0, 0, 0, 0, 'l', 'l', 'l', 0, 0, 0, 0, 'l', 51, 0, 0, 0],
            ],
    levelMap6 = [
                ['m', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0],
                ['m', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0],

                ['m', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 'l', 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 'l', 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 'l', 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 'l', 0, 0, 0, 50, 0, 0, 0, 0, 0, 'l', 0, 0, 0, 50],
                ['m', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 'l', 0, 0, 0, 50, 0, 0, 0, 0, 'l', 'l', 0, 0, 0, 50],

                ['m', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 'm', 'l', 'l', 0, 0, 0, 40, 0, 0, 0, 'm', 0, 0, 0, 40],
                ['m', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 'm', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 'm', 0, 0, 0, 40],
                ['m', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 'm', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 'm', 0, 0, 0, 50],
                ['m', 'l', 0, 0, 0, 50, 0, 0, 0, 'm', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 'l', 0, 0, 0, 50],
                ['m', 'l', 0, 0, 0, 50, 0, 0, 0, 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 'l', 0, 0, 0, 50],
            ],
    levelMap7 = [
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'h', 'h', 0, 0, 0, 30],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'm', 'm', 'm', 0, 0, 50],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],

                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 0, '*', 0, 0, 0, 0, 'h', 'h', 0, 0, 0, 30],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 30, 0, 0, 0, 0, '*', 0, 0, 0, 0, 0, 'm', 'm', 'm', 0, 0, 50],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 0, '*', 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, '*', , '*', 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 0, '*', , '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],

                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 20, 0, '*', 0, 0, 0, 'm', 'm', 'm', 0, 0, 30],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'm', 'm', 'm', 0, 0, 50],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 40, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
            ],

    levelMap8 = [
                [0, 0, 0, 0, 0, 0, 80, 30, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, '*', , '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                [0, 0, 0, 0, 0, 0, 80, 30, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],

                [0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 40, 30, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 60, 0],
                [0, 0, 0, 0, 0, 0, 80, 30, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0],
                [0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 80, 0],

                ['l', 'l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, '*', , '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 30, 0, 0, 0, 0, 20, 0, '*', 0, 0, 0, 'm', 'm', 'm', 0, 0, 30],
                ['l', 'l', 'l', 'l', 'l', 'l', 0, 0, 0, 0, 'l', 51, '*', 0, 0, 0, 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
                ['l', 'l', 'l', 'l', 'l', 0, 0, 0, 50, 0, 0, 0, 0, 30, 0, '*', 0, 0, 0, 'l', 'l', 'm', 0, 0, 60],
            ];

let levelMap = levelMap8;

gamepads.addEventListener('connect', e => {
    console.log('Gamepad connected:');
    console.log(e.gamepad);
    e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
    e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
    e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
        StandardMapping.Axis.JOYSTICK_LEFT);
    e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
        StandardMapping.Axis.JOYSTICK_RIGHT);
});

gamepads.addEventListener('disconnect', e => {
    console.log('Gamepad disconnected:');
    console.log(e.gamepad);
});

gamepads.start();
var menuItem = 0;

function Highlight() {
    button.style.opacity = .7;
    button1.style.opacity = .7;
    button2.style.opacity = .7;
    button3.style.opacity = .7;
    button4.style.opacity = .7;
    button5.style.opacity = .7;
    button6.style.opacity = .7;
    button7.style.opacity = .7;
    switch (menuItem) {
        case 0:
            button.style.opacity = 1.;
            break;
        case 1:
            button1.style.opacity = 1.;
            break;
        case 2:
            button2.style.opacity = 1.;
            break;
        case 3:
            button3.style.opacity = 1.;
            break;
        case 4:
            button4.style.opacity = 1.;
            break;
        case 5:
            button5.style.opacity = 1.;
            break;
        case 6:
            button6.style.opacity = 1.;
            break;
        case 7:
            button7.style.opacity = 1.;
            break;
    }
}

function showPressedButton(index) {
    console.log("Press: ", index);
    if (inMenu) {
        switch (index) {
            case 0: // A
            case 1: // B
            case 2: // X
            case 3: // Y
                Go(menuItem);
                break;
            case 12: // dup
                if (menuItem > 3)
                    menuItem -= 4;
                Highlight();
                break;
            case 13: // ddown
                if (menuItem < 4)
                    menuItem += 4;
                Highlight();
                break;
            case 14: // dleft
                if (menuItem > 0)
                    menuItem--;
                Highlight();
                break;
            case 15: // dright
                if (menuItem < 7)
                    menuItem++;
                Highlight();
                break;
        }
        console.log("Menu: ", menuItem);
    } else switch (index) {
        case 10: // XBox
            showMenu();
            break;
        default:
            keyDown();
            break;
    }
}

function removePressedButton(index) {
    console.log("Releasd: ", index);
}

function moveJoystick(values, isLeft) {
    console.log("Joystick: ", values[0], values[1]);
    if (values[1] >= 0 || values[1] >= 0) {
        XBoxVolume = Math.max(values[1], values[0]);
    }

}
