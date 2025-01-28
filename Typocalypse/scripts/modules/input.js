import { global } from "./global.js";
import { PlatformManager } from "./platformManager.js";

global.input = document.querySelector("#type-area");

function move(event) {

    switch (event.key) {
        case "Enter":
            for (let i = 0; i < global.allGameObjects.length; i++) {
                if (global.allGameObjects[i].name === "platform") {

                    if (global.allGameObjects[i].isActivePlatform) {
                        if (global.allGameObjects[i].word === global.word) {
                            global.allGameObjects[i].word = "";
                            global.allGameObjects[i].blockGravityForces = true;
                            global.playerObject.animationData.timePerSprite = 0.03;
                            global.playerObject.switchCurrentSprites(8, 19);
                            global.playerObject.x += 400;
                            global.platformManager.activePlatformIndex++;
                            global.platformManager.setActivePlatform();
                            global.input.value = "";
                        }
                    }
                }
            }

            break;

        case " ":
            for (let i = 0; i < global.allGameObjects.length; i++) {
                if (global.allGameObjects[i].name === "platform") {

                    if (global.allGameObjects[i].isActivePlatform) {
                        if (global.allGameObjects[i].word === global.word) {
                            global.allGameObjects[i].word = "";
                            global.allGameObjects[i].blockGravityForces = true;
                            global.ctx.x -= 10;
                            global.playerObject.setJumpForce(1);
                            global.platformManager.activePlatformIndex++;
                            global.platformManager.setActivePlatform();
                            global.input.value = "";
                        }
                    }
                }
            }
            event.preventDefault();


            break;
        case "Backspace":
            let cutWord = "";
            for (let i = 0; i < global.word.length - 1; i++) {
                cutWord += global.word[i];

            }
            global.word = cutWord;
            break;
        default:
            let isLetter = event.key.match(/[a-z]/i);
            if (isLetter === null || event.key.length > 1) {
                event.preventDefault();
            }
            else {
                global.word = global.input.value + event.key;
            }
            break;

    }
}

function stop(event) {
    switch (event.key) {
        case "h":
            global.playerObject.xVelocity = 0;
            break;
    }
}

document.addEventListener("keydown", move);

document.addEventListener("keydown", stop);