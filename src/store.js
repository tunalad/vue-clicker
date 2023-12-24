import { reactive, watch } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

function calcSpeed() {
    return state.clickers.reduce((totalAutoClick, clicker) => {
        return totalAutoClick + clicker.count * (1 / clicker.modifier);
    }, 0);
}

let intervalId = null;

function startAutoclicker(speed) {
    if (state.autoClick <= 0) return;

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        state.clicks++;
        state.totalClicks++;
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

    clickers: [
        {
            name: "cursor",
            modifier: 10,
            cost: 15,
            count: 0,
        },
        {
            name: "windows user",
            modifier: 5,
            cost: 30,
            count: 0,
        },
        {
            name: "arch user",
            modifier: 1,
            cost: 100,
            count: 0,
        },
        {
            name: "gentoo user",
            modifier: 0.5,
            cost: 150,
            count: 0,
        },
    ],

    saveState() {
        useToast().success("State Saved!");
        localStorage.setItem("game-state", JSON.stringify(state));
    },
    loadState() {
        const savedState = JSON.parse(localStorage.getItem("game-state"));

        if (!savedState) return;

        state.clicks = savedState.clicks;
        state.autoClick = savedState.autoClick;
        state.autosave = savedState.autosave;

        state.clickers.forEach((clicker, i) => {
            clicker.count = savedState.clickers[i].count;
        });
    },
    resetState() {
        localStorage.removeItem("game-state");
    },
});

watch(state.clickers, () => {
    state.autoClick = calcSpeed();
    startAutoclicker(1000 / state.autoClick);
});

startAutoclicker(1000 / state.autoClick);
autoSave(300 * 1000);

export default {
    state: state,
};
