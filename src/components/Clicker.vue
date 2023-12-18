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
        console.log("buying clicker", props.name);

        store.state.clickers[clickerIndex].count += 1;
        store.state.clicks -= props.cost;

        console.log(store.state.clickers);
    }
}
</script>

<template>
    <li>
        <button @click="buyClicker">{{ props.name }}</button>
        {{ props.cost }} |
        {{
            store.state.clickers.find((clicker) => clicker.name === props.name)
                ?.count
        }}
    </li>
</template>
