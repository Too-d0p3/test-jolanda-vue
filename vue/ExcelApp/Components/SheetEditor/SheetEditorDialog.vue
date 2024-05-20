<script setup lang="ts">
    import Button from "@/Components/Inputs/Button.vue";
    import { reactive, ref } from "vue";
    import Modal from "@/Components/Modal/Modal.vue";
    import { cloneDeep } from "lodash";
    import { Sheet } from "@/Handsontable/js/Sheet";
    import SheetEditor from "@/ExcelApp/Components/SheetEditor/SheetEditor.vue";

    const props = defineProps<{
        sheet?: Sheet|null,
        show: boolean,
    }>();

    const emit = defineEmits(['close', 'save']);

    const sheet: Sheet = reactive(props.sheet ? new Sheet(cloneDeep(props.sheet)) : new Sheet(null));

    const show = ref<boolean>(props.show);

    const save = () => {
        emit('save', sheet);
        close();
    }

    const close = () => {
        show.value = false;
        emit('close', sheet);
    }
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close" size="large">
        <template #header>
            <p v-if="props.sheet">Úprava listu</p>
            <p v-else>Vytvoření listu</p>
        </template>
        <template #body>
            <SheetEditor @submit="save" @back="close" :sheet="sheet" :clone="false"></SheetEditor>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>