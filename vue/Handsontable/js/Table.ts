import type { ISheet } from "@/Handsontable/js/Sheet";
import Handsontable from "handsontable";
import HyperFormula from "hyperformula";
import { cloneDeep } from "lodash";
import type { ISheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import { SheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import type { IModelDefinition } from "@/Handsontable/js/ModelDefinition";

export interface ITable extends TableState {
    handsontable: Handsontable | null;
    getColumns(): ISheetDefinitionColumn[];
    addColumn(column: ISheetDefinitionColumn): void;
    loadData(modelDefinition?: IModelDefinition | null): Promise< void >;
    init(tableState?: TableState | null): void;
    updateDefinitionSheetColumnsTitles(): void;
    loadData2(modelDefinition?: IModelDefinition | null): Promise<{[key: string]: any;}[]>;
    updateData(data: {[key: string]: any;}[]): void;
    setData(data: {[key: string]: any;}[]): void;
    isFormula(value: string): boolean;
    prepareFormula(value: string, row: number): string;
    prepareData(data: {[key: string]: any;}[]): [][];
}

export interface TableState {
    sheet: ISheet | null;
    handsontableSettings?: Handsontable.GridSettings | null;
    onBeforeShowRowDataDialog?: Function | null;
}

export class Table implements ITable {
    public sheet: ISheet | null = null;
    public handsontable: any;
    public handsontableSettings: Handsontable.GridSettings | null = null;
    public onBeforeShowRowDataDialog?: Function | null;

    constructor(tableState: TableState | null = null) {
        this.onBeforeShowRowDataDialog = null;
        // HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

        // const hyperformulaInstance = HyperFormula.buildEmpty({
        //     // to use an external HyperFormula instance,
        //     // initialize it with the `'internal-use-in-handsontable'` license key
        //     licenseKey: "internal-use-in-handsontable",
        //     licenseKeyValidityState: "VALID",
        // });

        // const hfInstance = HyperFormula.buildFromArray([["Anthony", "=ROW(A)"]], { licenseKey: "internal-use-in-handsontable" });
        // // read the value of cell B1
        // const result = hfInstance.getCellValue({ sheet: 0, col: 1, row: 0 });
        //
        // console.log(hfInstance.getAllFunctionPlugins());
        // console.log(result);
        Object.assign(
            this,
            tableState ?? {
                sheet: null,
            },
        );

        this.handsontable = null;
        this.init(tableState);
    }

    public init(tableState: TableState | null = null) {
        let self = this;
        this.handsontableSettings = {
            allowInsertColumn: true,
            bindRowsWithHeaders: true,
            manualColumnResize: true,
            filters: true,
            colHeaders: true,
            rowHeaders: true,
            height: "100%",
            autoWrapRow: true,
            autoWrapCol: true,
            licenseKey: "non-commercial-and-evaluation",
            formulas: {
                engine: HyperFormula,
                //@ts-ignore
                licenseKey: "internal-use-in-handsontable",
                sheetName: "Sheet1",
            },
            ...(tableState?.handsontableSettings ?? {}),
            data: this.sheet ? cloneDeep(this.sheet.data) : [[]],
            hiddenColumns: {
                indicators: true,
            },
            undo: true,
            // manualColumnMove: true,
            //@ts-ignore
            manualColumnMove: this.sheet?.sheetDefinition?.getColumnsSortByPosition(true).map((column) => column.position) ?? true,
            //@ts-ignore
            contextMenu: {
                items: {
                    row_above: {},
                    row_below: {},
                    sp1: "---------",
                    col_left: {},
                    col_right: {},
                    sp2: "---------",
                    remove_row: {},
                    remove_col: {},
                    sp3: "---------",
                    undo: {},
                    redo: {},
                    sp4: "---------",
                    make_read_only: {},
                    alignment: {},
                    sp5: "---------",
                    copy: {},
                    cut: {},
                    row_data_info: {
                        name: "Data řádku",
                        callback(key, selection, clickEvent) {
                            if (typeof self.onBeforeShowRowDataDialog === "function") {
                                self.onBeforeShowRowDataDialog();
                            }
                        },
                        hidden() {
                            return self.handsontable.getSelectedLast()[1] !== -1;
                        },
                    },
                },
            },
            //@ts-ignore
            dropdownMenu: {
                items: {
                    modelInfo: {
                        // Own custom property
                        // Custom rendered element in the context menu
                        renderer(hot, wrapper, row, col, prop, itemValue) {
                            let column = self.handsontable.getSelectedLast()[1];
                            column = self.sheet?.sheetDefinition?.columns ? self.sheet.sheetDefinition.columns[column] : false;

                            if(!column){
                                return;
                            }

                            const columnInfo = document.createElement("div");
                            columnInfo.setAttribute("data-column", JSON.stringify(column));
                            columnInfo.id = "ContextMenuColumnInfo";

                            return columnInfo;
                        },
                        disableSelection: true, // Prevent mouseoever from highlighting the item for selection
                        isCommand: false, // Prevent clicks from executing command and closing the menu
                    },
                    dataModelActions: {
                        name: "Data model akce",
                        submenu: {
                            items: [
                                {
                                    key: "dataModelActions:loadModel",
                                    name: "Načíst model",
                                    callback(key, selection, clickEvent) {
                                        let column = self.handsontable.getSelectedLast()[1];
                                        column = self.sheet?.sheetDefinition?.columns ? self.sheet.sheetDefinition.columns[column] : false;

                                        if(!column){
                                            return;
                                        }

                                        let modelDefinition = self.sheet?.modelDefinition?.getModelByJoinChain(column.getJoinChain());

                                        self.loadData2(modelDefinition);
                                    },
                                },
                            ],
                        },
                    },
                    filter_by_value: {},
                    filter_action_bar: {},
                },
            },
            colWidths: 200,
            rowHeights: 24,
            autoRowSize: false,
            viewportRowRenderingOffset: 50,
            viewportColumnRenderingOffset: 20,
        };

        // this.handsontableSettings.columns = this.sheet?.sheetDefinition?.getColumnsForHS() ?? [];
        if(!this.handsontableSettings){
            return;
        }

        this.handsontableSettings.data = this.sheet?.data ? (this.handsontable ? this.sheet.data : this.sheet.getDataForSheetColumns()) : [this.sheet?.sheetDefinition?.columns?.map((column) => "") ?? []];
        this.handsontableSettings.colHeaders = this.sheet?.sheetDefinition?.getColumnsSortByPosition()?.map((column) => column.title) ?? [];
        this.handsontableSettings.cells = (row, col) => {
            let cellProperties = {};

            if (!this.sheet?.sheetDefinition?.columns) {
                return cellProperties;
            }

            let index = col;
            // if (this.handsontable) {
            //     index = this.handsontable.toVisualColumn(col);
            // }

            const defColumn = this.sheet.sheetDefinition.columns[index];

            if (!defColumn) {
                return cellProperties;
            }

            const self = this;

            if (defColumn.formating) {
                //@ts-ignore
                cellProperties.renderer = function (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) {
                    //@ts-ignore
                    Handsontable.renderers.TextRenderer.apply(this, arguments);

                    let physicalRow = instance.toPhysicalRow(row);

                    if(defColumn.formating){
                        if (self.isFormula(defColumn.formating)) {
                            const result = instance.getPlugin("formulas").engine.calculateFormula(self.prepareFormula(defColumn.formating, physicalRow + 1), 0);
                            td.style.backgroundColor = result;
                        } else {
                            td.style.backgroundColor = defColumn.formating;
                        }
                    }
                };
            }

            //@ts-ignore
            cellProperties.type = defColumn.type;

            return cellProperties;
        };

        this.handsontableSettings.afterCreateCol = (index, amount, source) => {
            setTimeout(() => {
                if (!this.sheet?.sheetDefinition && !this.sheet?.sheetDefinition?.columns) {
                    return;
                }

                for (let i = 0; i < amount; i++) {
                    this.sheet.sheetDefinition.addColumn(new SheetDefinitionColumn({ title: this.handsontable.getColHeader(index), type: "date", defaultValue: "", model: null, data: "" }));
                }

                if(this.sheet?.sheetDefinition?.columns){
                    this.sheet.sheetDefinition.moveColumnsPhysically([this.sheet.sheetDefinition.columns.length - amount], this.handsontable.toPhysicalColumn(index));
                    this.sheet.sheetDefinition.moveColumnToPosition(this.sheet.sheetDefinition.columns.length - amount, index);
                }


                this.updateDefinitionSheetColumnsTitles();
                this.handsontable.render();
            }, 0);
        };

        this.handsontableSettings.afterRemoveCol = (index, amount, physicalColumns, source) => {
            setTimeout(() => {
                if (!(this.sheet?.sheetDefinition && this.sheet?.sheetDefinition?.columns)) {
                    return;
                }

                this.sheet.sheetDefinition.columns.splice(index, amount);

                this.updateDefinitionSheetColumnsTitles();

                this.handsontable.render();
            }, 0);
        };

        this.handsontableSettings.afterColumnMove = (movedColumns, finalIndex, dropIndex, movePossible, orderChanged) => {
            if (this.sheet?.sheetDefinition && orderChanged) {
                this.sheet.sheetDefinition.moveColumnsPosition(movedColumns, finalIndex);
                this.updateDefinitionSheetColumnsTitles();

                if (this.handsontable) this.handsontable.render();
            }
        };

        this.handsontableSettings.beforeUpdateData = (sourceData, initialLoad, source) => {
            if (this.sheet) {
                this.sheet.data = sourceData as { [key: string]: any }[];

                let _data: {[key: string]: any}[] = self.prepareData(sourceData);

                return _data;
            }
        };

        this.handsontableSettings.afterChange = (changes) => {
            changes?.forEach(([row, prop, oldValue, newValue]) => {
                if(!(this.sheet?.sheetDefinition)){
                    return;
                }

                const col = this.sheet.sheetDefinition.getColumnInPosition(prop as number);

                if (col && col.joinData) {
                    this.sheet.data[this.handsontable.toPhysicalRow(row)][col.joinData as string] = newValue;
                }
            });
        };

        // this.handsontableSettings.modifyColHeader = (column) => {
        //     if(this.handsontable){
        //         // console.log('modifyColHeader', column);
        //         // console.log(this.handsontable.getColHeader(column));
        //     }
        //
        // }

        if (this.handsontable) {
            this.handsontable.updateSettings(this.handsontableSettings);
        }
    }

    public getColumns(): ISheetDefinitionColumn[] {
        return this.sheet?.sheetDefinition?.columns ?? [];
    }

    public addColumn(column: ISheetDefinitionColumn): void {
        if (this.sheet?.sheetDefinition?.columns && this.handsontableSettings?.columns) {
            this.sheet.sheetDefinition.columns = [...(this.sheet?.sheetDefinition?.columns ?? []), column];
            this.handsontable.updateSettings({
                columns: this.getColumns(),
            });
            // this.handsontableSettings.columns = this.getColumns();
        }
    }

    public updateDefinitionSheetColumnsTitles(): void {
        if (this.handsontable && this.sheet?.sheetDefinition?.columns) {
            this.sheet.sheetDefinition.columns.forEach((column, index) => {
                column.title = this.handsontable.getColHeader(column.position);
            });
        }
    }

    // public updateColumnsPosition(){
    //     this.handsontable
    // }

    public async loadData(modelDefinition: IModelDefinition | null = null): Promise< void > {
        if (!this.sheet) return;

        let data = await this.sheet.loadData(modelDefinition);
        if (!data) return;

        // data = this.sheet.prepareDataForHS(data);
        const preparedData = this.sheet.prepareData(data);
        this.setData(preparedData);

        return;
    }

    public setData(data: {[key: string]: any;}[]) {
        // let _data: [][] = [];
        // if (this.sheet?.sheetDefinition?.columns) {
        //     data.forEach((preparedDataRow, index) => {
        //         let row: [] = [];
        //         this.sheet.sheetDefinition?.columns?.forEach((column: ISheetDefinitionColumn, c: number) => {
        //             let value = preparedDataRow[column.joinData] ?? column.defaultValue ?? undefined;
        //
        //             if (value) {
        //                 if (this.isFormula(value)) {
        //                     value = this.prepareFormula(value, index + 1);
        //                 }
        //             }
        //
        //             row.push(value);
        //         });
        //
        //         _data.push(row);
        //     });
        // }

        this.handsontable.updateData(data);
    }

    public isFormula(value: string): boolean {
        return value.startsWith("=");
    }

    public prepareFormula(value: string, row: number): string {
        let formula = value.substring(1);

        formula = formula.replace(/\%row\%/g, row.toString());

        return "=" + formula;
    }

    public async loadData2(modelDefinition: IModelDefinition | null = null): Promise<{[key: string]: any;}[]> {
        if (!this.sheet) return [{}];

        let loadData = await this.sheet.loadData(null);
        if (!loadData) return [{}];

        // data = this.sheet.prepareDataForHS(data);
        let data = this.sheet.prepareData(loadData);

        let _data = this.sheet.data;

        data?.forEach((row, index) => {
            if (!this.sheet) return;

            let rowsIndexes = this.sheet.findRowsIndexesBy("ID", row.ID);

            if (rowsIndexes) {
                const resolveModelDefinitionColumns = (modelDefinition: IModelDefinition | null = null, rowIndex: number) => {
                    modelDefinition?.columns?.forEach((column) => {
                        if(column.joinData){
                            _data[rowIndex][column.joinData] = row[column.joinData];
                        }
                    });

                    if (modelDefinition?.joins) {
                        modelDefinition.joins.forEach((join) => {
                            resolveModelDefinitionColumns(join.modelDefinition, rowIndex);
                        });
                    }
                };

                rowsIndexes.forEach((rowIndex: number | null) => {
                    resolveModelDefinitionColumns(modelDefinition, rowIndex as number);
                });
            }
        });

        this.updateData(_data);

        return [[]];
    }

    public updateData(data: {[key: string]: any;}[]) {
        // let _data: [][] = [];
        // let sourceData = this.handsontable.getSourceData();
        //
        // if (this.sheet?.sheetDefinition?.columns) {
        //     data.forEach((preparedDataRow, index) => {
        //         let row: [] = [];
        //         if (index >= sourceData.length) {
        //             return;
        //         }
        //         this.sheet.sheetDefinition?.columns?.forEach((column: ISheetDefinitionColumn, c: number) => {
        //             let value = preparedDataRow[column.joinData] ?? sourceData[index][c];
        //
        //             if (value) {
        //                 if (this.isFormula(value)) {
        //                     value = this.prepareFormula(value, index + 1);
        //                 }
        //             }
        //
        //             row.push(value);
        //         });
        //
        //         _data.push(row);
        //     });
        // }

        this.handsontable.updateData(data);
    }

    public prepareData(data: {[key: string]: any;}[]): [][] {
        let _data: [][] = [];
        if (this.sheet?.sheetDefinition?.columns) {
            data.forEach((preparedDataRow, index) => {
                let row: any[] = [];
                this.sheet?.sheetDefinition?.getColumnsSortByPosition()?.forEach((column: ISheetDefinitionColumn, c: number) => {
                    let value: any;
                    if(column.joinData){
                        value = preparedDataRow[column.joinData] ?? column.defaultValue ?? undefined;
                    }else{
                        value = column.defaultValue ?? undefined;
                    }


                    if (value) {
                        if (this.isFormula(value)) {
                            value = this.prepareFormula(value, index + 1);
                        }
                    }

                    row.push(value);
                });

                _data.push(row as []);
            });
        }

        return _data;
    }
}
