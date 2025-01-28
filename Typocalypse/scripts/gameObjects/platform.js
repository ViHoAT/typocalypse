import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Platform extends BaseGameObject {

    name = "platform";
    blockGravityForces = false;
    xVelocity = 0;
    width = 400;
    height = 30;
    word = "";
    words = [
        "about", "above", "abuse", "actor", "adapt", "admit", "adopt", "adore", "after", "agent",
        "agree", "alert", "alien", "alive", "allow", "alone", "along", "alter", "amber", "amend",
        "angel", "anger", "angle", "ankle", "apply", "apple", "apron", "argue", "armed", "arrow",
        "asset", "badge", "baker", "basin", "basic", "beast", "begin", "belly", "bench", "block",
        "bloom", "board", "boast", "bonus", "bound", "brain", "brand", "brave", "break", "brick",
        "bring", "broad", "brush", "build", "burst", "cabin", "camel", "canal", "candy", "cargo",
        "carve", "catch", "cause", "chain", "chair", "chalk", "chaos", "charm", "chart", "chase",
        "cheap", "cheat", "check", "cheer", "chess", "chest", "chief", "child", "chill", "china",
        "chirp", "choice", "choke", "civil", "claim", "class", "clean", "clear", "cliff", "clock",
        "close", "cloth", "cloud", "clown", "coach", "coast", "color", "combo", "comet", "comic",
        "cover", "craft", "crane", "crawl", "crazy", "cream", "creep", "crept", "crest", "crime",
        "crisp", "crowd", "crown", "crush", "curve", "dance", "dated", "dealt", "death", "debut",
        "debug", "delay", "delta", "demon", "depth", "devil", "dicey", "digit", "dirty", "ditch",
        "diver", "dizzy", "dozen", "draft", "drain", "drama", "drill", "drink", "drive", "drown",
        "eager", "eagle", "earth", "elbow", "elder", "elect", "elite", "embed", "empty", "enact",
        "enter", "entry", "equal", "equip", "error", "event", "every", "exact", "exist", "extra",
        "fable", "faith", "false", "fault", "feast", "fiber", "field", "fight", "final", "first",
        "flame", "flare", "flash", "fleet", "flesh", "flint", "float", "flock", "flood", "floor",
        "flour", "focus", "force", "forge", "frame", "fraud", "fresh", "front", "frost", "fruit",
        "giant", "given", "glass", "globe", "glory", "grace", "grade", "grain", "grand", "grant",
        "graph", "grasp", "grass", "grave", "great", "green", "greet", "grief", "grind", "group",
        "guard", "guess", "guest", "guide", "habit", "happy", "harsh", "heart", "heavy", "hello",
        "honor", "hotel", "human", "humor", "hurry", "ideal", "image", "index", "input", "issue",
        "jelly", "joint", "jolly", "joker", "judge", "juice", "juicy", "jumpy", "kneel", "knife",
        "knock", "labor", "large", "laser", "later", "laugh", "layer", "learn", "leave", "light",
        "limit", "linen", "liner", "liver", "local", "logic", "loose", "lover", "lucky", "lunch",
        "magic", "major", "maker", "marry", "match", "maybe", "mayor", "metal", "micro", "midst",
        "minor", "model", "money", "month", "moral", "motor", "mount", "mouse", "mouth", "movie",
        "music", "muted", "never", "noble", "noise", "north", "noted", "novel", "nurse", "ocean",
        "offer", "often", "onion", "orbit", "organ", "other", "outer", "paint", "panel", "panic",
        "paper", "party", "peace", "piano", "pilot", "place", "plane", "plant", "plate", "point",
        "pound", "power", "press", "pride", "prime", "print", "prior", "prize", "probe", "proof",
        "proud", "pulse", "punch", "quack", "queen", "quick", "quiet", "quilt", "ranch", "range",
        "rapid", "ratio", "reach", "react", "ready", "rebel", "refer", "relax", "reply", "reset",
        "rider", "ridge", "right", "risky", "river", "robot", "robin", "roger", "rough", "round",
        "route", "royal", "ruler", "sandy", "scary", "scene", "scope", "score", "scout", "serve",
        "shade", "share", "sharp", "sheep", "shelf", "shell", "shift", "shine", "shock", "short",
        "shout", "sight", "skill", "slack", "slice", "slide", "smart", "smile", "smith", "smoke",
        "snake", "solve", "space", "spark", "speak", "spice", "spike", "spine", "spite", "split",
        "spoil", "spoon", "sport", "spray", "stack", "stage", "stain", "stake", "stamp", "stand",
        "stark", "start", "state", "steam", "steel", "steep", "stick", "stiff", "still", "stock",
        "stone", "store", "storm", "story", "stove", "straw", "strip", "stuck", "study", "style",
        "sugar", "sunny", "super", "sweet", "table", "taken", "tasty", "teach", "teeth", "tempo",
        "thank", "theft", "theme", "there", "thick", "thief", "thing", "third", "thorn", "three",
        "threw", "throw", "tiger", "tight", "tired", "toast", "today", "topic", "total", "touch",
        "tough", "tower", "trace", "track", "trade", "trail", "train", "treat", "trend", "trial",
        "tribe", "trick", "trophy", "trunk", "truth", "twist", "uncle", "under", "union", "unite",
        "urban", "usage", "usual", "vague", "valid", "value", "vapor", "venue", "verse", "vital",
        "vocal", "voice", "vivid", "voter", "wagon", "waste", "watch", "water", "weave", "weird",
        "whale", "wheat", "where", "which", "while", "white", "whole", "whose", "woman", "world",
        "worry", "worth", "would", "wound", "wreck", "write", "wrong", "yacht", "yield", "young",
        "youth", "zebra", "zesty", "zippy"
    ];

    isActivePlatform = false;

    wordPicker = function () {
        let randomNumber = Math.floor(Math.random() * this.words.length);
        let randomWord = this.words[randomNumber];
        return randomWord;

    }

    update = function () {
        this.xVelocity = -global.backgroundSpeed;
        this.x += this.xVelocity * global.deltaTime;
        global.ctx.font = "100px sans-serif";

        this.colorLetter();

    };

    colorLetter = function () {
        let textWidth = 0;

        for (let i = 0; i < this.word.length; i++) {
            if (global.word[i] === undefined || this.isActivePlatform === false) {
                global.ctx.fillStyle = "#000000";
                // global.ctx.fillText(this.word[i], this.x + textWidth, this.y - 20);
                global.ctx.fillText(this.word[i], this.x + textWidth, this.y - 20);

                textWidth += global.ctx.measureText(this.word[i]).width;
            }
            else if (this.word[i] === global.word[i]) {
                global.ctx.fillStyle = "#00ff00";
                global.ctx.fillText(this.word[i], this.x + textWidth, this.y - 20);
                textWidth += global.ctx.measureText(this.word[i]).width;
            }
            else {
                global.ctx.fillStyle = "#ff0000";
                global.ctx.fillText(this.word[i], this.x + textWidth, this.y - 20);
                textWidth += global.ctx.measureText(this.word[i]).width;
            }
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height)
        this.word = this.wordPicker();
        this.loadImages(["./images/platform.png"]);
        this.word = this.wordPicker();
    }
}

export { Platform }