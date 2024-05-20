
//@ts-ignore
export interface IColumn<T extends ColumnState> extends T {
    getJoinChain(): string;
}

export interface ColumnState {
    data: string;
    title: string;
    type: string;
    defaultValue?: string | null;
    joinData?: string;
}

export class Column<T extends ColumnState> implements IColumn<T> {
    public data: string = "";
    public title: string = "";
    public type: string = "";
    public defaultValue?: string | null;
    public joinData?: string;

    constructor(columnState: T) {
        Object.assign(this, columnState);
    }

    public getJoinChain(): string {
        if (!this.joinData) return "";

        const lastDotPosition = this.joinData.lastIndexOf(".");

        if (lastDotPosition === -1) return "";

        return this.joinData.substring(0, lastDotPosition);
    }
}
