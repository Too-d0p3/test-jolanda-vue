import type {SheetManager} from "@/Handsontable/js/SheetManager";

export interface HandsontableManager {
    registerInstance(name: string, instance: any): void;
    unregisterInstance(name: string): void;
    getInstance(name: string): any;
}

declare global {
    interface Window {
        handsontableManager: HandsontableManager,
        sheetManager: SheetManager,
        remoteUrl: string,
    }
}