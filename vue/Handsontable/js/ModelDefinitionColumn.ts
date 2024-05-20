import type { ColumnState, IColumn } from "@/Handsontable/js/Column";
import { Column } from "@/Handsontable/js/Column";

export interface IModelDefinitionColumn extends _T<ModelDefinitionColumnState> {}

type _T<T extends ColumnState> = T & IColumn<T>;

export interface ModelDefinitionColumnState extends ColumnState {}

export class ModelDefinitionColumn extends Column<ModelDefinitionColumnState> implements IModelDefinitionColumn {
    constructor(modelDefinitionColumnState: ModelDefinitionColumnState | null) {
        super(
            modelDefinitionColumnState ?? {
                data: "",
                title: "",
                type: "text",
                defaultValue: null,
            },
        );

        Object.assign(
            this,
            modelDefinitionColumnState ?? {
                data: "",
                title: "",
                type: "text",
                defaultValue: null,
            },
        );
    }
}
