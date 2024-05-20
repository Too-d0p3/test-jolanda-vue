<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        colspan: Number
    });
</script>

<template>
    <td :colspan="colspan" scope="row" class="px-6 py-3 font-medium text-gray-900 dark:text-white">
        <slot></slot>
    </td>
</template>

<style scoped>

</style>