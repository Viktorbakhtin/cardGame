import layout from "./layoutHandDeck.json";
import {CardComponent} from "../CardComponent";
import {BaseDeckComponent} from "../BaseDeckComponent";

class HandDeckComponent extends BaseDeckComponent {
    constructor(scene) {
        super(scene)

        this.scene = scene;

        this.setupListeners();
        this.createHandDeck();
        this.staticHandCard = this.createStaticCard(layout.entities[0]);

        this.counter = scene.add.text(layout.entities[2].x, layout.entities[2].y, gameConfig.START_POOL, {
            font: '32px Arial',
            fill: '#FFFFFF'
        });
    }

    setupListeners(){
        app.on(events.ADD_RANDOM_CARD_TO_HAND, this.addOneCardToHand.bind(this));
    }

    createHandDeck() {
        this.createDeck(gameConfig.HAND_DECK, events.STORE_ADD_CARD_TO_HAND, true, null, layout);
    }

    addOneCardToHand(oldCard) {
        const randomCardData = this.generateRandomCardData();
        let card = new CardComponent(oldCard.name, this.scene, randomCardData.texture, randomCardData.texture, this.staticHandCard.x, this.staticHandCard.y, true, randomCardData.level, null, null, randomCardData.typeCard, gameConfig.HAND_DECK);
        app.emit(events.STORE_ADD_CARD_TO_HAND, oldCard.id, card);
        oldCard.destroy();

        setTimeout(()=>{
            if(!this.checkWin()) this.cardMoveToHandPlayAnimation(card, oldCard);
        },50)
    }

    checkWin() {
        this.counter.setText(this.counter.text - 1);
        if (parseInt(this.counter.text) < 1) {
            app.emit(events.SOUND_PLAY, sounds.WIN_LEVEL);
            app.emit(events.WIN);
        }

        return parseInt(this.counter.text) < 1;
    }

    cardMoveToHandPlayAnimation(gameObject, closestCard){
        app.emit(events.SOUND_PLAY, sounds.CORRECT_HOUSE_MOVE);

        gameObject.sprite.disableInteractive();
        gameObject.sprite.setDepth(1000);

        this.scene.tweens.add({
            targets: gameObject.sprite,
            duration: 400,
            x: [ gameObject.sprite.x, closestCard.originalX ],
            y: [ gameObject.sprite.y, closestCard.originalY ],
            ease: 'Cubic.easeInOut',
            onComplete: () => {
                gameObject.sprite.setDepth(1);
                gameObject.sprite.originalX = gameObject.sprite.x;
                gameObject.sprite.originalY = gameObject.sprite.y;
                gameObject.sprite.setInteractive();
            }
        });
    }

    createStaticCard(item) {
        return new CardComponent(null, this.scene, item, gameConfig.CARD_BACK, item.x, item.y, false, null, null);
    }
}

export {HandDeckComponent};
