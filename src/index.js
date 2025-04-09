import {App} from './App';
import {EventTypes} from "./_EVENTS";
import {GameConfig} from "./_CONFIG";

window.onload = function () {
    window.app = new App();
    window.events = EventTypes;
    window.gameConfig = GameConfig;
};