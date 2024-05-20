import type { ISheet, SheetState } from "@/Handsontable/js/Sheet";
import { plainToInstance } from "class-transformer";
import { Sheet } from "@/Handsontable/js/Sheet";

export interface ISheetManager extends SheetManagerState {
    addSheet(instance: any): void;
    removeSheetByID(id: number): void;
    getSheetByID(id: number | null): ISheet | undefined;
    isExistWithID(id: number): boolean;
    updateSheet(sheet: ISheet): void;
    getLastSheetID(): number | null;
    load(): void;
}

export interface SheetManagerState {
    sheets: ISheet[];
}

export class SheetManager implements ISheetManager {
    public sheets: ISheet[];

    constructor() {
        this.sheets = [];

        Object.assign(this, {
            sheets: [],
        });
    }

    public addSheet(instance: any) {
        this.sheets = [...this.sheets, instance];
    }

    public removeSheetByID(id: number) {
        const index = this.sheets.findIndex((item: ISheet) => item.id === id);
        if (index !== -1) {
            this.sheets.splice(index, 1);
        }
    }

    public getSheetByID(id: number | null): ISheet {
        return this.sheets.filter((sheet: ISheet) => sheet.id === id)[0] ?? undefined;
    }

    public isExistWithID(id: number) {
        return this.sheets.filter((sheet: ISheet) => sheet.id === id).length > 0;
    }

    public updateSheet(sheet: ISheet) {
        const index = this.sheets.findIndex((item: ISheet) => item.id === sheet.id);
        if (index !== -1) {
            this.sheets[index] = sheet;
        }
    }

    public getLastSheetID(): number | null {
        return this.sheets.length ? this.sheets[this.sheets.length - 1].id : -1;
    }

    public load() {
        let sheets = localStorage.getItem("sheets");

        if (sheets) {
            let sheetStates: SheetState[] = JSON.parse(sheets) as SheetState[];

            if (sheetStates) {
                sheetStates.forEach((sheet: SheetState) => {
                    const realSheet = plainToInstance(Sheet, sheet);
                    this.addSheet(realSheet);
                });
            }
        }
    }
}
