import * as Phaser from "phaser";
import {BootScene} from "./scenes/BootScene";
import {PlayScene} from "./scenes/PlayScene";
import {WinScene} from "./scenes/WinScene";

class App extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            width: 1280,
            height: 1000,
            backgroundColor: 'rgb(69,82,69)',
            scene: [BootScene, PlayScene, WinScene]
        });

        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

    on(name, fn, context = {}) {
        this.eventEmitter.on(name, fn, context);
    }

    once(name, fn, context = {}) {
        this.eventEmitter.once(name, fn, context);
    }

    emit(name, data, context) {
        this.eventEmitter.emit(name, data, context);
    }

    removeAllListeners() {
        this.eventEmitter.removeAllListeners();
    }
}

export {App}