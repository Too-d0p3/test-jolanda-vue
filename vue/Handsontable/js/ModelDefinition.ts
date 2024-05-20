import type { IModelDefinitionColumn } from "@/Handsontable/js/ModelDefinitionColumn";
import type { IModelDefinitionRelation } from "@/Handsontable/js/ModelDefinitionRelation";
import type { IModelDefinitionJoin } from "@/Handsontable/js/ModelDefinitionJoin";
import type { ISheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import { SheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import axios from "axios";
import type { IFilter } from "@/Filter/js/Filter";
import { Helper } from "@/Handsontable/js/Helper";
import { Filter } from "@/Filter/js/Filter";
import { FilterItem } from "@/Filter/js/FilterItem";
import { Type } from "class-transformer";
import { ModelDefinitionColumn } from "@/Handsontable/js/ModelDefinitionColumn";
import { ModelDefinitionRelation } from "@/Handsontable/js/ModelDefinitionRelation";
import { ModelDefinitionJoin } from "@/Handsontable/js/ModelDefinitionJoin";
import "reflect-metadata";

export interface SortState {
    column: string | null;
    direction: string | null;
}

export interface IModelDefinition extends ModelDefinitionState {
    getColumnsForSheetDefinition(): ISheetDefinitionColumn[];
    loadDataFromURL(dataFilter: IFilter | null): Promise<LoadData | undefined>;
    getModelByJoinChain(joinChain: string): IModelDefinition | null;
    getJoinUniqueID(id: string): string;
    getColumnByData(data: string): IModelDefinitionColumn | null;
}

export interface LoadData{
    items: { [key: string]: any }[] | null;
    joins: LoadData[];
    modelDefinition: IModelDefinition | null;
    join: IModelDefinitionJoin | null;
}

export interface ModelDefinitionState {
    id: string;
    joinID?: string | null;
    name: string;
    customName?: string | null;
    dataUrl?: string;
    columns?: IModelDefinitionColumn[];
    relations?: IModelDefinitionRelation[];
    joins?: IModelDefinitionJoin[];
    dataFilter?: IFilter | null;
    isLoaded?: boolean;
    joinChain: string;
    sort?: SortState;
}
export class ModelDefinition implements IModelDefinition {
    public id: string;
    public joinID?: string | null;
    public name: string;
    public customName?: string | null;
    public dataUrl?: string;

    @Type(() => ModelDefinitionColumn)
    public columns?: IModelDefinitionColumn[];

    @Type(() => ModelDefinitionRelation)
    public relations?: IModelDefinitionRelation[];

    @Type(() => ModelDefinitionJoin)
    public joins?: IModelDefinitionJoin[];

    @Type(() => Filter)
    public dataFilter?: IFilter | null;
    public isLoaded?: boolean;
    public joinChain: string;
    public sort?: SortState;

    constructor(modelDefinitionState: ModelDefinitionState | null = null) {
        this.joinChain = "";

        Object.assign(
            this,
            modelDefinitionState ?? {
                id: "",
                name: "",
                dataUrl: undefined,
                columns: [],
                relations: [],
                joins: [],
                isLoaded: false,
            },
        );

        this.id = modelDefinitionState?.id ?? "";
        this.name = modelDefinitionState?.name ?? "";
    }

    public getColumnsForSheetDefinition(): ISheetDefinitionColumn[] {
        let columns: ISheetDefinitionColumn[] = [];

        this.columns?.forEach((column, name) => {
            const defColumn: ISheetDefinitionColumn = new SheetDefinitionColumn({
                type: column.type,
                title: column.title,
                data: column.data,
                defaultValue: column.defaultValue,
                model: this.id,
                joinData: column.joinData,
            });

            columns.push(defColumn);
        });

        if (this.joins) {
            this.joins.forEach((join) => {
                if (!join.modelDefinition) return;

                const joinColumns = join.modelDefinition.getColumnsForSheetDefinition();
                joinColumns.map((column) => {
                    // column.data = join.model + "." + column.data;
                    column.model = join.model ?? "";
                });

                columns = [...columns, ...joinColumns];
            });
        }

        return columns;
    }

    public async loadDataFromURL(dataFilter: IFilter | null = null): Promise<LoadData | undefined> {
        if (!this.dataUrl) return;

        dataFilter = new Filter({
            items: {
                ...(dataFilter?.items ?? {}),
                ...(this.dataFilter?.items ?? {}),
            },
        });

        const url = Helper.prepareUrl(this.dataUrl, dataFilter, this.sort);

        let data: LoadData = {
            items: null,
            joins: [],
            modelDefinition: this,
            join: null,
        };

        let tmp: {[key: string]: any} = {};
        if (dataFilter) {
            for (const [key, obj] of Object.entries(dataFilter.items)) {
                if (obj.filters?.length) {
                    tmp[key] = JSON.stringify({ filters: obj.filters });
                    // searchParams.set(key, JSON.stringify({ filters: obj.filters }));
                }
            }
        }

        await axios.post(url, tmp, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            try {
                data.items = response.data.items;
            } catch (e) {
                console.log(e);
                return [];
            }
        });

        if (this.joins && data.items) {
            for (const join of this.joins) {
                let uniqueLocalValues: string[] = [...new Set<string>(data.items.map((item) => item[join.localKey] ?? -1))];

                const newFilter = new Filter({
                    items: {
                        [join.foreignKey]: new FilterItem({
                            filters: [
                                {
                                    operation: "in",
                                    value: uniqueLocalValues,
                                },
                            ],
                        }),
                    },
                });

                let joinData = await join.modelDefinition?.loadDataFromURL(newFilter);

                if (joinData) {
                    data.joins.push(joinData);
                    joinData.join = join;
                }
            }
        }

        return data;
    }

    getModelByJoinChain(joinChain: string): IModelDefinition | null {
        if (joinChain === this.joinChain) {
            return this;
        } else {
            let model: any = null;
            this.joins?.forEach((join) => {
                if (join.modelDefinition && !model) {
                    model = join.modelDefinition.getModelByJoinChain(joinChain);
                }
            });

            return model;
        }
    }

    public getJoinUniqueID(id: string): string {
        const found = this.joins?.filter((join) => join.modelDefinition?.id == id);

        if(found && found.length > 0){
            return id+"_"+found.length;
        }else{
            return id;
        }
    }

    public getColumnByData(data: string): IModelDefinitionColumn | null {
        return this.columns?.find((column) => {
            if(column.data == data) {
                return column;
            }
        }) ?? null;
    }
}
