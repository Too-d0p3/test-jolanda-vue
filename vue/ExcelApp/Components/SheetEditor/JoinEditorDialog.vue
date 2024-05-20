<script setup lang="ts">
    import Button from "@/Components/Inputs/Button.vue";
    import Modal from "@/Components/Modal/Modal.vue";
    import {onMounted, ref, watch} from "vue";
    import type { ModelDefinitionRelation } from "@/Handsontable/js/ModelDefinitionRelation";
    import axios from "axios";
    import type { IModelDefinitionColumn } from "@/Handsontable/js/ModelDefinitionColumn";
    import { type IModelDefinitionJoin, ModelDefinitionJoin } from "@/Handsontable/js/ModelDefinitionJoin";
    import { ModelDefinition } from "@/Handsontable/js/ModelDefinition";
    import { useModelDefinitionLoader } from "@/ExcelApp/Hooks/useModelDefinitionLoader";
    import NewSelect from "@/Components/Inputs/NewSelect.vue";
    import InputField from "@/Components/Inputs/InputField.vue";

    const props = defineProps<{
        modelDefinition: ModelDefinition,
        show: boolean
    }>();

    const emit = defineEmits(['change', 'close', 'save']);

    const relatiosList = ref<ModelDefinitionRelation[]>([]);
    const selectedRelation = ref<ModelDefinitionRelation|null>(null);
    const customName = ref('');
    const show = ref<boolean>(props.show);

    const {loadModelDefinition} = useModelDefinitionLoader();

    const loadRelationsList = () => {
        let url = window.remoteUrl + '/admin/sheets/get-definition-relations';
        axios.get(url, {
            params: {
                id: props.modelDefinition.id,
            },
        }).then((response) => {
            try {
                relatiosList.value = response.data;
            }catch (e) {
                console.log(e);
                return;
            }
        });
    }

    const createRelation = async () => {
        if(!selectedRelation.value){
            return;
        }

        if(!selectedRelation.value.model){
            return;
        }

        let newModelDefinitionState = await loadModelDefinition(selectedRelation.value.model);


        if(!newModelDefinitionState){
            newModelDefinitionState = {
                id: selectedRelation.value.model,
                joinID: props.modelDefinition.getJoinUniqueID(selectedRelation.value.model),
                name: selectedRelation.value.name ?? '',
                customName: customName.value ?? '',
                joinChain: '',
            }

            newModelDefinitionState.joinChain = props.modelDefinition.joinChain ? props.modelDefinition.joinChain + '.' + newModelDefinitionState?.joinID : newModelDefinitionState.joinID ?? '';
        }else{
            newModelDefinitionState.customName =  customName.value ?? '';
            newModelDefinitionState.joinID = props.modelDefinition.getJoinUniqueID(newModelDefinitionState.id);
            newModelDefinitionState.joinChain = props.modelDefinition.joinChain ? props.modelDefinition.joinChain + '.' + newModelDefinitionState.joinID : newModelDefinitionState.joinID;

            if(newModelDefinitionState.columns){
                newModelDefinitionState.columns.forEach((column: IModelDefinitionColumn) => {
                    if(newModelDefinitionState){
                        column.joinData = newModelDefinitionState.joinChain ? newModelDefinitionState.joinChain + '.' + column.data : column.data;
                    }
                });
            }
        }

        const newJoin: IModelDefinitionJoin = new ModelDefinitionJoin({
            ...selectedRelation.value,
            modelDefinition: new ModelDefinition(newModelDefinitionState),
        });

        return newJoin;
    }

    const save = async () => {
        const newJoin = await createRelation();
        emit('save', newJoin);
        close();
    }

    const close = () => {
        show.value = false;
        emit('close');
    }

    onMounted(() => {
        loadRelationsList();
    });

    watch(selectedRelation, (val) => {
        if(val){
            customName.value = val.name ?? '';
        }else{
            customName.value = '';
        }
    });
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close" size="extraSmall">
        <template #header>
            Vytvořit join
        </template>
        <template #body>
            <div>
<!--                <Select-->
<!--                    v-model="selectedRelation"-->
<!--                    label="Join model"-->
<!--                    :options="relatiosList.map((relation, index) => {return {text: relation.name, value: relation}})"-->
<!--                ></Select>-->
                <NewSelect
                    v-model="selectedRelation"
                    label="Join model"
                    :options="relatiosList.map((relation, index) => {return {text: relation.name, value: relation}})"
                    :filterable="true"
                ></NewSelect>
                <InputField
                    v-if="selectedRelation"
                    v-model="customName"
                    label="Název propojení"
                />
            </div>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>