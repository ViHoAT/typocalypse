import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { Platform } from "../gameObjects/platform.js";
import { firstPlatform } from "../gameObjects/firstPlatform.js";
import { PlatformManager } from "./platformManager.js";

let startButton = document.querySelector("#startGame");
let startScreen = document.querySelector("#startScreen");
let endScreen = document.querySelector("#endScreen");
let restartButton = document.querySelector("#restart");
let scoreBoard = document.querySelector("#scoreBoard");
let input = document.querySelector("#type-area");
let background = document.querySelector("#background");
let lastWords = document.querySelector("#lastWords");
let highscore = document.querySelector("#highscore");

let timer = 0;
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    if (timer === 10) {

        global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

        for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
            if (global.allGameObjects[i].active == true) {
                global.allGameObjects[i].generatePlatforms();
                global.allGameObjects[i].storePositionOfPreviousFrame();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].applyGravity();
                global.allGameObjects[i].draw();
            }
        }

        if (global.playerObject.isDead) {
            lastWords.innerHTML = input.value;
            if (global.scoreValue > highscore.innerHTML) {
                highscore.innerHTML = global.scoreValue;
            }
            global.canvas.style.display = "none";
            background.style.display = "none";
            endScreen.style.display = "flex";
            input.style.display = "none";
            global.allGameObjects = [];
            global.backgroundSpeed = global.backgroundStartSpeed;
            timer = 0;
        }
        else {
            global.platformManager.update();
            global.increaseSpeed();
            global.setScore();
            global.backgroundShift -= global.backgroundSpeed * global.deltaTime;

            requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
        }


    }
    else {
        console.log(timer);
        timer++;
        requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely

    }

}


function setupGame() {

    global.scoreValue = 0;
    scoreBoard.style.display = "flex";
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    background.style.display = "block";
    global.canvas.style.display = "flex";
    input.style.display = "flex";
    input.value = "";
    input.focus();
    global.playerObject = new Player(300, 550, 100, 100);
    global.platformManager = new PlatformManager();

    new firstPlatform(global.playerObject.x, 600);
    global.platformManager.createPlatform(global.playerObject.x + 600, global.playerObject.y + 50);
    global.platformManager.createPlatform(global.playerObject.x + 1200, global.playerObject.y - 150);
    global.platformManager.createPlatform(global.playerObject.x + 1800, global.playerObject.y + 100);
    // global.platformManager.createPlatform(global.playerObject.x + 2400, global.playerObject.y - 150);

    global.platformManager.setActivePlatform();
    global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 900, -100);

    requestAnimationFrame(gameLoop);
}

// setupGame();


startButton.addEventListener("click", setupGame);
restartButton.addEventListener("click", setupGame);

