import type { ISheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import { SheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import { Type } from "class-transformer";
import "reflect-metadata";

export interface ISheetDefinition extends SheetDefinitionState {
    moveColumnsPhysically(movedColumns: number[], finalIndex: number): void;
    moveColumnsPosition(movedColumns: number[], finalPosition: number): void;
    getColumnInPosition(position: number): ISheetDefinitionColumn | undefined;
    addColumn(column: ISheetDefinitionColumn): boolean;
    getColumnsSortByPosition(asc?: boolean): ISheetDefinitionColumn[];
    moveColumnToPosition(columnPositionToMove: number, finalPosition: number): void;
    setDefPositions(): void;
    physicalIndexToPosition(physicalIndex: number): number | null;
    physicalIndexesToPositions(physicalIndexes: number[]): number[];
    positionToPhysicalIndex(position: number): number | null;
    positionToPhysicalIndexes(positions: number[]): number[];
}

export interface SheetDefinitionState {
    columns?: ISheetDefinitionColumn[];
}

export class SheetDefinition implements ISheetDefinition {
    @Type(() => SheetDefinitionColumn)
    public columns?: ISheetDefinitionColumn[];
    constructor(sheetDefinitionState: SheetDefinitionState | null = null) {
        Object.assign(
            this,
            sheetDefinitionState ?? {
                columns: [],
            },
        );

        if (this.columns) {
            this.setDefPositions();
        }
    }

    public moveColumnsPhysically(movedColumns: number[], finalIndex: number) {
        if (!this.columns) return;

        const columnsToMove = movedColumns.map((index) => this.columns ? this.columns[index] : undefined);

        if(!columnsToMove){
            return;
        }

        // Odstraňte přesunuté sloupce z původního pole
        for (let i = movedColumns.length - 1; i >= 0; i--) {
            this.columns.splice(movedColumns[i], 1);
        }

        // Vložte sloupce zpět do pole na nové místo
        // Tento krok závisí na tom, zda finalIndex odkazuje na index před nebo po přesunutí
        this.columns.splice(finalIndex, 0, ...columnsToMove as ISheetDefinitionColumn[]);
    }

    public moveColumnsPosition(movedColumns: number[], finalPosition: number) {
        if (!this.columns) return;

        movedColumns.sort((a, b) => b - a);

        let cols = movedColumns.map((position) => this.getColumnInPosition(position));

        cols.forEach((col, offset) => {
            if(col){
                this.moveColumnToPosition(col.position as number, finalPosition);
            }
        });
    }

    public moveColumnToPosition(columnPositionToMove: number, finalPosition: number): void {
        if (!this.columns) return;

        this.setDefPositions();

        let columnToMove = this.columns.find((col) => col.position === columnPositionToMove);

        if (columnToMove) {
            // Přesuneme vybraný sloupec na finalPosition
            columnToMove.position = finalPosition;

            // Aktualizujeme pozice ostatních sloupců
            this.columns.forEach((col) => {
                if(typeof col.position === 'undefined' || col.position === null){
                    return;
                }

                if (col !== columnToMove) {
                    if (finalPosition > columnPositionToMove && col.position > columnPositionToMove && col.position <= finalPosition) {
                        col.position--;
                    } else if (finalPosition < columnPositionToMove && col.position < columnPositionToMove && col.position >= finalPosition) {
                        col.position++;
                    }
                }
            });
        }
    }

    public getColumnInPosition(position: number): ISheetDefinitionColumn | undefined {
        if (!this.columns) return undefined;

        return this.columns.find((column) => column.position === position);
    }

    public setDefPositions() {
        if (this.columns) {
            const occupiedPositions = new Set(this.columns.map((col) => col.position));

            this.columns?.forEach((column, index) => {
                if (column.position === undefined) {
                    // Kontrola, zda je daná pozice volná
                    if (!occupiedPositions.has(index)) {
                        column.position = index;
                        occupiedPositions.add(index);
                    } else {
                        // Najít první volnou pozici
                        let newPosition = 0;
                        while (occupiedPositions.has(newPosition)) {
                            newPosition++;
                        }
                        column.position = newPosition;
                        occupiedPositions.add(newPosition);
                    }
                }
            });
        }
    }

    public addColumn(column: ISheetDefinitionColumn): boolean {
        if (this.columns) {
            let col = this.columns.find((col) => column.joinData === col.joinData);

            if (col) {
                return false;
            }

            column.position = this.columns.length;

            this.columns = [...this.columns, column];
        }

        this.setDefPositions();

        return true;
    }

    getColumnsSortByPosition(asc: boolean = true): ISheetDefinitionColumn[] {
        if (!this.columns) return [];

        this.setDefPositions();

        return this.columns.slice().sort((a, b) => {
            if (asc) {
                // Vzestupné řazení
                return a.position as number - (b.position as number);
            } else {
                // Sestupné řazení
                return b.position as number - (a.position as number);
            }
        });
    }

    physicalIndexToPosition(physicalIndex: number): number | null {
        if (!this.columns) return null;

        return this.columns[physicalIndex].position ?? null;
    }

    physicalIndexesToPositions(physicalIndexes: number[]): number[] {
        if (!this.columns) return [];

        return physicalIndexes.map((physicalIndex) => this.physicalIndexToPosition(physicalIndex) ?? 0);
    }

    positionToPhysicalIndex(position: number): number | null {
        if (!this.columns) return null;

        return this.columns.findIndex((column) => column.position === position);
    }

    positionToPhysicalIndexes(positions: number[]): number[] {
        if (!this.columns) return [];

        return positions.map((position) => this.positionToPhysicalIndex(position) ?? 0);
    }
}
