import Phaser from "phaser";
import {CenterDeckComponent} from "../component/CenterDeck/CenterDeckComponent";
import {HandDeckComponent} from "../component/HandDeck/HandDeckComponent";
import {DragManager} from "../component/DragManager";
import {BaseCardStore} from "../component/BaseCardStore";
import {SoundManager} from "../component/SoundManager";

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    create() {
        new BaseCardStore(this);

        new CenterDeckComponent(this);
        new HandDeckComponent(this);

        new DragManager(this);
        new SoundManager(this);
    }
}