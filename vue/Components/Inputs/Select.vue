<script setup>
    import { watch, defineProps, defineEmits, ref, computed } from 'vue';

    const props = defineProps({
        id: String,
        modelValue: [String, Object],
        options: Array,
        placeholder: String,
        label: String,
    });

    const emit = defineEmits(['update:modelValue']);
    const selectedValue = ref(typeof props.modelValue === 'object' ? JSON.stringify(props.modelValue) : props.modelValue);

    // Zjistí, zda je hodnota objekt a serializuje ji, pokud ano; jinak vrátí hodnotu přímo
    const getOptionValue = (value) => {
        return typeof value === 'object' ? JSON.stringify(value) : value;
    };

    // Vypočítává aktuální vybranou hodnotu pro použití s v-model
    const computedModelValue = computed({
        get: () => typeof props.modelValue === 'object' ? JSON.stringify(props.modelValue) : props.modelValue,
        set: (newValue) => {
            let parsedValue;
            try {
                // Pokusí se deserializovat hodnotu, pokud je to možné
                parsedValue = JSON.parse(newValue);
            } catch (e) {
                // Pokud deserializace selže, použije původní hodnotu
                parsedValue = newValue;
            }
            emit('update:modelValue', parsedValue);
        }
    });

    // Sleduje změny modelValue a aktualizuje selectedValue
    watch(() => props.modelValue, (newValue) => {
        selectedValue.value = typeof newValue === 'object' ? JSON.stringify(newValue) : newValue;
    });

    // Emituje změnu při výběru možnosti
    const emitChange = () => {
        computedModelValue.value = selectedValue.value;
    };
</script>

<template>
    <div>
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <select :id="id" v-model="selectedValue" @change="emitChange"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="getOptionValue(option.value)">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<style scoped>

</style>