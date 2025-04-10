import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        for (let i = gameConfig.MIN_CARD_LVL; i <= gameConfig.MAX_CARD_LVL; i++){
            this.load.image(`card_black${i}`, `/assets/paintCards/${i}_purple.jpg`);
            this.load.image(`card_red${i}`, `/assets/paintCards/${i}_red.jpg`);
        }

        for (const key in sounds) {
            if (sounds.hasOwnProperty(key)) {
                this.load.audio(sounds[key], `/assets/sounds/${sounds[key]}.mp3`);
            }
        }

        this.load.atlas('cardsAtlas', '/assets/spritesheets/cards.png', ' /assets/spritesheets/cards.json');

        this.progressText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '0%', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Слушаем событие прогресса
        this.load.on('progress', (value) => {
            const percent = Math.floor(value * 100);
            this.progressText.setText(`${percent}%`);
        });

        this.load.image('card_bg2', '/assets/cards/card_bg2.png');
        this.load.image('card_shadow', '/assets/cards/card_shadow.png');
        this.load.image('lear_mini_1', '/assets/cards/lear_mini_1.png');

        this.load.image('card_blick1', '/assets/paintCards/card_blick1.png');
        this.load.image('chip_dust', '/assets/paintCards/chip_dust.png');
        this.load.image('wild', '/assets/paintCards/wild.jpg');
        this.load.image('cardBack', '/assets/paintCards/back.jpg');

        this.load.image('arrowUp', '/assets/paintCards/arrowTop.png');
        this.load.image('arrowDown', '/assets/paintCards/arrowDown.png');
    }

    create() {
        this.initSounds(app.sounds);

        this.scene.start('PlayScene');
    }

    initSounds(config){
        for (const key in config) {
            if (config.hasOwnProperty(key)) {
                app.sound.add(config[key]);
            }
        }
    }
}