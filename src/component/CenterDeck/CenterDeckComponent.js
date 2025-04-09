import Phaser from "phaser";
import layout from "./layoutCenterDeck.json";
import {CardComponent} from "../CardComponent";
import {BaseDeckComponent} from "../BaseDeckComponent";

class CenterDeckComponent extends BaseDeckComponent{
    constructor(scene) {
        super(scene)

        this.setupListeners();
        this.createCenterDeck();
        this.createStaticButtonFlipCard(layout.entities[0]);
    }

    setupListeners(){
        app.on(events.FLIP_CENTER_DECK, this.flipCenterDeck.bind(this));
        app.on(events.CREATE_CENTER_CARD, this.createCenterCard.bind(this));
    };

    createCenterDeck() {
        this.createDeck(gameConfig.CENTER_DECK, events.STORE_ADD_CARD_TO_CENTER_DECK, false, this.getArrowDirection, layout);
    }

    getArrowDirection(){
        return Phaser.Utils.Array.GetRandom(gameConfig.ARROW_DIRECTION);
    }

    createCenterCard([dragCard, oldCardCenter]){
        let arrowDirection = oldCardCenter.sprite.arrowDirection;
        if (dragCard.value === gameConfig.RED_CARD) {
            if (oldCardCenter.sprite.arrowDirection === gameConfig.ARROW_UP) {
                arrowDirection = gameConfig.ARROW_DOWN;
            } else {
                arrowDirection = gameConfig.ARROW_UP;
            }
        }

        const id = oldCardCenter.id;
        let card = new CardComponent(id, this.scene, dragCard.value, dragCard.texture, oldCardCenter.x, oldCardCenter.y, false, dragCard.level, null, arrowDirection, dragCard.typeCard, gameConfig.CENTER_DECK);

        app.emit(events.STORE_ADD_CARD_TO_CENTER_DECK, id, card)
    }

    createStaticButtonFlipCard(item) {
        new CardComponent(null, this.scene, item, gameConfig.CARD_BACK, item.x, item.y, false, null, events.FLIP_CENTER_DECK, null);
    }

    flipCenterDeck() {
        app.emit(events.REMOVE_ALL_CARDS_IN_CENTER_DECK);
        this.createCenterDeck();
    }
}

export {CenterDeckComponent};
