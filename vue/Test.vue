<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    prop1: String
});

const msg = ref('ahoj');

const getProp1 = () => {
    // Výpis do konzole pro testování
    return props.prop1;
};
</script>

<template>
    <br>
    TESTOVACI
    prop1 = {{ prop1 }}<br>
    msg = {{ msg }}<br>
    <button @click="getProp1">Získat prop1</button>
    <br>
</template>

<style scoped>

</style>