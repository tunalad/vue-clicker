<script setup>
import { inject } from "vue";

const store = inject("store");

function cookieClicked(e) {
    // score
    store.state.clicks += 1;

    // style
    e.target.classList.add("no-hover");
    setTimeout(() => {
        e.target.classList.remove("no-hover");
    }, 100);
}
</script>

<template>
    <div>
        <img
            ref="vue-cookie"
            src="../assets/vue.svg"
            class="logo vue"
            alt="Vue logo"
            @click="cookieClicked"
            @dragstart.prevent
        />
        <p>{{ store.state.clicks }} projects</p>
        <p>{{ store.state.autoClick }} per second</p>
    </div>
</template>

<style scoped>
.logo {
    cursor: pointer;
    height: 12em;
    padding: 1.5em;
    will-change: filter;
    transition:
        filter 100ms,
        transform 100ms;
}
.logo:not(.no-hover):hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    transform: scale(1.2);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
