import Phaser from "phaser";

class BaseCardStore {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        app.on(events.STORE_ADD_CARD_TO_HAND, this.addCard.bind(this));
        app.on(events.STORE_ADD_CARD_TO_CENTER_DECK, this.addCard.bind(this));
        app.on(events.REMOVE_CARD_FROM_CENTER_DECK, this.removeOneCardInCenterDeck.bind(this));
        app.on(events.GET_ALL_CARDS_FROM_CENTER_DECK, this.getAllCardsFrom.bind(this));
        app.on(events.REMOVE_ALL_CARDS_IN_CENTER_DECK, this.removeAllCardsInCenterDeck.bind(this));
    }

    addCard(key, cardData) {
        app.registry.set(key, cardData);
    }

    removeCard(key) {
        app.registry.remove(key);
    }

    getAllCardsFrom(deckKey, callback) {
        const allCards = this.getAllCards();
        callback(Object.values(allCards).filter(card => card.deckKey === deckKey));
    }

    removeAllCardsInCenterDeck() {
        const allCards = this.getAllCards();

        let cards = Object.values(allCards).filter(card => card.deckKey === gameConfig.CENTER_DECK);
        cards.forEach(card => {
            this.destroyCardData(card);
        })
    }

    removeOneCardInCenterDeck([handDragCard, centerCard]) {
        const allCards = this.getAllCards();

        let card = Object.values(allCards).find(card => card.id === centerCard.id);
        this.destroyCardData(card);
    }

    getAllCards() {
        return Object.values(app.registry.getAll());
    }

    destroyCardData(card){
        card.sprite.destroy();
        card.arrowSprite.destroy();
        card.destroy();
        this.removeCard(card.id);
    }
}

export {BaseCardStore}