<script setup lang="ts">
    //TODO
    //dataJoin místo data i u joinů ze serveru

    import {reactive, ref} from "vue";
    import DisplaySheet from "@/ExcelApp/Components/DisplaySheet/DisplaySheet.vue";
    import SheetEditor from "@/ExcelApp/Components/SheetEditor/SheetEditor.vue";
    import {SheetManager} from "@/Handsontable/js/SheetManager";
    import { type ISheet, Sheet } from "@/Handsontable/js/Sheet";
    import Button from "@/Components/Inputs/Button.vue";
    import Table from "@/Components/Table/Table.vue";
    import Thead from "@/Components/Table/Thead.vue";
    import TheadTr from "@/Components/Table/TheadTr.vue";
    import Tbody from "@/Components/Table/Tbody.vue";
    import TbodyTr from "@/Components/Table/TbodyTr.vue";
    import TbodyTd from "@/Components/Table/TbodyTd.vue";
    import TheadTh from "@/Components/Table/TheadTh.vue";
    import { cloneDeep } from "lodash";
    import PriceListConfigurator from "@/PriceList/Components/PriceListConfigurator.vue";
    import Checkbox from "@/Components/Inputs/Checkbox.vue";
    import NewSelect from "@/Components/Inputs/NewSelect.vue";
    import DatePicker from "@/Components/Inputs/DatePicker.vue";

    const create = ref<boolean>(false);

    const props = defineProps<{
        remoteUrl?: string
    }>();

    window.remoteUrl = props.remoteUrl ?? '';

    //TODO PODLE APP ID A INTERFACE
    const sheetManager: SheetManager = reactive(new SheetManager());
    sheetManager.load();
    window.sheetManager = sheetManager;

    const selectedSheet = ref<number|null>(null);

    const onCreateFormSubmit = (sheet: ISheet) => {
        create.value = false;
        if(sheet.id === null){
            const id = (sheetManager.getLastSheetID() ?? 0) + 1;

            sheet.id = id;

            sheetManager.addSheet(sheet);
            localStorage.setItem("sheets", JSON.stringify(sheetManager.sheets));
            // setSelectedSheet(id);
        }else{
            sheetManager.updateSheet(sheet);
            unselectSheet(true);
        }

    }

    const setSelectedSheet = (id: number) => {
        selectedSheet.value = id;
    }

    const unselectSheet = (save: boolean) => {
        if(selectedSheet.value === null){
            return;
        }

        if(window.handsontableManager?.getInstance('table')?.handsontable){
            // const data = window.handsontableManager.getInstance('table').handsontable.getSourceData();
            // console.log(data);
            // sheetManager.getSheetByID(selectedSheet.value).data = data;
        }

        if(save){
            localStorage.setItem("sheets", JSON.stringify(sheetManager.sheets));
        }

        selectedSheet.value = null;
    }

    const deleteSheet = (id: number) => {
        sheetManager.removeSheetByID(id);
        localStorage.setItem("sheets", JSON.stringify(sheetManager.sheets));
    }

    const copySheet = (sheet: ISheet) => {
        const newSheet = new Sheet(cloneDeep(sheet));
        newSheet.id = (sheetManager.getLastSheetID() ?? 0)+1;
        sheetManager.addSheet(newSheet);
    }

    //konfigurátor ceníku
    const showPriceListConfigurator = ref<boolean>(false);

    const onConfiguratorSheetCreated = (sheet: ISheet) => {
        onCreateFormSubmit(sheet);
        showPriceListConfigurator.value = false;
        return sheet;
    }
    //end konfigurátor ceníku
</script>

<template>
    <div>
        <div class="w-[90%] m-auto mt-10" v-if="selectedSheet === null">
            <div v-if="!showPriceListConfigurator">
                <div v-if="!create">
                    <div>
                        <div class="flex justify-between items-center">
                            <div><h2 class="text-2xl mb-2">Sheets:</h2></div>
                            <div>
                                <Button @click="showPriceListConfigurator = true" variant="green">Nový ceník</Button>
                                <Button @click="create = true" variant="green">Nový list</Button>
                            </div>
                        </div>

                        <Table class="mt-2">
                            <Thead>
                                <TheadTr>
                                    <TheadTh>ID</TheadTh>
                                    <TheadTh>Název</TheadTh>
                                    <TheadTh></TheadTh>
                                    <TheadTh></TheadTh>
                                    <TheadTh></TheadTh>
                                    <TheadTh></TheadTh>
                                </TheadTr>
                            </Thead>
                            <Tbody>
                                <TbodyTr v-if="sheetManager.sheets.length" v-for="(sheet, index) in sheetManager.sheets" :key="index">
                                    <TbodyTd>{{sheet.id}}<span v-if="sheet.type === 'price-list'">*</span></TbodyTd>
                                    <TbodyTd>{{sheet.name}}</TbodyTd>
                                    <TbodyTd><Button @click="setSelectedSheet(sheet.id as number)" variant="default">Zobrazit</Button></TbodyTd>
                                    <TbodyTd>
                                        <Button v-if="sheet.type === 'price-list'" @click="setSelectedSheet(sheet.id as number); showPriceListConfigurator = true" variant="yellow">Editovat</Button>
                                        <Button v-else @click="setSelectedSheet(sheet.id as number); create = true" variant="yellow">Editovat</Button>
                                    </TbodyTd>
                                    <TbodyTd><Button @click="copySheet(sheet)">Kopírovat</Button></TbodyTd>
                                    <TbodyTd><Button @click="deleteSheet(sheet.id as number)" variant="red">Smazat</Button></TbodyTd>
                                </TbodyTr>
                                <div v-else class="text-left p-3">
                                    <p class="text-xl">Žádný sloupec</p>
                                </div>
                            </Tbody>
                        </Table>
                    </div>
                </div>
                <div v-else>
                    <SheetEditor @submit="onCreateFormSubmit" @back="create = false;" class="px-40"></SheetEditor>
                </div>
            </div>
            <div v-else>
                <PriceListConfigurator :on-create-sheet="onConfiguratorSheetCreated" :on-back-from-definition-editor="() => {showPriceListConfigurator = false;}"></PriceListConfigurator>
            </div>
        </div>
        <div v-else>
            <div v-if="create" class="w-[85%] m-auto mt-10">
                <SheetEditor @submit="onCreateFormSubmit" @back="create = false; unselectSheet(false);" :sheet="sheetManager.getSheetByID(selectedSheet)" class="px-40"></SheetEditor>
            </div>
            <div v-if="showPriceListConfigurator" class="w-[85%] m-auto mt-10">
                <PriceListConfigurator :on-create-sheet="onConfiguratorSheetCreated" :sheet="sheetManager.getSheetByID(selectedSheet)" :show-definition-editor="true" :on-back-from-definition-editor="() => {unselectSheet(false); showPriceListConfigurator = false;}"></PriceListConfigurator>
            </div>
            <DisplaySheet v-else-if="!create" :sheet="sheetManager.getSheetByID(selectedSheet)" @back="unselectSheet(true)"></DisplaySheet>
        </div>
    </div>
</template>

<style scoped>

</style>