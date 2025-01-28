import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Player extends BaseGameObject {

    name = "player";
    useGravityForces = true;
    xVelocity = 0;
    yVelocity = 0;
    input = "";
    isDead = false;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.04,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 5,
        "currentSpriteIndex": 0,
    };

    update = function () {

        if (this.x > (global.getCanvasBounds().right / 3)) {
            this.xVelocity = -global.backgroundSpeed * global.deltaTime;
            if (this.animationData.currentSpriteIndex === 19) {
                this.animationData.timePerSprite = 0.4;
                this.switchCurrentSprites(6, 7);
            }
        }
        else {
            this.xVelocity = global.backgroundSpeed * global.deltaTime;
            if (this.animationData.currentSpriteIndex === 19 || this.animationData.currentSpriteIndex === 7) {
                this.animationData.timePerSprite = 0.04;
                this.switchCurrentSprites(0, 5);
            }
        }

        this.x += this.xVelocity;
        this.y += this.yVelocity * global.deltaTime;

        this.checkDead();
    };

    checkDead = function () {
        if (this.y >= global.getCanvasBounds().bottom) {
            this.isDead = true;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        console.log("player created");
        this.loadImagesFromSpritesheet("images/spritesheet.png", 20, 1);
    }
}

export { Player }