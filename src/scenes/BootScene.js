import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        for (let i = gameConfig.MIN_CARD_LVL; i <= gameConfig.MAX_CARD_LVL; i++){
            this.load.image(`card_purple${i}`, `/assets/paintCards/${i}_purple.jpg`);
            this.load.image(`card_red${i}`, `/assets/paintCards/${i}_red.jpg`);
            this.load.image(`card_yellow${i}`, `/assets/paintCards/${i}_yellow.jpg`);
        }

        this.load.image('wild', '/assets/paintCards/wild.jpg');
        this.load.image('cardBack', '/assets/paintCards/back.jpg');

        this.load.image('arrowUp', '/assets/paintCards/arrowTop.png');
        this.load.image('arrowDown', '/assets/paintCards/arrowDown.png');
    }

    create() {
        this.scene.start('PlayScene');
    }
}