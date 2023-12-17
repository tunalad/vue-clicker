import { reactive } from "vue";

const state = reactive({
    clicks: 0,
    autoClick: 0,
});

export default {
    state: state,
};
