<script setup>
import { inject, onMounted, onUnmounted } from "vue";

import Cookie from "./components/Cookie.vue";
import Clicker from "./components/Clicker.vue";

const store = inject("store");
const clickers = store.state.clickers;

const handleFocus = () => {
    store.state.tabbedIn = true;
};

const handleBlur = () => {
    store.state.tabbedIn = false;
};

onMounted(() => {
    store.state.loadState();

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
});

onUnmounted(() => {
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("blur", handleBlur);
});
</script>

<template>
    <nav>
        <button @click="store.state.saveState()">Save State</button>
        <button @click="store.state.loadState()">Load State</button>
        <button @click="store.state.resetState()">Reset State</button>
    </nav>

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
                :icon="clicker.icon"
            />
        </ul>
    </div>
</template>

<style scoped>
ul {
    padding: 0;
}
</style>
