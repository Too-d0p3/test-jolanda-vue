<script setup>
import {ref, watch, defineProps, defineEmits, computed} from 'vue';

    const props = defineProps({
        modelValue: String, // Přijímá hodnotu použitou v v-model z rodičovské komponenty
        label: String,
        id: String,
        type: String,
        placeholder: String,
        required: Boolean,
        size: {
            type: String,
            default: 'default' // možnosti jsou 'small', 'default', 'large'
        },
        readonly: {
            type: Boolean,
            default: false,
        }
    });

    const emit = defineEmits(['update:modelValue']); // Pro aktualizaci hodnoty

    const inputValue = ref(props.modelValue); // Inicializace s modelValue
    const inputEl = ref(null); // Reference na input element (pro focus, blur, atd.

    // Sleduje změny v props.modelValue pro aktualizaci inputValue, pokud se hodnota změní zvenčí
    watch(() => props.modelValue, (newVal) => {
        inputValue.value = newVal;
    });

    // Aktualizuje modelValue při změně hodnoty vstupu
    const updateValue = (value) => {
        emit('update:modelValue', value);
    };

    const inputClass = computed(() => {
        let baseClasses = "border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2.5";

        if(props.readonly){
            baseClasses += " bg-gray-100";
        }else{
            baseClasses += " bg-gray-50";
        }

        switch (props.size) {
            case 'small':
                return `bg-gray-50 ${baseClasses} py-2 text-xs`;
            case 'large':
                return `bg-gray-50 ${baseClasses} py-4 text-base`;
            default:
                return `bg-gray-50 ${baseClasses} py-2.5 text-sm`;
        }
    });
</script>

<template>
    <div>
        <label
            v-if="typeof props.label !== 'undefined'"
            :for="id"
            class="block mb-2 text-sm font-medium text-gray-900"
            @click="inputEl.focus()"
        >
            {{ label }}
        </label>
        <input
            :type="type"
            :id="id"
            :placeholder="placeholder"
            :required="required"
            :value="inputValue"
            @input="updateValue($event.target.value)"
            :class="inputClass"
            :readonly="readonly"
            ref="inputEl"
        />
    </div>
</template>

<style scoped>

</style>