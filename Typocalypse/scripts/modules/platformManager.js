import { global } from "./global.js"
import { Platform } from "../gameObjects/platform.js"
import { Player } from "../gameObjects/player.js"

class PlatformManager {

    activePlatformIndex = 0;

    constructor() {
        this.platforms = []; // Array to hold all active platforms
        this.platformSpacing = 200; // Distance between platforms
        this.lastPlatformX = 0; // X position of the last created platform
    }

    // Method to create a new platform
    createPlatform(x, y, width, height) {

        const newPlatform = new Platform(x, y, width, height);
        this.platforms.push(newPlatform);
    }

    setActivePlatform() {
        for (let i = 0; i < this.platforms.length; i++) {
            if (i === this.activePlatformIndex) {
                this.platforms[i].isActivePlatform = true;
            }
            else {
                this.platforms[i].isActivePlatform = false;
            }
        }
    }

    manifestPlatform() {

    }

    deletePlatform() {
        const previousLength = this.platforms.length;
        // + platform.width
        this.platforms = this.platforms.filter(platform => platform.x > 0);
        if (this.platforms.length < previousLength) {
            this.activePlatformIndex--;
            this.generatePlatforms();
        }
    }

    generatePlatforms() {
        let platformPlacement = Math.floor(Math.random() * 3);
        switch (platformPlacement) {
            //Dash
            case 0:
                this.createPlatform(global.getCanvasBounds().right, (global.getCanvasBounds().bottom / 2));
                break;
            //Jump
            case 1:
                this.createPlatform(global.getCanvasBounds().right, (global.getCanvasBounds().bottom / 2) + 100);
                break;
            //Fall
            case 2:
                this.createPlatform(global.getCanvasBounds().right, (global.getCanvasBounds().bottom / 2) - 100);
                break;
        }


    }

    update() {
        this.deletePlatform();
    }

}


export { PlatformManager };