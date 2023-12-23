<script setup>
import { ref, defineProps, inject } from "vue";

const store = inject("store");

const props = defineProps({
    name: String,
    modifier: Number,
    cost: Number,
});

function buyClicker() {
    const clickerIndex = store.state.clickers.findIndex(
        (clicker) => clicker.name === props.name,
    );

    if (clickerIndex !== -1 && store.state.clicks >= props.cost) {
        const clicker = store.state.clickers[clickerIndex];
        const price = calcPrice(clicker);

        if (store.state.clicks >= price) {
            store.state.clicks -= price;
            store.state.clickers[clickerIndex].count += 1;
        }
    }
}

function calcPrice(clicker) {
    // price = base price * 1.15
    return clicker.count === 0
        ? clicker.cost
        : Math.ceil(clicker.cost * Math.pow(1.15, clicker.count));
}
</script>

<template>
    <li>
        <button @click="buyClicker">{{ props.name }}</button>
        {{ calcPrice(store.state.clickers.find((c) => c.name === props.name)) }}
        |
        {{
            store.state.clickers.find((clicker) => clicker.name === props.name)
                ?.count
        }}
    </li>
</template>
