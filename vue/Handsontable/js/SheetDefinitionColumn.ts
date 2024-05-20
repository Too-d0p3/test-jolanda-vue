import type { ColumnState, IColumn } from "@/Handsontable/js/Column";
import { Column } from "@/Handsontable/js/Column";

export interface ISheetDefinitionColumn extends _T<SheetDefinitionColumnState> {}

type _T<T extends ColumnState> = T & IColumn<T>;
export interface SheetDefinitionColumnState extends ColumnState {
    model: string | null;
    position?: number | null;
    formating?: string | null;
}

export class SheetDefinitionColumn extends Column<SheetDefinitionColumnState> implements ISheetDefinitionColumn {
    public model: string | null = null;
    public formating?: string | null;
    public position: number | null = null;

    constructor(sheetDefinitionColumnState: SheetDefinitionColumnState | null = null) {
        super(
            sheetDefinitionColumnState ?? {
                data: "",
                title: "",
                type: "text",
                defaultValue: null,
                joinData: "",
                model: null,
            },
        );

        Object.assign(
            this,
            sheetDefinitionColumnState ?? {
                data: "",
                title: "",
                type: "text",
                defaultValue: null,
                model: null,
            },
        );
    }
}
