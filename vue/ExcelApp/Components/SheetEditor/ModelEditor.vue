<script setup lang="ts">
    import {type IModelDefinition, ModelDefinition, type ModelDefinitionState} from "@/Handsontable/js/ModelDefinition";
    import {onMounted, reactive, ref} from "vue";
    import {cloneDeep} from "lodash";
    import {
        type IModelDefinitionColumn,
    } from "@/Handsontable/js/ModelDefinitionColumn";
    import axios from "axios";
    import {type IModelDefinitionJoin, ModelDefinitionJoin} from "@/Handsontable/js/ModelDefinitionJoin";
    import {Filter, type FilterState, type IFilter} from "@/Filter/js/Filter";
    import {FilterItem} from "@/Filter/js/FilterItem";
    import {useModelDefinitionLoader} from "@/ExcelApp/Hooks/useModelDefinitionLoader";
    import FilterDialog from "@/Filter/FilterDialog.vue";
    import Select from "@/Components/Inputs/Select.vue";
    import Button from "@/Components/Inputs/Button.vue";
    import { useUpdateReactiveObject } from "@/Hooks/useUpdateReactiveObject.js";
    import JoinEditorDialog from "@/ExcelApp/Components/SheetEditor/JoinEditorDialog.vue";
    import Table from "@/Components/Table/Table.vue";
    import TheadTh from "@/Components/Table/TheadTh.vue";
    import Tbody from "@/Components/Table/Tbody.vue";
    import TbodyTr from "@/Components/Table/TbodyTr.vue";
    import Thead from "@/Components/Table/Thead.vue";
    import TbodyTd from "@/Components/Table/TbodyTd.vue";
    import TheadTr from "@/Components/Table/TheadTr.vue";
    import NewSelect from "@/Components/Inputs/NewSelect.vue";

    const props = defineProps<{
        modelDefinition: IModelDefinition,
        clone: boolean,
        baseModel: boolean
    }>();

    const emit = defineEmits(['save']);

    const modelDefinition: IModelDefinition = reactive(props.clone ? new ModelDefinition(cloneDeep(props.modelDefinition)) : props.modelDefinition);

    onMounted(() => {
        if(modelDefinition.columns?.length){
            modelDefinition.isLoaded = true;
        }
    });

    const {loadModelDefinition} = useModelDefinitionLoader();

    //JOINS
    const addingJoin = ref<boolean>(false);
    const addJoin = async (newJoin: IModelDefinitionJoin) => {
        modelDefinition.joins = [
            ...modelDefinition.joins ?? [],
            newJoin,
        ];
        addingJoin.value = false;
    }
    //END JOINS

    //limit columns
    const showAllColumns = ref<boolean>(false);
    const limitColumns = 5;
    //limit columns


    //ADD COLUMN
    // const addingModelColumn = ref<boolean>(false);
    // const addingModelColumnData = ref<ModelDefinitionColumnState>({
    //     title: '',
    //     data: '',
    //     type: 'text',
    //     defaultValue: '',
    //     useInSheet: false,
    // });
    //
    // const addModelColumn = () => {
    //     modelDefinition.columns = [
    //         ...modelDefinition.columns ?? [],
    //         new ModelDefinitionColumn(addingModelColumnData.value),
    //     ];
    //     addingModelColumn.value = false;
    //     addingModelColumnData.value = {
    //         title: '',
    //         data: '',
    //         type: 'text',
    //         defaultValue: '',
    //     };
    // }
    //END ADD COLUMN

    //filter dialog
    const filterDialogOpen = ref<boolean>(false);

    const mapColumnsForFilters = () => {
        if(!modelDefinition.columns)
            return;

        let filterState: FilterState = {
            items: {}
        };
        modelDefinition.columns?.forEach((column: IModelDefinitionColumn) => {
            if(modelDefinition.dataFilter && Object.keys(modelDefinition.dataFilter.items).indexOf(column.data) >= 0){
                filterState.items[column.data] = modelDefinition.dataFilter.items[column.data];
                filterState.items[column.data].name = modelDefinition.getColumnByData(column.data)?.title ?? '';
                return;
            }

            const filterItem: FilterItem = new FilterItem({
                name: column.title,
                filters: [],
            });

            filterState.items[column.data] = filterItem;
        });

        return new Filter(filterState);
    }

    const onFilterSave = (filter: IFilter) => {
        filter.reduceItemsFilters();

        modelDefinition.dataFilter = filter;
    }
    //END filter dialog


    //BASE MODEL
    const { updateObject } = useUpdateReactiveObject();

    const modelList = ref<ModelDefinitionState[]>([]);
    const selectedModel = ref<ModelDefinitionState|null>(null);

    const loadModelList = () => {
        axios.get(window.remoteUrl+'/admin/sheets/get-definitions').then((response) => {
            try {
                modelList.value = response.data;
            }catch (e) {
                console.log(e);
                return;
            }
        });
    }
    const setModelDefinition = async () => {
        if(!selectedModel.value)
            return;

        const newModelDefinition = await loadModelDefinition(selectedModel.value.id);

        if(!newModelDefinition)
            return;

        if(newModelDefinition.columns){
            newModelDefinition.columns.forEach((column: IModelDefinitionColumn) => {
                column.joinData = newModelDefinition.joinChain ? newModelDefinition.joinChain + '.' + column.data : column.data;
            });
        }


        updateObject(modelDefinition, newModelDefinition);
    }

    onMounted(() => {
        loadModelList();
    });
    //END BASE MODEL
</script>

<template>
    <div>
        <div v-if="baseModel">
            <div>
                <div class="mt-4 mb-8">
                    <div v-if="!modelDefinition.isLoaded">
<!--                        <Select-->
<!--                            v-model="selectedModel"-->
<!--                            label="Zdroj dat"-->
<!--                            :options="modelList.map((model, index) => {return {text: model.name, value: model}})"-->
<!--                        ></Select>-->
                        <NewSelect
                            v-model="selectedModel"
                            label="Zdroj dat"
                            :options="modelList.map((model, index) => {return {text: model.name, value: model}})"
                            :filterable="true"
                        ></NewSelect>
                        <Button @click="setModelDefinition">Load model</Button>
                    </div>
                    <div v-else>
                        Base model: {{modelDefinition.name}}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="modelDefinition.isLoaded">
    <!--        <div>-->
    <!--            <Button @click="addingModelColumn = true;" variant="green">Přidat sloupec</Button>-->
    <!--        </div>-->
    <!--        <div v-if="addingModelColumn">-->
    <!--            <table>-->
    <!--                <thead>-->
    <!--                    <tr>-->
    <!--                        <th>Data</th>-->
    <!--                        <th>Název</th>-->
    <!--                        <th></th>-->
    <!--                    </tr>-->
    <!--                </thead>-->
    <!--                <tbody>-->
    <!--                    <tr>-->
    <!--                        <td>-->
    <!--                            <InputField-->
    <!--                                v-model="addingModelColumnData.data"-->
    <!--                                label="Data"-->
    <!--                                class="mr-2 flex-grow-1"-->
    <!--                            />-->
    <!--                        </td>-->
    <!--                        <td>-->
    <!--                            <InputField-->
    <!--                                v-model="addingModelColumnData.title"-->
    <!--                                label="Název"-->
    <!--                                class="mr-2 flex-grow-1"-->
    <!--                            />-->
    <!--                        </td>-->
    <!--                        <td><Button @click="addModelColumn" variant="green">Přidat</Button></td>-->
    <!--                    </tr>-->
    <!--                </tbody>-->
    <!--            </table>-->

    <!--        </div>-->
            <div class="text-xl">{{ modelDefinition.customName }}</div>
            <div>
                <div class="text-sm">
                    Join chain [{{modelDefinition.joinChain}}]:
                </div>
                <div>
                    Definice tabulky ({{modelDefinition.name}}):
                </div>
            </div>
            <div>
                <div class="flex justify-between items-center">
                    <div>
                        <Button @click="addingJoin = true" variant="green">JOIN</Button>
                        <JoinEditorDialog v-if="addingJoin" :show="addingJoin" :model-definition="modelDefinition" @save="addJoin"></JoinEditorDialog>
                        <Button @click="filterDialogOpen = true;">Filtr dat</Button>
                    </div>
                    <div>
                        <div v-if="modelDefinition.columns && modelDefinition.sort" class="flex items-center">
                            <div class="mr-4">Řazení:</div>
                            <Select
                                v-model="modelDefinition.sort.column"
                                :options="modelDefinition.columns.map((column, index) => {return {text: column.title, value: column.data}})"
                            ></Select>
                            <Select
                                v-model="modelDefinition.sort.direction"
                                :options="[{text: 'Vzestupně', value: 'asc'}, {text: 'Sestupně', value: 'desc'}]"
                                class="ml-1"
                            ></Select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <Table :class="{'border-l-4 border-l-green-700 rounded-left sm:rounded-bl-none': modelDefinition?.joins?.length}">
                    <Thead>
                        <TheadTr>
                            <TheadTh>Data ({{modelDefinition?.columns?.length}})</TheadTh>
                            <TheadTh>Název</TheadTh>
                            <TheadTh>Typ sloupce</TheadTh>
                            <TheadTh>Defaultní hodnota</TheadTh>
                        </TheadTr>
                    </Thead>
                    <Tbody>
                        <template v-if="modelDefinition.columns">
                            <template v-for="(column, index) in modelDefinition.columns" :key="index">
                                <TbodyTr v-if="index < limitColumns || showAllColumns">
                                    <TbodyTd>{{column.data}}</TbodyTd>
                                    <TbodyTd>{{column.title}}</TbodyTd>
                                    <TbodyTd>{{column.type}}</TbodyTd>
                                    <TbodyTd>{{column.defaultValue}}</TbodyTd>
                                </TbodyTr>
                            </template>
                            <TbodyTr v-if="modelDefinition.columns.length > limitColumns && !showAllColumns" @click="showAllColumns = true">
                                <TbodyTd :colspan="4" class="text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                                    Zobrazit více (+{{modelDefinition.columns.length - 5}})
                                </TbodyTd>
                            </TbodyTr>
                            <TbodyTr v-if="modelDefinition.columns.length > limitColumns && showAllColumns" @click="showAllColumns = false">
                                <TbodyTd :colspan="4" class="text-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
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
<!--                Joiny k tabulce <span class="font-bold">{{modelDefinition.name}}:</span>-->
                <div v-for="join in modelDefinition.joins">
                    <ModelEditor v-if="join.modelDefinition" :model-definition="join.modelDefinition" class="pl-12 pt-10 border-l-4 border-l-green-700" :clone="false" :base-model="false"></ModelEditor>
                </div>
            </div>
            <div v-if="filterDialogOpen">
                <FilterDialog :filter="mapColumnsForFilters()" :show="filterDialogOpen" @close="filterDialogOpen = false" @save="onFilterSave"></FilterDialog>
            </div>
    <!--        <div v-if="props.clone">-->
    <!--            <Button variant="green" @click="emit('save', modelDefinition)">Uložit</Button>-->
    <!--        </div>-->
        </div>
    </div>
</template>

<style scoped>

</style>