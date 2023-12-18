import { reactive, watch } from "vue";

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
    }, speed);
}

const state = reactive({
    clicks: 150,
    autoClick: 0,

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
});

watch(state.clickers, () => {
    state.autoClick = calcSpeed();
    startAutoclicker(1000 / state.autoClick);
});

startAutoclicker(1000 / state.autoClick);

export default {
    state: state,
};
