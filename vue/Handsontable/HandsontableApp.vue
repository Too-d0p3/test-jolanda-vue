<script setup lang="ts">
    import Table from './Components/Table/Table.vue';
    import {type ITable} from "@/Handsontable/js/Table.js";
    import {reactive} from "vue";
    import {SheetDefinitionColumn} from "@/Handsontable/js/SheetDefinitionColumn";

    const props = defineProps<{
        table: any
    }>();

    const table = reactive<ITable>(props.table);

    const addColumn = () => {
        // const defColumn = new SheetDefinitionColumn({
        //     type: 'text',
        // });
        //
        // props.table.handsontableSettings.columns = [...props.table.handsontableSettings.columns as [], defColumn];
        table.addColumn(new SheetDefinitionColumn({
            title: '',
            type: 'text',
            defaultValue: '',
            model: '',
            data: '',
        }));
    }
</script>

<template>
    <div>
        EXCEL APP - ID[{{props.table.sheet.id}}] - {{props.table.sheet.name}}
    <!--    <v-btn @click="addColumn" color="grey-lighten-2">Přidat sloupec</v-btn>-->
        <div class="relative h-[867px]">
            <Table :table="props.table" name="table"></Table>
        </div>
    </div>
</template>

<style scoped>

</style>