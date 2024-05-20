import type {IFilter} from "@/Filter/js/Filter";

export interface FilterItemOperation {
    operation: string,
    value: string|string[],
}

export interface FilterProps {
    filter?: IFilter,
}

export interface FilterDialogProps extends FilterProps {
    show: boolean,
}