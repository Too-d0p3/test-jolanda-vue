<script setup>
import {defineEmits, onMounted, onUnmounted, ref, watch} from "vue";
import Datepicker from 'flowbite-datepicker/Datepicker';
import DateRangePicker from 'flowbite-datepicker/DateRangePicker';
import moment from "moment";

const props = defineProps({
    modelValue: {
        type: [String, Object],
        default: ''
    },
    returnObject: {
        type: Boolean,
        default: false
    },
    returnFormat: {
        type: String,
        default: 'YYYY-MM-DD'
    },
    inputFormat: {
        type: String,
        default: 'YYYY-MM-DD'
    },
    range: {
        type: Boolean,
        default: false
    },
    label: String,
});

function getDateObject(date){
    if(!date){
        return null;
    }

    if(typeof date === 'object'){
        return date;
    }else{
        return moment(date, props.inputFormat).toDate(); // Parsování řetězce na objekt Date pomocí moment.js
    }
}

function initObject(obj){
    if(!props.range){
        return getDateObject(obj);
    }else{
        let newObj = {
            from: null,
            to: null,
        };

        if(obj){
            Object.entries(obj).forEach(([key, value]) => {
                newObj[key] = getDateObject(value);
            });

            return newObj;
        }else{
            return newObj;
        }
    }
}

const emit = defineEmits(['update:modelValue']);

const elInput = ref(null);
const selectedDate = ref(initObject(props.modelValue));
function setDateToDatePicker(newDate) {
    if(!newDate){
        return;
    }

    if(props.range){
        elInput.value.rangepicker.inputs.forEach((el, index) => {
            if(index === 0){
                el.datepicker.setDate(getDateObject(newDate['from'] ?? null));
            }else{
                el.datepicker.setDate(getDateObject(newDate['to'] ?? null));
            }
        });
    }else{
        elInput.value.datepicker.setDate(getDateObject(newDate));
    }
}
const fromDateChange = (event) => {
    onDateChange(event, 'from');
}
const toDateChange = (event) => {
    onDateChange(event, 'to');
}
const onDateChange = (event, range = null) => {
    // Tato událost by měla mít přístup k aktualizovanému datu
    if (event.detail) {
        if(!props.range) {
            selectedDate.value = event.detail.date;
        }

        if(props.returnObject){
            if(props.range){
                if(range === 'from'){
                    selectedDate.value = {
                      ...selectedDate.value ?? {},
                      from: event.detail.date,
                    };
                }else if(range === 'to'){
                    selectedDate.value = {
                        ...selectedDate.value ?? {},
                        to: event.detail.date,
                    };
                }
            }
            emit('update:modelValue', selectedDate.value);
        }else{
            const rawDate = event.detail.date;
            const formattedDate = moment(rawDate).format(props.returnFormat);

            if(props.range){
                if(range === 'from'){
                    selectedDate.value = {
                        ...selectedDate.value ?? {},
                        from: formattedDate,
                    };
                }else if(range === 'to'){
                    selectedDate.value = {
                        ...selectedDate.value ?? {},
                        to: formattedDate,
                    };
                }
                emit('update:modelValue', selectedDate.value);
            }else{
                emit('update:modelValue', formattedDate);
            }
        }
    };
}
onMounted(() => {
    if(props.range){
        new DateRangePicker(elInput.value, {
        });
    }else{
        new Datepicker(elInput.value, {
        });
    }

    setDateToDatePicker(selectedDate.value);

    if(props.range){
        elInput.value.rangepicker.inputs.forEach((el, index) => {
            if(index === 0){
                el.addEventListener('changeDate', fromDateChange);
            }else{
                el.addEventListener('changeDate', toDateChange);
            }
        });
    }else{
        elInput.value.addEventListener('changeDate', onDateChange);
    }

});

onUnmounted(() => {
    if(!elInput.value){
        return;
    }
    if(props.range){
        elInput.value.rangepicker.inputs.forEach((el, index) => {
            if(index === 0){
                el.removeEventListener('changeDate', fromDateChange);
            }else{
                el.removeEventListener('changeDate', toDateChange);
            }
        });
    }else{
        elInput.value.removeEventListener('changeDate', onDateChange);
    }
});

watch(elInput, (value, oldValue) => {
    if(!value && oldValue){
        if(props.range){
            oldValue.rangepicker.inputs.forEach((el, index) => {
                if(index === 0){
                    el.removeEventListener('changeDate', fromDateChange);
                }else{
                    el.removeEventListener('changeDate', toDateChange);
                }
            });
        }else{
            oldValue.removeEventListener('changeDate', onDateChange);
        }
    }
})

watch(props.modelValue, (newValue) => {
    selectedDate.value = initObject(newValue);

    setDateToDatePicker(newValue);
});
</script>

<template>
    <div v-if="!props.range">
        <label
            v-if="typeof props.label !== 'undefined'"
            class="block mb-2 text-sm font-medium text-gray-900"
            @click="elInput.focus()"
        >
            {{ label }}
        </label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <input ref="elInput" datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
        </div>
    </div>
    <div v-else>
        <label
            v-if="typeof props.label !== 'undefined'"
            class="block mb-2 text-sm font-medium text-gray-900"
        >
            {{ label }}
        </label>
        <div ref="elInput" class="flex items-center">
            <div class="relative mr-4">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                </div>
                <input datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
            </div>
            <div>
                -
            </div>
            <div class="relative ml-4">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                </div>
                <input datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>