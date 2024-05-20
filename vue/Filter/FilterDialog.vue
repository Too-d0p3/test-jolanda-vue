<script setup lang="ts">
    import type {FilterDialogProps} from "@/Filter/Types/Filter";
    import {onMounted, provide, reactive, ref, toRaw, watch} from "vue";
    import FilterDialog from "@/Filter/FilterDialog.vue";
    import Filter from "@/Filter/Filter.vue";
    import {Filter as FilterObj} from "@/Filter/js/Filter";
    import {cloneDeep} from "lodash";
    import type {IFilter} from "@/Filter/js/Filter";
    import Button from "@/Components/Inputs/Button.vue";
    import Modal from "@/Components/Modal/Modal.vue";

    const emit = defineEmits(['change', 'close', 'save']);

    const props = defineProps<FilterDialogProps>();

    const show = ref<boolean>(props.show);

    const state = reactive(props.filter ? cloneDeep(props.filter) : new FilterObj(null));
    provide('filterObj', state);

    const save = () => {
        emit('save', state);
        close();
    }

    const close = () => {
        show.value = false;
        emit('close', state);
    }

    watch(() => props.show, (val) => {
        show.value = props.show;
    });
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close">
        <template #header>
            Filtry
        </template>
        <template #body>
            <Filter></Filter>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>