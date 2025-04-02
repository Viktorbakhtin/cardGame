import Phaser from "phaser";
import {CardComponent} from "./CardComponent";

class BaseDeckComponent {
    constructor(scene) {
        this.scene = scene;
    }

    createDeck(deckType, event, isDraggable = false, getArrowDirection = null, layout) {
        layout.entities[1].cards.map((item, index) => {
            const randomCardData = this.generateRandomCardData();

            let id = `${deckType}_${index}`;
            let arrowDirection = getArrowDirection ? getArrowDirection() : null;
            let card = new CardComponent(id, this.scene, item, randomCardData.texture, item.x, item.y, isDraggable, randomCardData.level, null, arrowDirection, randomCardData.typeCard, deckType);

            app.emit(event, id, card);
        });
    }

    generateRandomCardData() {
        if (this.isWild()) {
            return this.createWildCardData();
        }

        const level = Phaser.Math.Between(gameConfig.MIN_CARD_LVL, gameConfig.MAX_CARD_LVL);
        const typeCard = Phaser.Utils.Array.GetRandom(gameConfig.CARDS_VARIANT);
        const texture = `${typeCard}${level}`;

        return {level, texture, typeCard};
    }

    isWild() {
        return Phaser.Math.Between(1, 10) <= gameConfig.WILD_CHANCE;
    }

    createWildCardData() {
        return {
            typeCard: gameConfig.WILD,
            texture: gameConfig.WILD,
            level: 0
        };
    }
}

export {BaseDeckComponent};
