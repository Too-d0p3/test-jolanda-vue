<script setup>
import { defineProps } from "vue";

const props = defineProps({
    colspan: Number
});
</script>

<template>
    <th :colspan="colspan" scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <slot></slot>
    </th>
</template>

<style scoped>

</style>