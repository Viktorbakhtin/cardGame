class DragManager {
    constructor(scene) {
        this.scene = scene
        scene.input.on('dragstart', this.handleDragStart.bind(this));
        scene.input.on('drag', this.handleDrag.bind(this));
        scene.input.on('dragend', this.handleDragEnd.bind(this));
    }

    handleDragStart(pointer, gameObject) {
        gameObject.setDepth(1000);
        // gameObject.setTint(0xFFD700);
        app.emit(events.SOUND_PLAY, sounds.SELECT_CARD);
        // const fx = gameObject.postFX.addGlow(0xFFD700, 0, 0, false, 0.1, 32);
        gameObject.postFX.addBloom(0xFFD700, 1, 1, 2, 1);
        // this.scene.tweens.add({
        //     targets: fx,
        //     targets: fx,
        //     outerStrength: 8,
        //     ease: 'sine.inout'
        // });
    }

    handleDrag(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    }

    handleDragEnd(pointer, gameObject) {
        this.checkCard(gameObject);
        gameObject.setDepth(1);
        gameObject.clearTint();
        gameObject.postFX.clear();
        // gameObject.postFX.disable(true)
    }

    checkCard(gameObject) {
        const closestCard = this.findClosestCard(gameObject);

        if (closestCard && this.isLevelMatch(gameObject, closestCard)) {
            this.closestCardMoveToAnimation(gameObject, closestCard);
            app.emit(events.SOUND_PLAY, sounds.CORRECT_DRAG_MOVE);
        } else {
            app.emit(events.SOUND_PLAY, sounds.CORRECT_AUTO_MOVE);
            this.resetCardPosition(gameObject);
        }
    }

    closestCardMoveToAnimation(gameObject, closestCard){
        this.scene.tweens.add({
            targets: gameObject,
            duration: 150,
            x: [ gameObject.x, closestCard.x ],
            y: [ gameObject.y, closestCard.y ],
            ease: 'Cubic.easeOut',
            onComplete: () => {
                closestCard.playDropEffect(this.scene);
                this.emitCardEvents(gameObject, closestCard);
            }
        });
    }

    emitCardEvents(draggedCard, closestCard) {
        app.emit(events.REMOVE_CARD_FROM_CENTER_DECK, [draggedCard, closestCard]);
        app.emit(events.CREATE_CENTER_CARD, [draggedCard, closestCard]);
        app.emit(events.ADD_RANDOM_CARD_TO_HAND, draggedCard);
    }

    resetCardPosition(card) {
        const distance = Phaser.Math.Distance.Between(card.x, card.y, card.originalX, card.originalY);
        const duration = Math.max(100, distance * 0.5);
        this.scene.tweens.add({
            targets: card,
            duration: duration,
            x: [ card.x, card.originalX ],
            y: [ card.y, card.originalY ],
            ease: 'Cubic.easeOut',
        });
        // card.x = card.originalX;
        // card.y = card.originalY;
    }

    findClosestCard(draggedCard) {
        let closest = null;
        let minDistance = gameConfig.MIN_DISTANCE_DRAG_MATCH;

        app.emit(events.GET_ALL_CARDS_FROM_CENTER_DECK, gameConfig.CENTER_DECK, (cards) => {
            cards.forEach((card) => {
                const distance = Phaser.Math.Distance.Between(draggedCard.x, draggedCard.y, card.sprite.x, card.sprite.y);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = card;
                }
            });
        });

        return closest;
    }

    isLevelMatch(draggedCard, targetCard) {
        const {level: draggedLevel} = draggedCard;
        const {level: targetLevel, sprite: {arrowDirection}} = targetCard;

        if (isNaN(draggedLevel) || isNaN(targetLevel)) return false;
        if (draggedLevel === 0 || targetLevel === 0) return true; // Wildcard

        return this.checkLevelMatch(draggedLevel, targetLevel, arrowDirection);
    }

    checkLevelMatch(draggedLevel, targetLevel, arrowDirection) {
        const {ARROW_UP, ARROW_DOWN, MAX_CARD_LVL, MIN_CARD_LVL} = gameConfig;

        if (arrowDirection === ARROW_UP) {
            return (targetLevel === MAX_CARD_LVL && draggedLevel === MIN_CARD_LVL) ||
                (draggedLevel === targetLevel + 1);
        }

        if (arrowDirection === ARROW_DOWN) {
            return (targetLevel === MIN_CARD_LVL && draggedLevel === MAX_CARD_LVL) ||
                (draggedLevel === targetLevel - 1);
        }

        return false;
    }
}

export {DragManager}