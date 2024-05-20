<script setup lang="ts">
    import { type IModelDefinition} from "@/Handsontable/js/ModelDefinition";
    import { reactive, ref } from "vue";
    import Button from "@/Components/Inputs/Button.vue";
    import type { IModelDefinitionColumn } from "@/Handsontable/js/ModelDefinitionColumn";
    import { type ISheetDefinitionColumn, SheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
    import Table from "@/Components/Table/Table.vue";
    import TheadTh from "@/Components/Table/TheadTh.vue";
    import Tbody from "@/Components/Table/Tbody.vue";
    import TbodyTr from "@/Components/Table/TbodyTr.vue";
    import Thead from "@/Components/Table/Thead.vue";
    import TbodyTd from "@/Components/Table/TbodyTd.vue";
    import TheadTr from "@/Components/Table/TheadTr.vue";
    import InputField from "@/Components/Inputs/InputField.vue";
    import HighlightText from "@/Components/Other/HighlightText.vue";

    const props = defineProps<{
        modelDefinition: IModelDefinition,
        baseModel?: boolean,
        selectedColumnsList?: ISheetDefinitionColumn[],
    }>();

    const modelDefinition: IModelDefinition = reactive(props.modelDefinition);

    const selectedColumnsList: ISheetDefinitionColumn[] = reactive(props.selectedColumnsList ?? []);

    const selectColumn = (column: IModelDefinitionColumn) => {
        if(!isInList(column)){
            selectedColumnsList.push(new SheetDefinitionColumn({
                title: column.title,
                data: column.data,
                type: column.type,
                defaultValue: column.defaultValue,
                model: modelDefinition.id,
                joinData: column.joinData,
            }));
        }
    };

    const unselectColumn = (column: IModelDefinitionColumn) => {
        const index = selectedColumnsList.findIndex((col) => col.joinData === column.joinData);
        if(index !== -1){
            selectedColumnsList.splice(index, 1);
        }
    };

    const isInList = (column: IModelDefinitionColumn) => {
        const col = selectedColumnsList.find((col) => col.joinData === column.joinData);

        return col !== undefined;
    };

    //limit columns
    const showAllColumns = ref<boolean>(false);
    const limitColumns = 5;
    //limit columns

    //search columns
    const searchColumnQ = ref<string>('');

    const getFilteredColumns = (): IModelDefinitionColumn[] => {
        if(searchColumnQ.value && modelDefinition.columns){
            return modelDefinition.columns.filter((column) => {
                return column.title.toLowerCase().includes(searchColumnQ.value.toLowerCase()) || column.data.toLowerCase().includes(searchColumnQ.value.toLowerCase());
            });
        }

        return modelDefinition.columns ?? [];
    }
    //serach columns
</script>

<template>
    <div>
        <div v-if="modelDefinition.isLoaded">
            <div v-if="baseModel" class="mb-10">
                <div class="text-xl mb-2">
                    Vybrané sloupce pro přidání ({{selectedColumnsList.length}}):
                </div>
                <Table>
                    <Thead>
                        <TheadTr>
                            <TheadTh>Odebrat z výběru</TheadTh>
                            <TheadTh>Data</TheadTh>
                            <TheadTh>Název</TheadTh>
                            <TheadTh>Typ sloupce</TheadTh>
                            <TheadTh>Defaultní hodnota</TheadTh>
                        </TheadTr>
                    </Thead>
                    <Tbody v-if="selectedColumnsList.length">
                        <TbodyTr v-for="(column, index) in selectedColumnsList" :key="index">
                            <TbodyTd>
                                <Button @click="unselectColumn(column)" variant="red" size="extra-small" class="mb-0">X</Button>
                            </TbodyTd>
                            <TbodyTd>{{column.joinData}}</TbodyTd>
                            <TbodyTd>{{column.title}}</TbodyTd>
                            <TbodyTd>{{column.type}}</TbodyTd>
                            <TbodyTd>{{column.defaultValue}}</TbodyTd>
                        </TbodyTr>
                    </Tbody>
                    <Tbody v-else>
                        <TbodyTr>
                            <TbodyTd :colspan="6" class="text-center text-xl">
                                <span class="text-gray-400">Žádný sloupec</span>
                            </TbodyTd>
                        </TbodyTr>
                    </Tbody>
                </Table>
            </div>

            <div class="flex justify-between items-center">
                <div class="text-xl mb-2">
                    Definice tabulky ({{modelDefinition.name}}):
                </div>
                <div v-if="modelDefinition.columns" class="flex items-center justify-center">
                    <div class="mr-2">
                        Sploupců: <span v-if="!searchColumnQ">{{ modelDefinition.columns?.length }}</span><span v-else>[{{ getFilteredColumns()?.length }} z {{ modelDefinition.columns?.length }}]</span>
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
                <Table :class="{'border-l-4 border-l-green-700 rounded-left sm:rounded-bl-none': modelDefinition?.joins?.length}">
                    <Thead>
                        <TheadTr>
                            <TheadTh>Přidat do listu</TheadTh>
                            <TheadTh>Data</TheadTh>
                            <TheadTh>Název</TheadTh>
                            <TheadTh>Typ sloupce</TheadTh>
                            <TheadTh>Defaultní hodnota</TheadTh>
                        </TheadTr>
                    </Thead>
                    <Tbody>
                        <template v-if="modelDefinition.columns">
                            <template v-if="getFilteredColumns()?.length" v-for="(column, index) in getFilteredColumns()" :key="index">
                                <TbodyTr  v-if="index < limitColumns || showAllColumns">
                                    <TbodyTd>
                                        <Button v-if="!isInList(column)" @click="selectColumn(column)" variant="green" size="small" class="mb-0">+</Button>
                                        <Button v-else @click="unselectColumn(column)" variant="red" size="small" class="mb-0 text-base">X</Button>
                                    </TbodyTd>
                                    <TbodyTd>
                                        <HighlightText :highlight="searchColumnQ" :text="column.data"></HighlightText>
                                    </TbodyTd>
                                    <TbodyTd>
                                        <HighlightText :highlight="searchColumnQ" :text="column.title"></HighlightText>
                                    </TbodyTd>
                                    <TbodyTd>{{column.type}}</TbodyTd>
                                    <TbodyTd>{{column.defaultValue}}</TbodyTd>
                                </TbodyTr>
                            </template>
                            <TbodyTr v-else>
                                <TbodyTd :colspan="5" class="text-center text-xl">
                                    <span class="text-red-500">Žádný sloupec nenalezen pro "{{ searchColumnQ }}" <Button @click="searchColumnQ = ''; showAllColumns = false;" variant="red" size="extra-small">X</Button></span>
                                </TbodyTd>
                            </TbodyTr>
                            <TbodyTr v-if="getFilteredColumns().length > limitColumns && !showAllColumns" @click="showAllColumns = true">
                                <TbodyTd :colspan="5" class="text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                                    Zobrazit více (+{{getFilteredColumns().length - 5}})
                                </TbodyTd>
                            </TbodyTr>
                            <TbodyTr v-if="getFilteredColumns().length > limitColumns && showAllColumns" @click="showAllColumns = false">
                                <TbodyTd :colspan="5" class="text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                                    Zobrazit méně
                                </TbodyTd>
                            </TbodyTr>
                        </template>
                        <TbodyTr v-else>
                            <TbodyTd :colspan="6" class="text-center text-xl">
                                <span class="text-gray-400">Žádný sloupec</span>
                            </TbodyTd>
                        </TbodyTr>
                    </Tbody>
                </Table>
            </div>
            <div v-if="modelDefinition.isLoaded && modelDefinition.joins">
                <div v-for="join in modelDefinition.joins">
                    <ModelColumnsSelector v-if="join.modelDefinition" :model-definition="join.modelDefinition" class="pl-12 pt-10 border-l-4 border-l-green-700" :base-model="false" :selected-columns-list="selectedColumnsList"></ModelColumnsSelector>
                </div>
            </div>
        </div>
        <div v-else>
            Vytvořte nejdříve model
        </div>
    </div>
</template>

<style scoped>

</style>