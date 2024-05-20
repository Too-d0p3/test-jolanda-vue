

import type { ISheetDefinition } from "@/Handsontable/js/SheetDefinition";
import type {IModelDefinition, LoadData} from "@/Handsontable/js/ModelDefinition";
import type { ISheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import type { IFilter } from "@/Filter/js/Filter";
import { Type } from "class-transformer";
import { ModelDefinition } from "@/Handsontable/js/ModelDefinition";
import "reflect-metadata";
import { SheetDefinition } from "@/Handsontable/js/SheetDefinition";

export interface ISheet extends SheetState {
    loadData(modelDefinition: IModelDefinition | null): Promise<LoadData | undefined>;
    prepareDataForHS(data: LoadData): { [key: string]: any }[];
    prepareData(data: LoadData): { [key: string]: any }[];
    findRowsBy(by: string, value: string): { [key: string]: any }[];
    findRowsIndexesBy(by: string, value: string): (number | null)[];
    // getModelForColumn(column: ISheetDefinitionColumn): IModelDefinition | null;
    getDataForSheetColumns(): [][];
}

export interface SheetState {
    name: string;
    id: number | null;
    data: { [key: string]: any }[];
    dataUrl?: string | null;
    sheetDefinition?: ISheetDefinition | null;
    modelDefinition?: IModelDefinition | null;
    type: string;
}

export class Sheet implements ISheet {
    public name: string;
    public id: number | null;
    public data: { [key: string]: any }[] = [{}];
    public dataUrl?: string | null;
    public type: string;

    @Type(() => SheetDefinition)
    public sheetDefinition?: ISheetDefinition | null;

    @Type(() => ModelDefinition)
    public modelDefinition?: IModelDefinition | null;

    constructor(sheetState: SheetState | null = null) {
        Object.assign(
            this,
            sheetState ?? {
                name: "",
                id: null,
                data: [{}],
                dataUrl: null,
                sheetDefinition: new SheetDefinition(),
                modelDefinition: null,
            },
        );

        this.name = sheetState?.name ?? '';
        this.type = sheetState?.type ?? 'default';
        this.id = sheetState?.id ?? null;
        this.data = sheetState?.data ?? [{}];
        this.dataUrl = sheetState?.dataUrl ?? null;
        this.sheetDefinition = sheetState?.sheetDefinition ?? new SheetDefinition();
        this.modelDefinition = sheetState?.modelDefinition ?? null;
    }

    public async loadData(modelDefinition: IModelDefinition | null = null, dataFilter: IFilter | null = null): Promise<LoadData | undefined> {
        if (!this.modelDefinition) return;

        if (!modelDefinition) return await this.modelDefinition.loadDataFromURL(dataFilter);
        else return await modelDefinition.loadDataFromURL(dataFilter);
    }

    public prepareDataForHS(data: LoadData): { [key: string]: any }[] {
        if (!this.sheetDefinition || !this.modelDefinition) {
            return [{}];
        }

        let preparedData: { [key: string]: any }[] = this.prepareData(data);

        let finalData: { [key: string]: any }[] = [];
        if (this.sheetDefinition.columns) {
            preparedData.forEach((preparedDataRow, index) => {
                let row: any[] = [];
                this.sheetDefinition?.columns?.forEach((column: ISheetDefinitionColumn, c: number) => {
                    let value = preparedDataRow[column.data] ?? column.defaultValue ?? undefined;

                    // if (typeof value === "undefined"){
                    //     if(column.defaultValue){
                    //         value = column.defaultValue;
                    //     }
                    // }

                    row.push(value);
                });

                finalData.push(row);
            });
        }

        return finalData;
    }

    public prepareData(data: LoadData): { [key: string]: any }[] {
        let preparedData: {[key: string]: any}[] = [];
        preparedData = data.items as {[key: string]: any}[];

        const resolveJoins = (join: any, parentData: any) => {
            let currentChain = join.modelDefinition.joinChain ? join.modelDefinition.joinChain + "." : join.modelDefinition.joinChain;

            let chainBefore = join.modelDefinition.joinChain.slice(0, join.modelDefinition.joinChain.lastIndexOf(".") !== -1 ? join.modelDefinition.joinChain.lastIndexOf(".") : 0);
            chainBefore = chainBefore ? chainBefore + "." : "";

            let joinRow = join.items.find((joinItem: any) => joinItem[join.join.foreignKey] === parentData[chainBefore + join.join.localKey]);

            if (joinRow) {
                joinRow = Object.keys(joinRow).reduce((newObj: {[key: string]: any}, key) => {
                    const newKey = currentChain + key; // Přidání prefixu k názvu vlastnosti
                    newObj[newKey] = joinRow[key]; // Přiřazení původní hodnoty k novému klíči
                    return newObj;
                }, {});
                if (join.joins) {
                    join.joins.forEach((subJoin: any) => {
                        joinRow = { ...joinRow, ...resolveJoins(subJoin, joinRow) };
                    });
                }

                return joinRow;
            }

            return {};
        };

        if (data.joins) {
            preparedData.forEach((row, index) => {
                data.joins.forEach((join: any) => {
                    preparedData[index] = { ...preparedData[index], ...resolveJoins(join, preparedData[index]) };
                });
            });
        }

        return preparedData;
    }

    public findRowsBy(by: string, value: string) {
        let row = this.data?.filter((row: any) => row[by] === value);
        return row;
    }

    public findRowsIndexesBy(by: string, value: string): (number | null)[] {
        let indexes = this.data?.map((row: any, index) => (row[by] === value ? index : null)).filter((index) => index !== null);
        return indexes;
    }

    // getModelForColumn(column: ISheetDefinitionColumn): IModelDefinition | null {
    //     if (!this.modelDefinition) {
    //         return null;
    //     }
    //
    //     let model = this.modelDefinition.getModelForColumn(column.model ?? "");
    //
    //     return model;
    // }

    getDataForSheetColumns(): [][] {
        if (!this.sheetDefinition || !this.data) {
            return [[]];
        }

        let filteredData: [][] = [];
        this.data?.forEach((row: any, index) => {
            let newRow: any[] = [];
            this.sheetDefinition?.columns?.forEach((column: ISheetDefinitionColumn, c: number) => {
                newRow.push(row[column.joinData as string] ?? undefined);
            });
            filteredData.push(newRow as []);
        });

        return filteredData;
    }
}
