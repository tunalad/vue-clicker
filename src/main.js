import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store.js";

createApp(App).provide("store", store).mount("#app");
