import { reactive, watch } from "vue";

function calcSpeed() {
    return state.clickers.reduce((totalAutoClick, clicker) => {
        return totalAutoClick + clicker.count * (1 / clicker.modifier);
    }, 0);
}

function startAutoclicker() {}

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
    ],
});

watch(state, () => {
    console.log("State modified:", state);
    state.autoClick = calcSpeed();
});

startAutoclicker();

export default {
    state: state,
};
