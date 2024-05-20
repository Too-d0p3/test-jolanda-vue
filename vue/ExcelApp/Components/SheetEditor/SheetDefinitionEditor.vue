<script setup lang="ts">
    import {reactive, ref, watch} from "vue";
    import {cloneDeep} from "lodash";
    import {useUpdateReactiveObject} from "@/Hooks/useUpdateReactiveObject.js";
    import {Sheet} from "@/Handsontable/js/Sheet";
    import {type IModelDefinition, ModelDefinition, type ModelDefinitionState} from "@/Handsontable/js/ModelDefinition";
    import {type ISheetDefinition, SheetDefinition} from "@/Handsontable/js/SheetDefinition";
    import Button from "@/Components/Inputs/Button.vue";
    import SheetDefinitionColumnsEditor from "@/ExcelApp/Components/SheetEditor/SheetDefinitionColumnsEditor.vue";
    import ModelEditorDialog from "@/ExcelApp/Components/SheetEditor/ModelEditorDialog.vue";

    const emit = defineEmits(['change']);

    const props = defineProps<{
        sheet: Sheet|null
    }>();

    const { updateObject } = useUpdateReactiveObject();

    const modelDefinition: IModelDefinition = reactive(props.sheet?.modelDefinition ? new ModelDefinition(cloneDeep(props.sheet.modelDefinition)) : new ModelDefinition(null));
    const sheetDefinition: ISheetDefinition = reactive(props.sheet?.sheetDefinition ? new SheetDefinition(cloneDeep(props.sheet.sheetDefinition)) : new SheetDefinition(null));

    const saveModelDefinition = (newModelDefinition: IModelDefinition) => {
        updateObject(modelDefinition, newModelDefinition);
    };

    watch([modelDefinition, sheetDefinition], ([newModelDefinition, newsSheetDefinition]) => {
        emit('change', newModelDefinition, newsSheetDefinition);
    });

    //MODEL DIALOG
    const showModelDialog = ref(false);
    //END MODEL DIALOG
</script>

<template>
    <div>
        <SheetDefinitionColumnsEditor :sheet-definition="sheetDefinition" :model-definition="modelDefinition"></SheetDefinitionColumnsEditor>
        <div class="mt-16 text-center mb-16">
            <div class="w-[25%] p-4 bg-gray-100 m-auto rounded-lg">
                <h2 class="text-xl">Definice data modelu</h2>
                <div class="mt-4">
                    <div v-if="modelDefinition.id === ''">
                        <Button @click="showModelDialog = true;" variant="green">Vytvořit model</Button>
                    </div>
                   <div v-else>
                       <div class="mb-4">
                           Base Model: {{ modelDefinition.name }}
                       </div>
                       <Button @click="showModelDialog = true;" variant="yellow">Editovat model</Button>
                   </div>
                </div>
            </div>
        </div>
        <ModelEditorDialog v-if="showModelDialog" :show="showModelDialog" :model-definition="modelDefinition" @save="saveModelDefinition" @close="showModelDialog = false"></ModelEditorDialog>

    </div>
</template>

<style scoped>

</style>