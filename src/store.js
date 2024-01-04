import { reactive, watch } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

function calcSpeed() {
    return state.clickers.reduce((totalAutoClick, clicker) => {
        return totalAutoClick + clicker.count * (1 / clicker.modifier);
    }, 0);
}

function calcMod(cps) {
    return 1 / cps;
}

let intervalId = null;

function startAutoclicker(speed) {
    if (state.autoClick <= 0) return;

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        const cps = 1000 / speed; // clicks per second
        const magnitude = Math.floor(Math.log10(cps));
        const increment = magnitude >= 1 ? Math.ceil(2 ** magnitude) : 1;

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

    clickers: [
        {
            name: "Cursor",
            modifier: calcMod(0.1),
            cost: 15,
            count: 0,
        },
        {
            name: "Windows user",
            modifier: calcMod(1),
            cost: 100,
            count: 0,
        },
        {
            name: "Mac user",
            modifier: calcMod(8),
            cost: 1100,
            count: 0,
        },
        {
            name: "Ubuntu user",
            modifier: calcMod(47),
            cost: 12000,
            count: 0,
        },
        {
            name: "Arch user",
            modifier: calcMod(260),
            cost: 130000,
            count: 0,
        },
        {
            name: "Gentoo user",
            modifier: calcMod(1400),
            cost: 1400000,
            count: 0,
        },
        {
            name: "LFS user",
            modifier: calcMod(7800),
            cost: 1400000,
            count: 0,
        },
        {
            name: "BSD user",
            modifier: calcMod(44000),
            cost: 20000000,
            count: 0,
        },
        {
            name: "TempleOS user",
            modifier: calcMod(260000),
            cost: 330000000,
            count: 0,
        },
        // more will be added in the future.
        // I don't know what the other will be
        // but I WILL make sure that the MX Linux is the last
        // (and the one giving the most)
    ],

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
    startAutoclicker(1000 / state.autoClick);
});

startAutoclicker(1000 / state.autoClick);
autoSave(300 * 1000);

export default {
    state: state,
};
