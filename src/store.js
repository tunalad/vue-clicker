import { reactive, watch } from "vue";
import { clickers } from "./clickers.js";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

function calcSpeed() {
    // gives us the cps value
    return state.clickers.reduce((totalAutoClick, clicker) => {
        return totalAutoClick + clicker.count * (1 / clicker.modifier);
    }, 0);
}

function calcClicks(cps, ms) {
    // utilises the cps value
    return cps * (ms / 1000);
}

let intervalId = null;

function startAutoclicker(cps) {
    if (state.autoClick <= 0) return;

    let speed = 0;
    let increment = 1;

    if (cps < 100) speed = 1000 / cps;
    else {
        increment = calcClicks(cps, 10);
        speed = 10;
    }

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        state.clicks += increment;
        state.totalClicks += increment;
    }, speed);
}

function autoSave(interval) {
    setInterval(() => {
        state.saveState();
    }, interval);
}

const state = reactive({
    clicks: 0,
    totalClicks: 0,
    autoClick: 0,
    autosave: 0,

    clickers: clickers,

    saveState() {
        useToast().success("State Saved!");
        localStorage.setItem("game-state", JSON.stringify(state));
    },
    loadState() {
        const savedState = JSON.parse(localStorage.getItem("game-state"));

        if (!savedState) return;

        state.clicks = savedState.clicks;
        state.totalClicks = savedState.totalClicks;
        state.autoClick = savedState.autoClick;
        state.autosave = savedState.autosave;

        state.clickers.forEach((clicker, i) => {
            clicker.count = savedState.clickers[i].count;
        });
    },
    resetState() {
        localStorage.removeItem("game-state");
        location.reload();
    },
});

watch(state.clickers, () => {
    state.autoClick = calcSpeed();
    startAutoclicker(state.autoClick);
});

startAutoclicker(state.autoClick);
autoSave(300 * 1000);

export default {
    state: state,
};
