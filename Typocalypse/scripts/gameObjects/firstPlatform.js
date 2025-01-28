import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class firstPlatform extends BaseGameObject {

    name = "firstPlatform";
    blockGravityForces = true;
    height = 30;
    width = 400;
    xVelocity = 0;

    update = function () {
        this.xVelocity = -global.backgroundSpeed;

        this.x += this.xVelocity * global.deltaTime;

        // if (this.word === global.word) {
        //     global.platformManager.activePlatformIndex++;
        //     global.platformManager.setActivePlatform();
        //     global.word = "";
        // }
    };

    // reactToCollision = function (collidingObject) {
    //     if (collidingObject.name == "Player") {
    //         console.log("collided with player")
    //         collidingObject.x = collidingObject.previousX;
    //         collidingObject.y = collidingObject.previousY;
    //     }
    // }


    constructor(x, y, width, height) {
        super(x, y, width, height)
        this.loadImages(["./images/platform.png"]);
    }
}

export { firstPlatform }