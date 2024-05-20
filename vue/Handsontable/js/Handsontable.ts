import type {HandsontableManager as IHandsontableManager} from "@/ExcelApp/Types/Global";

export class HandsontableManager implements IHandsontableManager{
    private instances: Map<string, any>;
    constructor() {
        this.instances = new Map();
    }

    registerInstance(name: string, instance: any) {
        this.instances.set(name, instance);
    }

    unregisterInstance(name: string) {
        this.instances.delete(name);
    }

    getInstance(name: string) {
        return this.instances.get(name);
    }

}

//TODO přidat na init inizializaci apky
// Vytvoření instance
const handsontableManager: IHandsontableManager = new HandsontableManager();

// Vystavení na window pro přístup z konzole
window.handsontableManager = handsontableManager;

// Exportování singletonu
export default handsontableManager;