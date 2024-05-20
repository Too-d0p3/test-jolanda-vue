<script setup lang="ts">
    const props = defineProps<{
        column: string,
    }>();

    const column = JSON.parse(props.column);
</script>

<template>
    <div class="bg-gray-100 overflow-auto p-2 text-[10px] leading-3">
        <div class="text-[12px] leading-4">
            Data model info
        </div>
        <div>
            <div>
                <b>Data:</b> {{ column.joinData }}
            </div>
            <div>
                <b>Model:</b> {{ column.model }}
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>