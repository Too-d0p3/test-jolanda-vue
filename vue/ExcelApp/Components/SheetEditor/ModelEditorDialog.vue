<script setup lang="ts">

import Modal from "@/Components/Modal/Modal.vue";
import Button from "@/Components/Inputs/Button.vue";
import ModelEditor from "@/ExcelApp/Components/SheetEditor/ModelEditor.vue";
import { type IModelDefinition, ModelDefinition } from "@/Handsontable/js/ModelDefinition";
import { reactive, ref, watch } from "vue";
import { cloneDeep } from "lodash";

const props = defineProps<{
    modelDefinition: ModelDefinition|null,
    show: boolean
}>();

const emit = defineEmits(['change', 'close', 'save']);

const modelDefinition: IModelDefinition = reactive(props.modelDefinition ? new ModelDefinition(cloneDeep(props.modelDefinition)) : new ModelDefinition(null));
const show = ref<boolean>(props.show);

const save = () => {
    emit('save', modelDefinition);
    close();
}

const close = () => {
    show.value = false;
    emit('close', modelDefinition);
}

watch(() => props.show, (val) => {
    show.value = props.show;
});
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close">
        <template #header>
            Definice data modelu
        </template>
        <template #body>
            <ModelEditor :model-definition="modelDefinition" :clone="false" :base-model="true"></ModelEditor>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>