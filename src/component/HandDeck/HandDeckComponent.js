import layout from "./layoutHandDeck.json";
import {CardComponent} from "../CardComponent";
import {BaseDeckComponent} from "../BaseDeckComponent";

class HandDeckComponent extends BaseDeckComponent {
    constructor(scene) {
        super(scene)

        this.setupListeners();
        this.createHandDeck();
        this.createStaticCard(layout.entities[0]);

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
        let card = new CardComponent(oldCard.name, this.scene, randomCardData.texture, randomCardData.texture, oldCard.originalX, oldCard.originalY, true, randomCardData.level, null, null, randomCardData.typeCard, gameConfig.HAND_DECK);
        app.emit(events.STORE_ADD_CARD_TO_HAND, oldCard.id, card);
        oldCard.destroy();

        this.checkWin();
    }

    checkWin() {
        this.counter.setText(this.counter.text - 1);
        if (parseInt(this.counter.text) < 1) {
            app.emit(events.WIN)
        }
    }

    createStaticCard(item) {
        new CardComponent(null, this.scene, item, gameConfig.CARD_BACK, item.x, item.y, false, null, null);
    }
}

export {HandDeckComponent};
