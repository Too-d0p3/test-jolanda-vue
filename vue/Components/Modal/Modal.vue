<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    const props = withDefaults(defineProps<{
        isVisible: boolean,
        size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'fullscreen',
    }>(), {
        isVisible: false,
        size: 'medium', // Výchozí velikost
    });

    const emit = defineEmits(['update:isVisible']);

    const sizeClasses = {
        extraSmall: 'max-w-xl',
        small: 'max-w-3xl', // Přizpůsobte tyto hodnoty vašim potřebám
        medium: 'max-w-6xl',
        large: 'max-w-[1500px]',
        fullscreen: 'max-w-full',
    };

    const modalSizeClass = sizeClasses[props.size];

    const closeModal = () => {
        emit('update:isVisible', false);
    };
</script>

<template>
    <Teleport to="body">
        <div v-if="isVisible" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[1000] justify-center items-center w-full md:inset-0 h-[100%] max-h-full flex bg-gray-900/50">
<!--            <div class="absolute z-0 bg-green w-full h-full top-0 ">-->

<!--            </div>-->
            <div class="relative p-4 w-full max-h-full z-100" :class="modalSizeClass" >
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            <slot name="header">
                                Default header content
                            </slot>
                        </h3>
                        <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <!-- SVG and screen reader span for "Close" -->
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4">
                        <slot name="body">
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Default body content.
                            </p>
                        </slot>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <slot name="footer">
                            <button @click="closeModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default action</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>

</style>