import Phaser from "phaser";

class CardComponent extends Phaser.GameObjects.Sprite {
    constructor(id, scene, value, texture, x, y, draggable, level, clickEvent, arrowDirection, typeCard, deckKey) {
        super(scene, x, y, texture);
        this.id = id;
        this.value = value;
        this.level = level;
        this.deckKey = deckKey;

        this.sprite = scene.add.image(x, y, texture).setInteractive().setScale(0.75);
        this.dust = scene.add.image(this.sprite.x, this.sprite.y, 'chip_dust').setVisible(false);

        this.sprite.originalX = x;
        this.sprite.originalY = y;
        this.sprite.name = id;
        this.sprite.level = level;
        this.sprite.value = typeCard;
        this.sprite.arrowDirection = null;

        this.setDraggable(scene, draggable);
        this.setClickEvent(scene, clickEvent);
        this.setArrowDirection(scene, arrowDirection, x, y);

        this.playDropEffect = (scene) => {
            this.dust.setVisible(true);
            this.dust.setDepth(this.sprite.depth - 1);
            this.dust.setScale(0.6);
            this.dust.setAlpha(0.9);

            scene.tweens.add({
                targets: this.dust,
                scale: this.dust.scale + 0.2,
                duration: 700,
                ease: 'quart.out',
                onComplete: () => {
                    this.dust.setScale(0.6);
                }
            });

            scene.tweens.add({
                targets: this.dust,
                alpha: 0,
                delay: 400,
                duration: 300,
                onComplete: () => {
                    this.dust.setVisible(false);
                    this.dust.setAlpha(0.9);
                }
            });
        }
    }

    setDraggable(scene, draggable) {
        if (draggable) {
            scene.input.setDraggable(this.sprite);
        }
    }

    setClickEvent(scene, clickEvent) {
        if (clickEvent) {
            this.sprite.input.cursor = 'pointer';

            this.sprite.on('pointerup', () => {
                this.sprite.scale = 0.75;
                app.emit(clickEvent);
            });

            this.sprite.on('pointerover', () => this.sprite.setTint(0x99ccff));
            this.sprite.on('pointerout', () => this.sprite.clearTint());
            this.sprite.on('pointerdown', () => this.sprite.scale = 0.73);
        }
    }

    setArrowDirection(scene, arrowDirection, x, y) {
        if (arrowDirection) {
            this.sprite.arrowDirection = arrowDirection;
            this.arrowSprite = scene.add.image(x, y + 130, arrowDirection).setScale(0.20);
        }
    }
}

export {CardComponent}
