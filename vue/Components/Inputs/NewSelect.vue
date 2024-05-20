<script setup>
import {ref, computed, onMounted, watch, onUnmounted, nextTick} from "vue";
import axios from "axios";

const props = defineProps({
    options: Array,
    modelValue: [String, Object],
    placeholder: String,
    label: String,
    filterable: Boolean,
    url: String, // URL adresa pro načítání dat
    pageSize: {
        type: Number,
        default: 20, // Počet položek na stránku
    },
    returnObject: {
        type: Boolean,
        default: false, // Vracet objekt místo hodnoty
    },
    remoteName: {
        type: String,
        default: 'Name'
    },
    textFromValue: {
        type: Boolean,
        default: false
    },
    textProperty: {
        type: String,
        default: 'text'
    },
    remoteIdentifier: {
        type: String,
        default: 'ID'
    },
    remoteValueObject: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'default' // možnosti jsou 'small', 'default', 'large'
    },
    readonly: {
        type: Boolean,
        default: false,
    }
});

const options = ref(props.options ?? []);
const getOptionByValue = (value) => {
    return options.value.find(option => option.value === value);
}

const emit = defineEmits(['update:modelValue']);
const isOpen = ref(false);
const filterText = ref('');
const selectedValue = ref(typeof props.modelValue === 'object' ?
    (!props.textFromValue ?
            props.modelValue :
            {value: props.modelValue, text: props.remoteName ? props.modelValue[props.remoteName] ?? null : props.modelValue[props.textProperty] ?? null}
    ) : (getOptionByValue(props.modelValue) ?? props.modelValue));

const filteredOptions = computed(() => {
    return filterText.value
        ? options.value.filter(option =>
            option.text.toLowerCase().includes(filterText.value.toLowerCase())
        )
        : options.value;
});

let timeoutId = null;

const selectOption = (option) => {
    selectedValue.value = option;
    if(props.returnObject){
        emit('update:modelValue', {...option});
    }else{
        emit('update:modelValue', option.value);
    }

    isOpen.value = false;
};

const toggleDropdown = () => {
    setTimeout(() => {
        if(!props.readonly){
            isOpen.value = !isOpen.value;
            nextTick(() => {
                if (isOpen.value) {
                    updateDropdownPosition();
                    requestAnimationFrame(() => {
                        if (searchInputEl.value && props.filterable) {
                            searchInputEl.value.focus();
                        }
                    });
                }
            });
        }
    },100);
};

// Zavření dropdownu kliknutím mimo komponentu
const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown')) {
        isOpen.value = false;
        filterText.value = '';
    }
};
onMounted(() => {
    document.addEventListener('click', closeDropdown);
});
onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', onScroll);
    }
});

const getOptionValue = (value) => {
    return typeof value === 'object' ? JSON.stringify(value) : value;
};

watch(() => props.options, (newOptions) => {
    options.value = newOptions ?? [];
}, { immediate: true });

//AJAX select
const ajaxState = ref({
    'page': 0,
    'count': 10,
    'totalCount': null,
    'isLoading': false,
});
const scrollContainer = ref(null);
const dropdownTriggerEl = ref(null);
const searchInputEl = ref(null);

const loadData = async (reset = false) => {
    if(!props.url){
        return;
    }

    if (reset) {
        ajaxState.value.page = 0;
        options.value = [];
    }

    ajaxState.value.isLoading = true;
    try {
        let urlParams = {
            start: ajaxState.value.page * ajaxState.value.count,
            count: ajaxState.value.count,
        };

        if (filterText.value) {
            urlParams.q = filterText.value;
        }

        const response = await axios.get(props.url, {
            params: urlParams,
        });

        const tmpOptions = response.data.items.map((item) => {
            return {
                value: !props.remoteValueObject ? item[props.remoteIdentifier] : item,
                text: item[props.remoteName],
            }
        });

        options.value.push(...tmpOptions);
        ajaxState.value.totalCount = parseInt(response.data.numRows);
    } catch (error) {
        console.error("Chyba při načítání dat:", error);
    } finally {
        ajaxState.value.isLoading = false;
    }
};

watch(filterText, () => {
    if(isOpen.value){
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            loadData(true).then(() => {
                nextTick(() => {
                    updateDropdownPosition();
                });
            });

        }, 750);
    }
});

watch(isOpen, (newVal) => {
    if (newVal) {
        loadData(true).then(() => {
            updateDropdownPosition();
            requestAnimationFrame(() => {
                if (searchInputEl.value && props.filterable) {
                    searchInputEl.value.focus();
                }
            });
        });
    }
});

const onScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - 10 && options.value.length < ajaxState.value.totalCount && !ajaxState.value.isLoading) {
        ajaxState.value.page++;
        loadData();
    }
};

watch(isOpen, (newVal, oldVal) => {
    if(!props.url){
        return;
    }

    if (newVal === true) {
        nextTick().then(() => {
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', onScroll);
            }
        });
    } else if (oldVal === true) {
        if (scrollContainer.value) {
            scrollContainer.value.removeEventListener('scroll', onScroll);
        }
    }
}, { immediate: false });
//end AJAX select

const inputClass = computed(() => {
    let baseClasses = "border border-gray-300 text-gray-900 rounded-lg relative pr-6 pl-2.5";

    if(props.readonly){
        baseClasses = baseClasses + ' bg-gray-200';
    }else{
        baseClasses = baseClasses + ' bg-gray-50 cursor-pointer';
    }

    switch (props.size) {
        case 'small':
            return `${baseClasses} py-2 min-h-[34px] text-xs`;
        case 'large':
            return `${baseClasses} py-4 min-h-[58px] text-base`;
        default:
            return `${baseClasses} py-2.5 min-h-[42px] text-sm`;
    }
});

const dropdownStyles = ref({});

const getAbsolutePosition = (element) => {
    let top = 0, left = 0;
    while (element) {
        top += element.offsetTop - element.scrollTop + element.clientTop;
        left += element.offsetLeft - element.scrollLeft + element.clientLeft;
        element = element.offsetParent;
    }
    return { top, left };
};

const updateDropdownPosition = () => {
    if (dropdownTriggerEl.value && scrollContainer.value) {
        const { width, height } = dropdownTriggerEl.value.getBoundingClientRect();
        const { top, left } = getAbsolutePosition(dropdownTriggerEl.value);
        const windowHeight = window.innerHeight;
        const dropdownHeight = scrollContainer.value.offsetHeight;
        const relativeTop = top - window.scrollY; // Adjust top to be relative to the window's viewport

        let newTop;
        // Check if dropdown fits below
        if (relativeTop + height + dropdownHeight <= windowHeight) {
            newTop = top + height - 1;
        }
        // Check if dropdown fits above
        else if (relativeTop - dropdownHeight >= 0) {
            newTop = top - dropdownHeight - 1;
        }
        // Default to below if it doesn't fit above either
        else {
            newTop = top + height - 1;
        }

        // Use requestAnimationFrame to avoid layout thrashing
        requestAnimationFrame(() => {
            dropdownStyles.value = {
                position: 'absolute',
                top: `${newTop}px`,
                left: `${left}px`,
                width: `${width}px`,
            };
        });
    }
};
</script>

<template>
    <div class="dropdown w-full relative inline-block" @click.stop>
        <label @click="toggleDropdown" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <div @click="toggleDropdown" :class="inputClass" ref="dropdownTriggerEl">
            {{ selectedValue?.text || placeholder }}
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <!-- Ikona šipky dolů -->
                <svg class="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 9l-7 7-7-7"></path></svg>
            </span>
        </div>
        <Teleport to="body">
            <div v-if="isOpen" :style="dropdownStyles" ref="scrollContainer" style="position: absolute" class="absolute bg-white border border-gray-300 rounded-lg z-10 max-h-[300px] overflow-y-auto text-sm">
                <input ref="searchInputEl" v-if="filterable" type="text" v-model="filterText" class="p-2 w-full" placeholder="Filtrovat...">
                <div v-if="!props.url" v-for="option in filteredOptions" :key="getOptionValue(option.value)" class="px-2 py-1.5 hover:bg-gray-100 hover:cursor-pointer" @click="selectOption(option)">
                    {{ option.text }}
                </div>
                <div v-else v-for="(option, index) in options" :key="index" class="px-2 py-1.5 hover:bg-gray-100 hover:cursor-pointer" @click="selectOption(option)">
                    {{ option.text }}
                </div>
                <div v-if="props.url && ajaxState.isLoading" class="px-2 py-1.5 bg-gray-100">
                    Načítám...
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>

</style>
