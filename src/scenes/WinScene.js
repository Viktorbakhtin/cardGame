import Phaser from "phaser";

export class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });

        app.once(events.WIN, this.startWin.bind(this))
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x99ff99);

        this.add.text(640, 500, 'You Win', {
            fontFamily: 'Arial Black', fontSize: 80, color: '#95edb4',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.tween = this.tweens.add({
            targets: this,
            timeLeft: 0,
            duration: 2000,
            onComplete: () => {
                this.scene.start('PlayScene');
            }
        });

        this.input.once('pointerdown', () => {
            this.scene.start('PlayScene');
            this.tween.stop();
        });
    }

    startWin(){
        app.removeAllListeners();
        app.once(events.WIN, this.startWin.bind(this));
        this.scene.start('WinScene');
    }
}