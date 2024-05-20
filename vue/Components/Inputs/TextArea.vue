<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: String, // Hodnota použitá ve v-model z rodičovské komponenty
    label: String,
    id: String,
    placeholder: String,
    required: Boolean,
    size: {
        type: String,
        default: 'default' // možnosti jsou 'small', 'default', 'large'
    },
    rows: {
        type: Number,
        default: 4 // Defaultní počet řádků
    }
});

const emit = defineEmits(['update:modelValue']); // Pro aktualizaci hodnoty
const inputValue = ref(props.modelValue); // Inicializace s modelValue

const inputEl = ref(null); // Reference na input element (pro focus, blur, atd.

// Sleduje změny v props.modelValue pro aktualizaci inputValue, pokud se hodnota změní zvenčí
watch(() => props.modelValue, (newVal) => {
    inputValue.value = newVal;
});

// Aktualizuje modelValue při změně hodnoty v textovém poli
const updateValue = (value) => {
    emit('update:modelValue', value);
};

const inputClass = computed(() => {
    const baseClasses = "border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    switch (props.size) {
        case 'small':
            return `bg-gray-50 ${baseClasses} p-2 text-xs`;
        case 'large':
            return `bg-gray-50 ${baseClasses} p-4 text-base`;
        default:
            return `bg-gray-50 ${baseClasses} p-2.5 text-sm`;
    }
});
</script>

<template>
    <div>
        <label
            v-if="label"
            :for="id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            @click="inputEl.focus()"
        >
            {{ label }}
        </label>
        <textarea ref="inputEl" :id="id" :placeholder="placeholder" :required="required" :rows="rows" :value="inputValue" @input="updateValue($event.target.value)"
                  :class="inputClass"></textarea>
    </div>
</template>

<style scoped>

</style>