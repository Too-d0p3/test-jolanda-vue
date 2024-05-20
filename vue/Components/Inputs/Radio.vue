<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        id: String,
        value: [String, Number, Object],
        modelValue: [String, Number, Object],
        name: String,
        label: String,
    });

    const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex items-center mb-4">
        <input
            :id="id"
            type="radio"
            :value="value"
            :checked="modelValue === value"
            @change="$emit('update:modelValue', value)"
            :name="name"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <label :for="id" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</label>
    </div>
</template>

<style scoped>

</style>