import type {ModelDefinitionRelationState} from "@/Handsontable/js/ModelDefinitionRelation";
import type {IModelDefinition} from "@/Handsontable/js/ModelDefinition";
import {Type} from "class-transformer";
import {ModelDefinition} from "@/Handsontable/js/ModelDefinition";
import 'reflect-metadata';

export interface IModelDefinitionJoin extends ModelDefinitionJoinState {
    resolveJoins(data: any, parentData: any): any;
}

export interface ModelDefinitionJoinState extends ModelDefinitionRelationState {
    modelDefinition: IModelDefinition|null,
}


export class ModelDefinitionJoin implements IModelDefinitionJoin{
    @Type(() => ModelDefinition)
    public modelDefinition: IModelDefinition|null = null;

    public model?: string;
    public name?: string;
    public foreignKey: string = '';
    public localKey: string = '';


    constructor(modelDefinitionJoinState: ModelDefinitionJoinState|null){
        Object.assign(this, modelDefinitionJoinState ?? {
            model: '',
            name: '',
            foreignKey: '',
            localKey: '',
            modelDefinition: null,
        });
    }

    public resolveJoins = (data: any, parentData: any) => {
        if(!this.modelDefinition){
            return;
        }

        let currentChain = this.modelDefinition.joinChain ? this.modelDefinition.joinChain + '.' : this.modelDefinition.joinChain;

        let chainBefore = this.modelDefinition.joinChain.slice(0, this.modelDefinition.joinChain.lastIndexOf('.') !== -1 ? this.modelDefinition.joinChain.lastIndexOf('.') : 0);
        chainBefore = chainBefore ? chainBefore + '.' : '';

        let joinRow = data.items.find((joinItem: any) => joinItem[this.foreignKey] === parentData[chainBefore + this.localKey]);

        if(joinRow){
            joinRow = Object.keys(joinRow).reduce((newObj: {[key: string]: any}, key) => {
                const newKey = currentChain + key; // Přidání prefixu k názvu vlastnosti
                newObj[newKey] = joinRow[key]; // Přiřazení původní hodnoty k novému klíči
                return newObj;
            }, {});
            if(this.modelDefinition.joins){
                this.modelDefinition.joins.forEach((subJoin) => {
                    joinRow = {...joinRow, ...subJoin.resolveJoins(subJoin, joinRow)};
                });
            }

            return joinRow;
        }

        return {};
    };

}