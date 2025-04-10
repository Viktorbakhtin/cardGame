class SoundManager {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        app.on(events.SOUND_PLAY, this.playSound.bind(this));
        app.on(events.SOUND_STOP, this.stopSound.bind(this));
    }

    stopSound(key) {
        app.sound.stopByKey(key);
    }

    playSound(key) {
        app.sound.play(key);
    }
}

export {SoundManager}