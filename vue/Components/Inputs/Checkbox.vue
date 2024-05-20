<script setup>
import {defineProps, defineEmits, ref} from 'vue';

    // Definice props pro ID, label a modelValue
    const props = defineProps({
        id: String,
        label: String,
        modelValue: Boolean,
        inverted: {
          type: Boolean,
          default: false,
        },
    });

    // Definice emit pro aktualizaci modelValue
    const emit = defineEmits(['update:modelValue']);

    const inputEl = ref(null); // Reference na input element (pro focus, blur, atd.

    const getChecked = () => {
        return props.inverted ? !props.modelValue : props.modelValue;
    }

    const onChange = (event) => {
        const checked = event.target.checked;
        emit('update:modelValue', props.inverted ? !checked : checked);
    }
</script>

<template>
    <div class="flex items-center">
        <input ref="inputEl" :id="id" type="checkbox" :checked="getChecked()" @change="onChange"
               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label
            :for="id"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            @click="inputEl.click()"
        >
            {{ label }}
        </label>
    </div>
</template>

<style scoped>

</style>