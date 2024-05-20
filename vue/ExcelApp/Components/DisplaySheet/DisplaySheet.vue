<script setup lang="ts">

import HandsontableApp from "@/Handsontable/HandsontableApp.vue";
import { onMounted, reactive, ref } from "vue";
import {type ISheet} from "@/Handsontable/js/Sheet";
import {type ITable, Table} from "@/Handsontable/js/Table.js";
import Button from "@/Components/Inputs/Button.vue";
import SheetEditorDialog from "@/ExcelApp/Components/SheetEditor/SheetEditorDialog.vue";
import RowDataDialog from "@/Handsontable/Components/Table/RowDataDialog.vue";

const props = defineProps<{
    sheet: ISheet
}>();

const emit = defineEmits(['back']);

const handsontableSettings = {
    data: props.sheet.data,
};

const table = reactive<ITable>(new Table({
    // sheet: new Sheet(cloneDeep(Object.fromEntries(Object.entries(props.sheet))) as SheetState),
    sheet: props.sheet,
    handsontableSettings: handsontableSettings,
    onBeforeShowRowDataDialog: () => {
        showRowDataDialog.value = true;
    },
}));
//
// markRaw(table.handsontableSettings);

//sheetEditorDialog
const showEditorDialog = ref<boolean>(false);

const editorDialogSave = (sheet: ISheet) => {
    table.sheet = sheet;
    table.init();
    showEditorDialog.value = false;
};
//end sheetEditorDialog

onMounted(() => {

});


//ROW DATA
const showRowDataDialog = ref<boolean>(false);
//end ROW DATA

const back = () => {
    if(table.sheet){
        table.sheet.data = [[]];
    }

    emit('back');
};

const getRowDataDialogData = () => {
    const selectLast = table.handsontable?.getSelectedLast();
    if(selectLast){
        const index = selectLast[0];
        if(index){
            return table.sheet?.data[index] ?? {};
        }
    }

    return {};
}
</script>

<template>
    <div class="pt-4">
        <Button @click="back" variant="yellow" class="ml-2">Zpět</Button>
        <Button @click="table.loadData()">Load URL data</Button>
        <Button @click="">Send data to server</Button>
        <Button @click="showEditorDialog = true" variant="yellow">Definice listu</Button>
<!--        <Button @click="table.loadData(table.sheet?.modelDefinition?.joins[0].modelDefinition)">Load TEST data</Button>-->
        <HandsontableApp :table="table" class="mt-2"></HandsontableApp>
        <SheetEditorDialog v-if="showEditorDialog" :show="showEditorDialog" :sheet="table.sheet" @close="showEditorDialog = false" @save="editorDialogSave"></SheetEditorDialog>
<!--        //@ts-ignore-->
        <RowDataDialog v-if="showRowDataDialog && table.sheet && table.handsontable?.getSelectedLast()" :data="getRowDataDialogData()" :show="showRowDataDialog" @close="showRowDataDialog = false;"></RowDataDialog>
    </div>
</template>

<style scoped>

</style>