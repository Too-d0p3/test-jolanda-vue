<script setup lang="ts">
    import {reactive} from "vue";
    import SheetDefinitionEditor from "@/ExcelApp/Components/SheetEditor/SheetDefinitionEditor.vue";
    import {cloneDeep} from "lodash";
    import {Sheet} from "@/Handsontable/js/Sheet";
    import type {ISheetDefinition} from "@/Handsontable/js/SheetDefinition";
    import type {IModelDefinition} from "@/Handsontable/js/ModelDefinition";
    import Button from "@/Components/Inputs/Button.vue";
    import Form from "@/Components/Inputs/Form.vue";
    import InputField from "@/Components/Inputs/InputField.vue";

    const props = withDefaults(defineProps<{
        sheet?: Sheet|null,
        clone?: boolean,
        showConfigurator: any,
    }>(), {
        sheet: null,
        clone: true,
        showConfigurator: null
    });

    const emit = defineEmits(['submit', 'back']);

    const sheet: Sheet = reactive(props.sheet ? (props.clone ? new Sheet(cloneDeep(props.sheet)) : props.sheet) : new Sheet(null));

    const onSubmit = () => {
        emit('submit', sheet);
    };

    const onDefinitionChange = (mDefinition: IModelDefinition, sDefinition: ISheetDefinition) => {
        sheet.sheetDefinition = sDefinition;
        sheet.modelDefinition = mDefinition;
    };

    const back = () => {
        emit('back');
    };

</script>

<template>
    <div class="py-8">
        <div class="text-center w-[50%] m-auto bg-gray-100 p-4 rounded-lg">
            <div class="flex justify-between">
                <div>
                    <Button @click="back">Zpět</Button>
                </div>
                <div>
                    <Button @click="props.showConfigurator" v-if="sheet.type === 'price-list'">Konfigurátor</Button>
                </div>
            </div>

            <h2 v-if="sheet.id === null" class="text-2xl">Vytvořit nový list</h2>
            <h2 v-else class="text-2xl">Editovat list ID[{{sheet.id}}]</h2>
            <Form @submit="onSubmit">
                <InputField
                    v-model="sheet.name"
                    label="Název"
                    placeholder="Název listu"
                    class="mr-2 flex-grow-1 text-left"
                    variant="outlined"
                ></InputField>
    <!--            <Button variant="green" type="submit">Vytvořit</Button>-->
            </Form>
        </div>

        <div class="m-auto mt-16">
            <SheetDefinitionEditor @change="onDefinitionChange" :sheet="sheet"></SheetDefinitionEditor>
        </div>
    </div>
</template>

<style scoped>

</style>
