
export interface IModelDefinitionRelation extends ModelDefinitionRelationState{

}

export interface ModelDefinitionRelationState {
    model?: string,
    name?: string,
    foreignKey: string,
    localKey: string,
}
export class ModelDefinitionRelation implements IModelDefinitionRelation{
    public model?: string;
    public name?: string;
    public foreignKey: string = '';
    public localKey: string = '';

    constructor(modelDefinitionRelationState: ModelDefinitionRelationState|null){
        Object.assign(this, modelDefinitionRelationState ?? {
            model: '',
            name: '',
            foreignKey: '',
            localKey: '',
        });
    }
}