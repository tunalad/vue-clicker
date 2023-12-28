<script setup>
import { inject, onMounted } from "vue";

import Cookie from "./components/Cookie.vue";
import Clicker from "./components/Clicker.vue";

const store = inject("store");
const clickers = store.state.clickers;

onMounted(() => {
    store.state.loadState();
});
</script>

<template>
    <button @click="store.state.saveState()">Save State</button>
    <button @click="store.state.loadState()">Load State</button>
    <button @click="store.state.resetState()">Reset State</button>

    <Cookie />

    <div>
        <h2>shop</h2>
        <ul>
            <Clicker
                v-for="clicker in clickers"
                :key="clicker.name"
                :name="clicker.name"
                :modifier="clicker.modifier"
                :cost="clicker.cost"
            />
        </ul>
    </div>
</template>
