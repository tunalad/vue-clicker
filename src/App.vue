<script setup>
import { inject } from "vue";

import Cookie from "./components/Cookie.vue";
import Clicker from "./components/Clicker.vue";

const clickers = inject("store").state.clickers;
</script>

<template>
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
