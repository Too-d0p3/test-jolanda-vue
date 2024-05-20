<script setup lang="ts">

import Button from "@/Components/Inputs/Button.vue";
import InputField from "@/Components/Inputs/InputField.vue";
import { reactive, ref } from "vue";
import { SheetDefinitionColumn } from "@/Handsontable/js/SheetDefinitionColumn";
import Modal from "@/Components/Modal/Modal.vue";
import { cloneDeep } from "lodash";
import Table from "@/Components/Table/Table.vue";
import TheadTh from "@/Components/Table/TheadTh.vue";
import Tbody from "@/Components/Table/Tbody.vue";
import TbodyTr from "@/Components/Table/TbodyTr.vue";
import Thead from "@/Components/Table/Thead.vue";
import TbodyTd from "@/Components/Table/TbodyTd.vue";
import TheadTr from "@/Components/Table/TheadTr.vue";

const props = defineProps<{
    column?: SheetDefinitionColumn|null,
    show: boolean,
}>();

const emit = defineEmits(['close', 'save']);

const column = reactive(props.column ? cloneDeep(new SheetDefinitionColumn(props.column)) : new SheetDefinitionColumn());

const show = ref<boolean>(props.show);

const save = () => {
    //TODO ??
    column.joinData = column.data;
    emit('save',column);
    close();
}

const close = () => {
    show.value = false;
    emit('close', column);
}

</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close">
        <template #header>
            <p v-if="props.column">Úprava sloupce</p>
            <p v-else>Vytvoření sloupce</p>
        </template>
        <template #body>
            <Table>
                <Thead>
                    <TheadTr>
                        <TheadTh>Data</TheadTh>
                        <TheadTh>Název</TheadTh>
                        <TheadTh>Typ sloupce</TheadTh>
                        <TheadTh>Defaultní hodnota</TheadTh>
                        <TheadTh>Formátování</TheadTh>
                    </TheadTr>
                </Thead>
                <Tbody>
                    <TbodyTr>
                        <TbodyTd>
                            <InputField
                                v-model="column.data"
                                label="Data"
                                class="mr-2 flex-grow-1"
                            />
                        </TbodyTd>
                        <TbodyTd>
                            <InputField
                                v-model="column.title"
                                label="Název"
                                class="mr-2 flex-grow-1"
                            />
                        </TbodyTd>
                        <TbodyTd>
                            <InputField
                                v-model="column.type"
                                label="Typ sloupce"
                                class="mr-2 flex-grow-1"
                            />
                        </TbodyTd>
                        <TbodyTd>
                            <InputField
                                v-model="column.defaultValue"
                                label="Defaultní hodnota"
                                class="mr-2 flex-grow-1"
                            />
                        </TbodyTd>
                        <TbodyTd>
                            <InputField
                                v-model="column.formating"
                                label="Formátování"
                                class="mr-2 flex-grow-1"
                            />
                        </TbodyTd>
                    </TbodyTr>
                </Tbody>
            </Table>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>