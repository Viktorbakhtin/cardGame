import {App} from './App';
import {EventTypes} from "./_EVENTS";
import {GameConfig} from "./_CONFIG";
import {Sounds} from "./_SOUNDS";

window.onload = function () {
    window.app = new App();
    window.events = EventTypes;
    window.gameConfig = GameConfig;
    window.sounds = Sounds;
};