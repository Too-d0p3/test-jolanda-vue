<script setup lang="ts">
    import type { IModelDefinition } from "@/Handsontable/js/ModelDefinition";
    import { reactive, ref } from "vue";
    import Modal from "@/Components/Modal/Modal.vue";
    import Button from "@/Components/Inputs/Button.vue";
    import ModelColumnsSelector from "@/ExcelApp/Components/SheetEditor/ModelColumnsSelector.vue";
    import type { ISheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";

    const emit = defineEmits(['change', 'close', 'save']);

    const props = defineProps<{
        modelDefinition: IModelDefinition,
        show: boolean,
    }>();

    const modelDefinition: IModelDefinition = reactive(props.modelDefinition);
    const selectedColumnsList: ISheetDefinitionColumn[] = reactive([]);
    const show = ref<boolean>(props.show);

    const save = () => {
        emit('save', selectedColumnsList);
        close();
    }

    const close = () => {
        show.value = false;
        emit('close', selectedColumnsList);
    }
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close">
        <template #header>
            Přidání sloupců z data modelu
        </template>
        <template #body>
            <ModelColumnsSelector :model-definition="modelDefinition" :base-model="true" :selected-columns-list="selectedColumnsList"></ModelColumnsSelector>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>