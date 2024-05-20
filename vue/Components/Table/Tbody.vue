<script setup>
import {defineProps, ref, watch} from "vue";
import draggable from "vuedraggable";
import TbodyTr from "@/Components/Table/TbodyTr.vue";

    const props = defineProps({
        draggable: {
            type: Boolean,
            required: false,
            default: false,
        },
        list: {
            type: Array,
            required: false,
            default: null
        },
    });

    const emit = defineEmits(['onAfterDrag']);

    const list = ref(props.list);

    watch(list, (value, oldValue) => {
        emit('onAfterDrag', value, oldValue);
    });

    watch(() => props.list, (value, oldValue) => {
        list.value = value;
    });
</script>

<template>
    <tbody v-if="!props.draggable">
        <slot></slot>
    </tbody>
    <draggable v-else v-model="list" tag="tbody" item-key="joinData">
        <template #item="{ element }">
            <TbodyTr>
                <slot :element="element"></slot>
            </TbodyTr>
        </template>
    </draggable>
</template>

<style scoped>

</style>