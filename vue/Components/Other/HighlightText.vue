<script setup>
    import { computed, defineProps } from "vue";

    const props = defineProps({
        highlight: String,
        text: String,
    });

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const highlightedText = computed(() => {
        if(!props.text){
            return "";
        }

        if (!props.highlight) {
            return props.text;
        }

        const regex = new RegExp(escapeRegExp(props.highlight), 'gi');

        return props.text.replace(regex, (match) => {
            return `<span class="bg-yellow-300 text-red-500">${match}</span>`;
        });
    });

</script>

<template>
    <div v-html="highlightedText"></div>
</template>

<style scoped>

</style>