import { reactive, watch } from "vue";
import { clickers } from "./clickers.js";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import aveta from "aveta";

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
let lastUpdateTime = Date.now();

function startAutoclicker(cps) {
    if (state.autoClick <= 0) return;

    let speed = 0;
    let increment = 1;

    if (state.tabbedIn) {
        if (cps < 100) speed = 1000 / cps;
        else {
            increment = calcClicks(cps, 10);
            speed = 10;
        }
    } else {
        console.log("Slow state started due to window not being focused.");
        increment = calcClicks(cps, 5000);
        speed = 5000;
    }

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        //state.clicks += increment;
        //state.totalClicks += increment;
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastUpdateTime;
        lastUpdateTime = currentTime;

        const operationsPerformed = Math.floor(elapsedTime / speed);
        state.clicks += operationsPerformed * increment;
        state.totalClicks += operationsPerformed * increment;
        document.title = `${aveta(state.clicks, { digits: 2, lowercase: true })} Vue Projects Made`;
        if (!state.tabbedIn) state.saveState();
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
    tabbedIn: true,

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

watch(
    () => state.tabbedIn,
    () => {
        startAutoclicker(state.autoClick);
    },
);

startAutoclicker(state.autoClick);
autoSave(300 * 1000);

export default {
    state: state,
};
