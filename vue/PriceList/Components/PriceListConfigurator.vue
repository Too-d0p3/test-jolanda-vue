<script setup lang="ts">
import {reactive, ref, watch} from "vue";
    import Radio from "@/Components/Inputs/Radio.vue";
    import NewSelect from "@/Components/Inputs/NewSelect.vue";
    import Button from "@/Components/Inputs/Button.vue";
    import {Sheet} from "@/Handsontable/js/Sheet";
    import type {IModelDefinitionColumn} from "@/Handsontable/js/ModelDefinitionColumn";
    import {useModelDefinitionLoader} from "@/ExcelApp/Hooks/useModelDefinitionLoader";
    import SheetEditor from "@/ExcelApp/Components/SheetEditor/SheetEditor.vue";
    import {SheetDefinitionColumn} from "@/Handsontable/js/SheetDefinitionColumn";
    import {type IModelDefinitionJoin, ModelDefinitionJoin} from "@/Handsontable/js/ModelDefinitionJoin";
    import {type IModelDefinition, ModelDefinition} from "@/Handsontable/js/ModelDefinition";
import {Filter, type FilterState} from "@/Filter/js/Filter";
    import {FilterItem} from "@/Filter/js/FilterItem";
    import Thead from "@/Components/Table/Thead.vue";
    import Tbody from "@/Components/Table/Tbody.vue";
    import TbodyTr from "@/Components/Table/TbodyTr.vue";
    import TbodyTd from "@/Components/Table/TbodyTd.vue";
    import Table from "@/Components/Table/Table.vue";
    import TheadTh from "@/Components/Table/TheadTh.vue";
    import TheadTr from "@/Components/Table/TheadTr.vue";

    import CompetitorDialog from "@/PriceList/Components/CompetitorDialog.vue";
    import GroupPriceListDialog from "@/PriceList/Components/GroupPriceListDialog.vue";
    import EshopPriceListDialog from "@/PriceList/Components/EshopPriceListDialog.vue";
import {SheetDefinition} from "@/Handsontable/js/SheetDefinition";
import {cloneDeep} from "lodash";
import TreeView from "@/Components/Other/TreeView/TreeView.vue";
import CdbProductSalesStatsDialog from "@/PriceList/Components/CdbProductSalesStatsDialog.vue";
import HeliosProductSalesDialog from "@/PriceList/Components/HeliosProductSalesDialog.vue";

    const props = withDefaults(defineProps<{
        onCreateSheet?: any
        sheet?: Sheet | null,
        showDefinitionEditor: boolean,
        onBackFromDefinitionEditor?: any,
    }>(), {
        sheet: null,
        showDefinitionEditor: false,
    });

    const columns = {
        Admin_Manager_Product: [
          'Code',
          'Name',
          'ProductTypeName',
          'Availability7',
          'Availability14',
          'Ranking',
          'VehicleTypeMode',
          'LifeCycle',
          'LifeCycleCategory',
          'InProduction',
          'APurchasePriceEUR',
          'PriceVNCEUR',
        ],
        Admin_Manager_GroupSpecialPrice: [
            'Price',
            'PriceDeposit',
        ],
        Admin_Manager_CompetitorLog: [
            'CompetitorName',
            'Price',
        ],
        Admin_Manager_ShopInfo: [
            'PriceVirSale',
            'PriceDeposit',
        ],
        Admin_Manager_ProductSalesStats: [
            'OrderCount',
        ],
        Admin_Manager_ProductSales: [
            'Quantity',
        ],
        custom: [
            {
                title: 'Aktuální marže',
                data: 'CurrentMargin',
                type: 'numeric',
                joinData: 'CurrentMargin', //????
                defaultValue: '',
            },
            {
                title: 'Nová cena',
                data: 'NewPrice',
                type: 'numeric',
                joinData: 'NewPrice', //????
                defaultValue: '',
            },
            {
                title: 'Nový deposit',
                data: 'NewDeposit',
                type: 'numeric',
                joinData: 'NewDeposit', //????
                defaultValue: '',
            }
        ],
    };

    const sheet: Sheet = reactive(props.sheet ? new Sheet(cloneDeep(props.sheet)) : new Sheet());
    if(!props.sheet){
        sheet.type = 'price-list';
    }

    const saveToLocal = (id: any, state: any) => {
        let priceLists = loadLocal();

        priceLists[id] = state;

        localStorage.setItem("price-lists", JSON.stringify(priceLists));
    }

    const loadLocal = (): {[key: string]: any} => {
        const priceLists = localStorage.getItem("price-lists");
        const parsedPriceLists = priceLists ? JSON.parse(priceLists) : {};

        return parsedPriceLists;
    }

    const loadLocalByID = (id: any) => {
        if(!id) return null;

        let priceLists = loadLocal();

        return priceLists[id] ?? null;
    }

    const state = reactive(loadLocalByID(sheet.id) ?? {
        type: 'group',
        groupPrice: '',
        dataSource: '',
        groupPriceLists: [
        ],
        eshopPriceLists: [
        ],
        competitors: [
        ],
        cdbProductSalesStats: [
        ],
        heliosProductSales: [
        ],
        productTypeFilter: [],
        eshop: '',
        currency: '',
    });

    const showEditor = ref(props.showDefinitionEditor ?? false);

    const {loadModelDefinition} = useModelDefinitionLoader();
    const createConfiguration = async () => {
        if(!state.type || !state.currency || !state.dataSource) return;
        if(state.type === 'group' && !state.groupPrice) return;
        if(state.type === 'eshop' && !state.eshop) return;

        sheet.sheetDefinition = new SheetDefinition();

        //ID 9 TEMPLATE
        const newModelDefinition = await loadModelDefinition(state.dataSource);

        if(!newModelDefinition)
            return;


        newModelDefinition.columns?.forEach((column: IModelDefinitionColumn) => {
            column.joinData = newModelDefinition.joinChain ? newModelDefinition.joinChain + '.' + column.data : column.data;
        });


        sheet.modelDefinition = new ModelDefinition(newModelDefinition);

        let options = {};
        if(state.type === 'group'){
            if(state.dataSource === 'Admin_Manager_Product') {
                sheet.modelDefinition.dataFilter = new Filter({
                    items: getProductTypeFilterItems(),
                });

            }else if(state.dataSource === 'Admin_Manager_GroupSpecialPrice'){
                sheet.modelDefinition.dataFilter = new Filter({
                    items: {
                        Group_ID: new FilterItem({
                            filters: [
                                {
                                    operation: 'equal',
                                    value: state.groupPrice.value,
                                }
                            ]
                        })
                    }
                });

                options = columns['Admin_Manager_GroupSpecialPrice'].reduce((acc: any, item) => {
                    acc[item + state.currency] = {};
                    return acc;
                }, {});
            }
        }else{
            if(state.dataSource === 'Admin_Manager_Product') {
                sheet.modelDefinition.dataFilter = new Filter({
                    items: getProductTypeFilterItems(),
                });

            }else if(state.dataSource === 'Admin_Manager_ShopInfo'){
                sheet.modelDefinition.dataFilter = new Filter({
                    items: {
                        Shop_ID: new FilterItem({
                            filters: [
                                {
                                    operation: 'equal',
                                    value: state.eshop.value,
                                }
                            ]
                        })
                    }
                });

                options = columns['Admin_Manager_ShopInfo'].reduce((acc: any, item) => {
                    acc[item + state.currency] = {};
                    return acc;
                }, {});
            }
        }

        addColumnsFromModelDefinition(sheet.modelDefinition, options);
        addCustomColumns();
        await addJoins();

        showEditor.value = true;
    }

    const addJoins = async () => {
        let model = null;
        if(state.type === 'group'){
            if(state.dataSource === 'Admin_Manager_Product') {
                const columnOptions = columns['Admin_Manager_GroupSpecialPrice'].reduce((acc: any, item) => {
                    acc[item + state.currency] = {};
                    return acc;
                }, {});

                await addJoin(sheet.modelDefinition as ModelDefinition, 'Admin_Manager_GroupSpecialPrice', null, new Filter({
                        items: {
                            Group_ID: new FilterItem({
                                filters: [
                                    {
                                        operation: 'equal',
                                        value: state.groupPrice.value,
                                    }
                                ]
                            })
                        }
                    }),
                    columnOptions);

                model = sheet.modelDefinition;
            }else if(state.dataSource === 'Admin_Manager_GroupSpecialPrice'){
                const newJoin = await addJoin(sheet.modelDefinition as ModelDefinition, 'Admin_Manager_Product', null, new Filter({
                    items: getProductTypeFilterItems(),
                }), null);

                model = newJoin?.modelDefinition;
            }
        }else{
            if(state.dataSource === 'Admin_Manager_Product') {
                const columnOptions = columns['Admin_Manager_ShopInfo'].reduce((acc: any, item) => {
                    acc[item + state.currency] = {};
                    return acc;
                }, {});

                await addJoin(sheet.modelDefinition as ModelDefinition, 'Admin_Manager_ShopInfo', null, new Filter({
                        items: {
                            Shop_ID: new FilterItem({
                                filters: [
                                    {
                                        operation: 'equal',
                                        value: state.eshop.value,
                                    }
                                ]
                            })
                        }
                    }),
                    columnOptions);

                model = sheet.modelDefinition;
            }else if(state.dataSource === 'Admin_Manager_ShopInfo'){
                const newJoin = await addJoin(sheet.modelDefinition as ModelDefinition, 'Admin_Manager_Product', null, new Filter({
                    items: getProductTypeFilterItems(),
                }), null);

                model = newJoin?.modelDefinition;
            }
        }

        if(model){
            await addGroupPrices(model);
            await addCompetitors(model);
            await addEshopPrices(model);
            await addCdbProductSalesStats(model);
            await addHeliosProductSales(model);
        }
    }

    const addJoin = async (modelDefinition: ModelDefinition, model: string, customName: string | null = null, dataFilter: Filter | null = null, columnOptions: any = null, sort: any = null) => {
        let newModelDefinitionState = await loadModelDefinition(model);

        if(!newModelDefinitionState){
            console.error('Cannot load model definition', model);
        }else{
            newModelDefinitionState.customName = customName ?? null;
            newModelDefinitionState.joinID = modelDefinition.getJoinUniqueID(newModelDefinitionState.id);
            newModelDefinitionState.joinChain = modelDefinition.joinChain ? modelDefinition.joinChain + '.' + newModelDefinitionState.joinID : newModelDefinitionState.joinID;

            newModelDefinitionState.columns?.forEach((column: IModelDefinitionColumn) => {
                column.joinData = newModelDefinitionState.joinChain ? newModelDefinitionState.joinChain + '.' + column.data : column.data;
            });
        }

        let realation = modelDefinition.relations?.find((relation) => relation.model === model);

        const newModelDefinition = new ModelDefinition(newModelDefinitionState);

        if(dataFilter){
            newModelDefinition.dataFilter = dataFilter;
        }

        if(!realation){
            console.error('Cannot find relation', model);
            return;
        }

        const newJoin: IModelDefinitionJoin = new ModelDefinitionJoin({
            ...realation,
            modelDefinition: newModelDefinition,
        });

        modelDefinition.joins = [
            ...modelDefinition.joins ?? [],
            newJoin
        ];

        addColumnsFromModelDefinition(newModelDefinition, columnOptions ?? {});

        return newJoin;
    }

    const addGroupPrices = async (modelDefinition: IModelDefinition) => {
        for (const priceList of state.groupPriceLists) {
            const columnOptions = columns['Admin_Manager_GroupSpecialPrice'].reduce((acc: any, item) => {
                acc[item + state.currency] = {
                    title: '[' + priceList.text + '] ' + item + state.currency,
                };
                return acc;
            }, {});

            await addJoin(modelDefinition, 'Admin_Manager_GroupSpecialPrice', 'Skupinový ceník pro porovnání', new Filter({
                    items: {
                        Group_ID: new FilterItem({
                            filters: [
                                {
                                    operation: 'equal',
                                    value: priceList.value,
                                }
                            ]
                        })
                    }
                }),
                columnOptions);
        }
    }

    const addEshopPrices = async (modelDefinition: IModelDefinition) => {
        for (const priceList of state.eshopPriceLists) {
            const columnOptions = columns['Admin_Manager_ShopInfo'].reduce((acc: any, item) => {
                acc[item + state.currency] = {
                    title: '[' + priceList.text + '] ' + item + state.currency,
                };
                return acc;
            }, {});

            await addJoin(modelDefinition, 'Admin_Manager_ShopInfo', 'Eshop ceník pro porovnání', new Filter({
                    items: {
                        Shop_ID: new FilterItem({
                            filters: [
                                {
                                    operation: 'equal',
                                    value: priceList.value,
                                }
                            ]
                        })
                    }
                }),
                columnOptions);
        }
    }

    const addCompetitors = async (modelDefinition: IModelDefinition) => {
        for (const competitor of state.competitors) {
            const columnOptions = columns['Admin_Manager_CompetitorLog'].reduce((acc: any, item) => {
                acc[item] = { title: '[' + competitor.text + '] ' + item };
                return acc;
            }, {});

            await addJoin(modelDefinition, 'Admin_Manager_CompetitorLog', 'Ceny koknkurentů k porovnání', new Filter({
                    items: {
                        Competitor_ID: new FilterItem({
                            filters: [
                                {
                                    operation: 'equal',
                                    value: competitor.value,
                                }
                            ]
                        })
                    }
                }),
                columnOptions);
        }
    }

    const addCdbProductSalesStats = async (modelDefinition: IModelDefinition) => {
        for (const productSaleStats of state.cdbProductSalesStats) {
            const columnOptions = columns['Admin_Manager_ProductSalesStats'].reduce((acc: any, item) => {
                acc[item] = { title: '[' + productSaleStats.company.text + '] ' + item };
                return acc;
            }, {});

            let filterItems: FilterState =  {
                items: {
                    CompanyName: new FilterItem({
                        filters: [
                            {
                                operation: 'equal',
                                value: productSaleStats.company.text,
                            }
                        ]
                    })
                }
            }

            // if(productSaleStats.dateRange){
            //     if(productSaleStats.dateRage.from){
            //         filterItems.items = {
            //             ...filterItems.items,
            //             dateFrom: new FilterItem({
            //                 filters: [
            //                     {
            //                         operation: 'equal',
            //                         value: productSaleStats.company.text,
            //                     }
            //                 ]
            //             })
            //         }
            //     }
            // }

            await addJoin(modelDefinition, 'Admin_Manager_ProductSalesStats', 'CDB produktové prodeje firmy k porovnání', new Filter(filterItems),
                columnOptions);
        }
    }

    const addHeliosProductSales = async (modelDefinition: IModelDefinition) => {
        for (const productSale of state.heliosProductSales) {
            const columnOptions = columns['Admin_Manager_ProductSales'].reduce((acc: any, item) => {
                acc[item] = { title: '[' + productSale.company.text + '] ' + item };
                return acc;
            }, {});

            let filterItems: FilterState =  {
                items: {
                    Company: new FilterItem({
                        filters: [
                            {
                                operation: 'equal',
                                value: productSale.company.text,
                            }
                        ]
                    })
                }
            }

            // if(productSaleStats.dateRange){
            //     if(productSaleStats.dateRage.from){
            //         filterItems.items = {
            //             ...filterItems.items,
            //             dateFrom: new FilterItem({
            //                 filters: [
            //                     {
            //                         operation: 'equal',
            //                         value: productSaleStats.company.text,
            //                     }
            //                 ]
            //             })
            //         }
            //     }
            // }

            await addJoin(modelDefinition, 'Admin_Manager_ProductSales', 'Heilops produktové prodeje firmy k porovnání', new Filter(filterItems),
                columnOptions);
        }
    }

    const addCustomColumns = () => {
        columns.custom.forEach((column: any, index) => {
            sheet.sheetDefinition?.addColumn(new SheetDefinitionColumn(column));
        });
    }

    const addColumnsFromModelDefinition = (modelDefinition: IModelDefinition, options: {} = {}) => {
        modelDefinition.columns?.forEach((column: IModelDefinitionColumn) => {
            if(!columns.hasOwnProperty(modelDefinition.id)){
                return;
            }

            //@ts-ignore
            if(columns[modelDefinition.id].includes(column.data) || options.hasOwnProperty(column.data)){
                sheet.sheetDefinition?.addColumn(new SheetDefinitionColumn({
                    //@ts-ignore
                    title: options[column.data]?.title ?? column.title,
                    data: column.data,
                    type: column.type,
                    defaultValue: column.defaultValue,
                    model: modelDefinition.id,
                    joinData: column.joinData,
                }));
            }
        });
    }

    watch(() => state.type, (newVal, oldVal) => {
        if(newVal != oldVal){
            state.groupPrice = '';
            state.dataSource = '';
            state.groupPriceLists = [];
            state.eshopPriceLists= [];
            state.competitors = [];
            state.eshop = '';
            state.currency = '';
        }
    });

    const getProductTypeFilterItems = () => {
        let items = {};
        let query: {[key: string]: any} = {'section':[], 'type':[], 'pattern':[]}
        state.productTypeFilter.forEach(function (a: string) {
            const v: any[] = a.split('.');
            query.section.indexOf(v[0]) === -1 ? query.section.push(v[0]) : null;
            if (v[1] !== undefined)
                query.type.indexOf(v[1]) === -1 ? query.type.push(v[1]) : null;
            if (v[2] !== undefined)
                query.pattern.indexOf(v[2]) === -1 ? query.pattern.push(v[2]) : null;
        });

        if(query.section.length){
            items = {
                ...items ?? {},
                Section_ID: new FilterItem({
                    filters: [
                        {
                            operation: 'in',
                            value: query.section,
                        }
                    ]
                })
            };
        }

        if(query.type.length){
            items = {
                ...items ?? {},
                ProductType_ID: new FilterItem({
                    filters: [
                        {
                            operation: 'in',
                            value: query.type,
                        }
                    ]
                })
            };
        }

        if(query.pattern.length){
            items = {
                ...items ?? {},
                Pattern_ID: new FilterItem({
                    filters: [
                        {
                            operation: 'in',
                            value: query.pattern,
                        }
                    ]
                })
            };
        }

        return items;
    }

    //porovnaní group ceníku dialog
    const showGroupPriceListDialog = ref(false);
    //end porovnaní group ceníku dialog

    //porovnaní eshop ceníku dialog
    const showEshopPriceListDialog = ref(false);
    //end porovnaní eshop ceníku dialog

    //konkurenti dialog
    const showCompetitorDialog = ref(false);
    //end konkurenti dialog

    //cdb produktové prodeje dialog
    const showCdbProductSalesStatsDialog = ref(false);
    //end cdb produktové prodeje dialog

    //helios produktové prodeje dialog
    const showHeliosProductSalesDialog = ref(false);
    //end helios produktové prodeje dialog

    const onCreateSheet = (sheet: Sheet) => {
        props.onCreateSheet(sheet);
        if(sheet.id){
            saveToLocal(sheet.id, state);
        }
    }

    //url
    const url = window.remoteUrl;
    //url
</script>

<template>
    <div>
        <div v-if="!showEditor">
            <h1>Price List Configurator</h1>
            <div>
                Typ ceníku:
                <Radio id="type_group" value="group" v-model="state.type" name="type" label="Skupinový" />
                <Radio id="type_eshop" value="eshop" v-model="state.type" name="type" label="Eshop" />
            </div>
            <div v-if="state.type === 'group'">
                <div>
                    <NewSelect
                        v-model="state.groupPrice"
                        label="Ceník k aktualizaci"
                        :url="url+'/user/group-price/data-list'"
                        :filterable="true"
                        :return-object="true"
                    ></NewSelect>
                </div>
            </div>
            <div v-else-if="state.type === 'eshop'">
                <NewSelect
                    v-model="state.eshop"
                    label="Eshop"
                    :url="url+'/admin/shop/data-list'"
                    :filterable="true"
                    :return-object="true"
                ></NewSelect>
            </div>
            <div v-if="state.groupPrice">
                Zdroj dat:
                <Radio id="dataSource_product" value="Admin_Manager_Product" v-model="state.dataSource" name="dataSource" label="Produkty" />
                <Radio id="dataSource_price-list" value="Admin_Manager_GroupSpecialPrice" v-model="state.dataSource" name="dataSource" label="Položky ceníku" />
            </div>
            <div v-if="state.eshop">
                Zdroj dat:
                <Radio id="dataSource_product" value="Admin_Manager_Product" v-model="state.dataSource" name="dataSource" label="Produkty" />
                <Radio id="dataSource_price-list" value="Admin_Manager_ShopInfo" v-model="state.dataSource" name="dataSource" label="Položky ceníku" />
            </div>
            <div v-if="state.type && ((state.type === 'group' && state.groupPrice) || (state.type === 'eshop' && state.eshop)) && state.dataSource">
                Měna:
                <Radio id="currency_czk" value="CZK" v-model="state.currency" name="currency" label="CZK" />
                <Radio id="currency_eur" value="EUR" v-model="state.currency" name="currency" label="EUR" />
            </div>
            <div v-if="state.type && ((state.type === 'group' && state.groupPrice) || (state.type === 'eshop' && state.eshop)) && state.currency">
                <div>
                    <TreeView :data-url="url+'/default/product/load-product-type-tree'" v-model="state.productTypeFilter" label="Typ produktů" ></TreeView>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            Skupinové ceníky pro porovnání
                        </div>
                        <div>
                            <Button variant="green" @click="showGroupPriceListDialog = true">Přidat</Button>
                            <GroupPriceListDialog v-if="showGroupPriceListDialog" :show="showGroupPriceListDialog" @save="(pricelist) => {state.groupPriceLists = [...state.groupPriceLists, pricelist]}" @close="showGroupPriceListDialog = false"></GroupPriceListDialog>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <TheadTr>
                                <TheadTh>Ceník k porovnání</TheadTh>
                                <TheadTh></TheadTh>
                            </TheadTr>
                        </Thead>
                        <Tbody>
                        <template v-if="state.groupPriceLists.length">
                            <TbodyTr v-for="(priceList, index) in state.groupPriceLists" :key="index">
                                <TbodyTd>
                                    {{priceList.text}}
                                </TbodyTd>
                                <TbodyTd>
                                    <Button @click="state.groupPriceLists.splice(index, 1);" variant="red" size="small" class="mb-0 text-base">X</Button>
                                </TbodyTd>
                            </TbodyTr>
                        </template>
                        <TbodyTr v-else>
                            <TbodyTd :colspan="2" class="text-center text-xl">
                                <span class="text-gray-400">Žádný ceník k porovnání</span>
                            </TbodyTd>
                        </TbodyTr>
                        </Tbody>
                    </Table>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            Eshop ceníky pro porovnání
                        </div>
                        <div>
                            <Button variant="green" @click="showEshopPriceListDialog = true">Přidat</Button>
                            <EshopPriceListDialog v-if="showEshopPriceListDialog" :show="showEshopPriceListDialog" @save="(pricelist) => {state.eshopPriceLists = [...state.eshopPriceLists, pricelist]}" @close="showEshopPriceListDialog = false"></EshopPriceListDialog>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <TheadTr>
                                <TheadTh>Ceník k porovnání</TheadTh>
                                <TheadTh></TheadTh>
                            </TheadTr>
                        </Thead>
                        <Tbody>
                        <template v-if="state.eshopPriceLists.length">
                            <TbodyTr v-for="(priceList, index) in state.eshopPriceLists" :key="index">
                                <TbodyTd>
                                    {{priceList.text}}
                                </TbodyTd>
                                <TbodyTd>
                                    <Button @click="state.eshopPriceLists.splice(index, 1);" variant="red" size="small" class="mb-0 text-base">X</Button>
                                </TbodyTd>
                            </TbodyTr>
                        </template>
                        <TbodyTr v-else>
                            <TbodyTd :colspan="2" class="text-center text-xl">
                                <span class="text-gray-400">Žádný ceník k porovnání</span>
                            </TbodyTd>
                        </TbodyTr>
                        </Tbody>
                    </Table>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            Konkurenti
                        </div>
                        <div>
                            <Button variant="green" @click="showCompetitorDialog = true">Přidat</Button>
                            <CompetitorDialog v-if="showCompetitorDialog" :show="showCompetitorDialog" @save="(competitor) => {state.competitors = [...state.competitors, competitor]}" @close="showCompetitorDialog = false"></CompetitorDialog>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <TheadTr>
                                <TheadTh>Kokurent</TheadTh>
                                <TheadTh></TheadTh>
                            </TheadTr>
                        </Thead>
                        <Tbody>
                        <template v-if="state.competitors.length">
                            <TbodyTr v-for="(competitor, index) in state.competitors" :key="index">
                                <TbodyTd>
                                    {{competitor.text}}
                                </TbodyTd>
                                <TbodyTd>
                                    <Button @click="state.competitors.splice(index, 1);" variant="red" size="small" class="mb-0 text-base">X</Button>
                                </TbodyTd>
                            </TbodyTr>
                        </template>
                        <TbodyTr v-else>
                            <TbodyTd :colspan="2" class="text-center text-xl">
                                <span class="text-gray-400">Žádný konkurent</span>
                            </TbodyTd>
                        </TbodyTr>
                        </Tbody>
                    </Table>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            Produktové prodeje [CDB]
                        </div>
                        <div>
                            <Button variant="green" @click="showCdbProductSalesStatsDialog = true">Přidat</Button>
                            <CdbProductSalesStatsDialog v-if="showCdbProductSalesStatsDialog" :show="showCdbProductSalesStatsDialog" @save="(productSaleStats) => {state.cdbProductSalesStats = [...state.cdbProductSalesStats, productSaleStats]}" @close="showCdbProductSalesStatsDialog = false"></CdbProductSalesStatsDialog>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <TheadTr>
                                <TheadTh>Firma</TheadTh>
                                <TheadTh>Datum od</TheadTh>
                                <TheadTh>Datum do</TheadTh>
                                <TheadTh></TheadTh>
                            </TheadTr>
                        </Thead>
                        <Tbody>
                        <template v-if="state.cdbProductSalesStats.length">
                            <TbodyTr v-for="(productSaleStats, index) in state.cdbProductSalesStats" :key="index">
                                <TbodyTd>
                                    {{productSaleStats.company.text}}
                                </TbodyTd>
                                <TbodyTd>
                                    {{productSaleStats.dateFrom}}
                                </TbodyTd>
                                <TbodyTd>
                                    {{productSaleStats.dateTo}}
                                </TbodyTd>
                                <TbodyTd>
                                    <Button @click="state.cdbProductSalesStats.splice(index, 1);" variant="red" size="small" class="mb-0 text-base">X</Button>
                                </TbodyTd>
                            </TbodyTr>
                        </template>
                        <TbodyTr v-else>
                            <TbodyTd :colspan="4" class="text-center text-xl">
                                <span class="text-gray-400">Žádné produktové prodeje</span>
                            </TbodyTd>
                        </TbodyTr>
                        </Tbody>
                    </Table>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            Produktové prodeje [Helios]
                        </div>
                        <div>
                            <Button variant="green" @click="showHeliosProductSalesDialog = true">Přidat</Button>
                            <HeliosProductSalesDialog v-if="showHeliosProductSalesDialog" :show="showHeliosProductSalesDialog" @save="(productSaleStats) => {state.heliosProductSales = [...state.heliosProductSales, productSaleStats]}" @close="showHeliosProductSalesDialog = false"></HeliosProductSalesDialog>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                        <TheadTr>
                            <TheadTh>Firma</TheadTh>
                            <TheadTh>Datum od</TheadTh>
                            <TheadTh>Datum do</TheadTh>
                            <TheadTh></TheadTh>
                        </TheadTr>
                        </Thead>
                        <Tbody>
                        <template v-if="state.heliosProductSales.length">
                            <TbodyTr v-for="(productSaleStats, index) in state.heliosProductSales" :key="index">
                                <TbodyTd>
                                    {{productSaleStats.company.text}}
                                </TbodyTd>
                                <TbodyTd>
                                    {{productSaleStats.dateFrom}}
                                </TbodyTd>
                                <TbodyTd>
                                    {{productSaleStats.dateTo}}
                                </TbodyTd>
                                <TbodyTd>
                                    <Button @click="state.heliosProductSales.splice(index, 1);" variant="red" size="small" class="mb-0 text-base">X</Button>
                                </TbodyTd>
                            </TbodyTr>
                        </template>
                        <TbodyTr v-else>
                            <TbodyTd :colspan="4" class="text-center text-xl">
                                <span class="text-gray-400">Žádné produktové prodeje</span>
                            </TbodyTd>
                        </TbodyTr>
                        </Tbody>
                    </Table>
                </div>
            </div>
            <Button variant="green" @click="createConfiguration">Nakonfigurovat</Button>
        </div>
        <div v-else>
            <SheetEditor @back="onBackFromDefinitionEditor" class="px-40" :sheet="sheet" @submit="onCreateSheet" :show-configurator="() => {showEditor = false}"></SheetEditor>
        </div>
    </div>
</template>

<style scoped>

</style>