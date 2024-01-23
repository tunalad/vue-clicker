<script setup>
import { defineProps, inject, ref } from "vue";

const store = inject("store");

const props = defineProps({
    name: String,
    modifier: Number,
    cost: Number,
    icon: String,
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

            store.state.saveState();
        }
    }
}

function calcPrice(clicker) {
    // price = base price * 1.15
    return clicker.count === 0
        ? clicker.cost
        : Math.ceil(clicker.cost * Math.pow(1.15, clicker.count));
}

function getImageUrl() {
    if (props.icon)
        return new URL(`../assets/${props.icon}`, import.meta.url).href;
    return new URL("../assets/vue.svg", import.meta.url).href;
}
</script>

<template>
    <li v-if="store.state.totalClicks < props.cost" class="locked">
        <button @click="buyClicker" disabled class="list-item">
            <div class="icon">
                <!--<img src="../assets/cursor.svg" />-->
                <img :src="getImageUrl()" />
            </div>
            <div class="name-price">
                <p>{{ props.name }}</p>
                <p>{{ props.cost }}</p>
            </div>
            <div class="count">
                <p>0</p>
            </div>
        </button>
    </li>
    <li v-else>
        <button @click="buyClicker" class="list-item">
            <div class="icon">
                <!--<img src="../assets/vue.svg" />-->
                <img :src="getImageUrl()" />
            </div>
            <div class="name-price">
                <p>{{ props.name }}</p>
                <p>
                    {{
                        calcPrice(
                            store.state.clickers.find(
                                (c) => c.name === props.name,
                            ),
                        )
                    }}
                </p>
            </div>
            <div class="count">
                {{
                    store.state.clickers.find(
                        (clicker) => clicker.name === props.name,
                    )?.count
                }}
            </div>
        </button>
    </li>
</template>

<style scoped>
.locked {
    color: gray;
    text-decoration: line-through;
}

.locked button {
    text-decoration: line-through;
    border: none;
}
.locked button:hover {
    border: none;
}

.list-item {
    display: flex;
    justify-content: space-between;
    gap: 0 20px;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
}

p {
    margin: 0;
}

ul {
    padding: 0;
}

li {
    list-style: none;
    padding: 3px 0;
}

img {
    width: 40px;
    height: 40px;
}
</style>
