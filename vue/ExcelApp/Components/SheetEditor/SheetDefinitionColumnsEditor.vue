<script setup lang="ts">
    import type { SheetDefinition } from "@/Handsontable/js/SheetDefinition";
    import { reactive, ref } from "vue";
    import Button from "@/Components/Inputs/Button.vue";
    import InputField from "@/Components/Inputs/InputField.vue";
    import {
        type ISheetDefinitionColumn,
    } from "@/Handsontable/js/SheetDefinitionColumn";
    import ModelColumnsSelectorDialog from "@/ExcelApp/Components/SheetEditor/ModelColumnsSelectorDialog.vue";
    import type { ModelDefinition } from "@/Handsontable/js/ModelDefinition";
    import type { IModelDefinitionColumn } from "@/Handsontable/js/ModelDefinitionColumn";
    import SheetDefinitionColumnEditorDialog
        from "@/ExcelApp/Components/SheetEditor/SheetDefinitionColumnEditorDialog.vue";
    import Table from "@/Components/Table/Table.vue";
    import TheadTh from "@/Components/Table/TheadTh.vue";
    import Tbody from "@/Components/Table/Tbody.vue";
    import Thead from "@/Components/Table/Thead.vue";
    import TbodyTd from "@/Components/Table/TbodyTd.vue";
    import TheadTr from "@/Components/Table/TheadTr.vue";
    import HighlightText from "@/Components/Other/HighlightText.vue";

    const props = defineProps<{
        sheetDefinition: SheetDefinition,
        modelDefinition: ModelDefinition,
    }>();

    const emit = defineEmits(['save']);

    const sheetDefinition = reactive<SheetDefinition>(props.sheetDefinition);
    const modelDefinition = reactive<ModelDefinition>(props.modelDefinition);

    const saveModelsColumnSelector = (newSheetColumnsList: ISheetDefinitionColumn[]) => {
        newSheetColumnsList.forEach((column, index) => {
            sheetDefinition.addColumn(column);
        });
    };

    //ADD COLUMN
    const addingColumn = ref<boolean>(false);
    const editingColumnIndex = ref<number|null>(null);

    const addColumn = (column: ISheetDefinitionColumn) => {
        if(editingColumnIndex.value !== null && sheetDefinition.columns){
            sheetDefinition.columns[editingColumnIndex.value] = column;
        }else{
            sheetDefinition.addColumn(column);
        }
    }
    //END ADD COLUMN

    //Model columns selector dialo
    const selectingModelColumns = ref<boolean>(false);
    //END Model columns selector dialog

    const unselectColumn = (index: number) => {
        if(!sheetDefinition.columns){
            return;
        }

        if(index !== -1){
            sheetDefinition.columns.splice(index, 1);
        }
    };

    //limit columns
    const showAllColumns = ref<boolean>(false);
    const limitColumns = 5;
    //limit columns

    //search columns
    const searchColumnQ = ref<string>('');

    const getFilteredColumns = (): IModelDefinitionColumn[] | undefined => {
        if(searchColumnQ.value){
            return sheetDefinition.getColumnsSortByPosition().filter((column) => {
                return column.title.toLowerCase().includes(searchColumnQ.value.toLowerCase()) || column.joinData?.toLowerCase().includes(searchColumnQ.value.toLowerCase());
            });
        }

        return sheetDefinition.getColumnsSortByPosition();
    }
    //serach columns


    //Draggable
    const onAfterColDrag = (val: any, oldVal: any) => {
        val.forEach((column: any, index: number) => {
           sheetDefinition.moveColumnToPosition(column.position, index);
        });
    };
    //end draggable
</script>

<template>
    <div>
        <div class="text-xl mb-3">
            Sloupce v listu (<span v-if="!searchColumnQ">{{ sheetDefinition.columns?.length }}</span><span v-else>{{ getFilteredColumns()?.length }} z {{ sheetDefinition.columns?.length }}</span>)
        </div>
        <div class="flex justify-between">
            <div>
                <Button @click="addingColumn = true;" variant="green">Přidat sloupec</Button>
                <!-- @vue-ignore -->
                <SheetDefinitionColumnEditorDialog v-if="addingColumn" :show="addingColumn" @close="addingColumn = false; editingColumnIndex = null;" @save="addColumn" :column="editingColumnIndex === null ? null : sheetDefinition.columns ? sheetDefinition.columns[editingColumnIndex] : null"></SheetDefinitionColumnEditorDialog>
                <Button v-if="modelDefinition.isLoaded" @click="selectingModelColumns = true;" variant="green">Přidat sloupce z data modelu</Button>
                <ModelColumnsSelectorDialog
                    v-if="selectingModelColumns"
                    :show="selectingModelColumns"
                    :model-definition="modelDefinition"
                    @close="selectingModelColumns = false"
                    @save="saveModelsColumnSelector"
                >
                </ModelColumnsSelectorDialog>
            </div>
            <div v-if="sheetDefinition.columns?.length" class="flex items-center justify-center">
                <div v-if="searchColumnQ" class="mr-2">
                    Sloupců: [{{ getFilteredColumns()?.length }} z {{ sheetDefinition.columns?.length }}]
                </div>
                <InputField
                    v-model="searchColumnQ"
                    placeholder="Vyhledávání..."
                    class="mr-1"
                />
                <Button @click="searchColumnQ = ''; showAllColumns = false;" variant="red" size="extra-small">X</Button>
            </div>
        </div>
        <div class="mt-2">
            <Table class="relative">
                <Thead>
                    <TheadTr>
                        <TheadTh>Data</TheadTh>
                        <TheadTh>Název</TheadTh>
                        <TheadTh>Typ sloupce</TheadTh>
                        <TheadTh>Defaultní hodnota</TheadTh>
                        <TheadTh>Formátování</TheadTh>
                        <TheadTh></TheadTh>
                    </TheadTr>
                </Thead>
                <Tbody :draggable="true" :list="getFilteredColumns()" @on-after-drag="onAfterColDrag">
                    <template v-slot="{ element }">
                        <TbodyTd><HighlightText :highlight="searchColumnQ" :text="element.joinData"></HighlightText></TbodyTd>
                        <TbodyTd><HighlightText :highlight="searchColumnQ" :text="element.title"></HighlightText></TbodyTd>
                        <TbodyTd>{{element.type}}</TbodyTd>
                        <TbodyTd>
                            <InputField
                                v-model="element.defaultValue"
                                placeholder="Defaultní hodnota"
                                class="w-[350px]"
                            />
                        </TbodyTd>
                        <TbodyTd>
                            <InputField
                                v-model="element.formating"
                                placeholder="Formátování"
                                class="w-[350px]"
                            />
                        </TbodyTd>
                        <TbodyTd>
<!--                            <Button @click="unselectColumn(index)" variant="red" size="small" class="mb-0">X</Button>-->
<!--                            <Button @click="addingColumn = true; editingColumnIndex = index;" variant="yellow" size="small" class="mb-0">E</Button>-->
                        </TbodyTd>
                    </template>
                </Tbody>
<!--                <Tbody v-if="sheetDefinition.columns?.length">-->
<!--    &lt;!&ndash;                TODO mazání/edit přes indexy je při filtru nefunkční &ndash;&gt;-->
<!--                    <template v-if="getFilteredColumns()?.length" v-for="(column, index) in getFilteredColumns()" :key="index">-->
<!--                        <TbodyTr v-if="index < limitColumns || showAllColumns">-->
<!--                            <TbodyTd><HighlightText :highlight="searchColumnQ" :text="column.joinData"></HighlightText></TbodyTd>-->
<!--                            <TbodyTd><HighlightText :highlight="searchColumnQ" :text="column.title"></HighlightText></TbodyTd>-->
<!--                            <TbodyTd>{{column.type}}</TbodyTd>-->
<!--                            <TbodyTd>-->
<!--                                <InputField-->
<!--                                    v-model="column.defaultValue"-->
<!--                                    placeholder="Defaultní hodnota"-->
<!--                                    class="w-[350px]"-->
<!--                                />-->
<!--                            </TbodyTd>-->
<!--                            <TbodyTd>-->
<!--                                <InputField-->
<!--                                    v-model="column.formating"-->
<!--                                    placeholder="Formátování"-->
<!--                                    class="w-[350px]"-->
<!--                                />-->
<!--                            </TbodyTd>-->
<!--                            <TbodyTd>-->
<!--                                <Button @click="unselectColumn(index)" variant="red" size="small" class="mb-0">X</Button>-->
<!--                                <Button @click="addingColumn = true; editingColumnIndex = index;" variant="yellow" size="small" class="mb-0">E</Button>-->
<!--                            </TbodyTd>-->
<!--                        </TbodyTr>-->
<!--                    </template>-->
<!--                    <TbodyTr v-else >-->
<!--                        <TbodyTd :colspan="6" class="text-center text-xl">-->
<!--                            <span class="text-red-500">Žádný sloupec nenalezen pro "{{ searchColumnQ }}" <Button @click="searchColumnQ = ''; showAllColumns = false;" variant="red" size="extra-small">X</Button></span>-->
<!--                        </TbodyTd>-->
<!--                    </TbodyTr>-->
<!--                    <TbodyTr v-if="getFilteredColumns().length > limitColumns && !showAllColumns" @click="showAllColumns = true">-->
<!--                        <TbodyTd :colspan="6" class="text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">-->
<!--                            Zobrazit více (+{{getFilteredColumns().length - 5}})-->
<!--                        </TbodyTd>-->
<!--                    </TbodyTr>-->
<!--                    <TbodyTr v-if="getFilteredColumns().length > limitColumns && showAllColumns" @click="showAllColumns = false">-->
<!--                        <TbodyTd :colspan="6" class="text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">-->
<!--                            Zobrazit méně-->
<!--                        </TbodyTd>-->
<!--                    </TbodyTr>-->
<!--                </Tbody>-->
<!--                <Tbody v-else>-->
<!--                    <TbodyTr>-->
<!--                        <TbodyTd :colspan="6" class="text-center text-xl">-->
<!--                            <span class="text-gray-400">Žádný sloupec</span>-->
<!--                        </TbodyTd>-->
<!--                    </TbodyTr>-->
<!--                </Tbody>-->
            </Table>

        </div>
    </div>
</template>

<style scoped>

</style>