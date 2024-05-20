<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        colspan: Number
    });
</script>

<template>
    <th :colspan="colspan" scope="col" class="px-6 py-3">
        <slot></slot>
    </th>
</template>

<style scoped>

</style>