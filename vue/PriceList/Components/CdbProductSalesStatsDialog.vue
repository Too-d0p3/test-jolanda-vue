<script setup lang="ts">

import Modal from "@/Components/Modal/Modal.vue";
import Button from "@/Components/Inputs/Button.vue";
import { ref, watch } from "vue";
import NewSelect from "@/Components/Inputs/NewSelect.vue";
import DatePicker from "@/Components/Inputs/DatePicker.vue";

const props = defineProps<{
    productSalesStats?: {},
    show: boolean
}>();

const emit = defineEmits(['change', 'close', 'save']);

const productSalesStats = ref<{[key: string]: any}>(props.productSalesStats ?? {
    company: '',
    dateRange: null,
});
const show = ref<boolean>(props.show);


const save = () => {
    emit('save', productSalesStats.value);
    close();
}

const close = () => {
    show.value = false;
    emit('close', productSalesStats.value);
}

watch(() => props.show, (val) => {
    show.value = props.show;
});

//url
const url = window.remoteUrl;
//url
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close">
        <template #header>
            Přidat historii prodejů firmy [z CDB]
        </template>
        <template #body>
            <NewSelect
                v-model="productSalesStats.company"
                label="Firma"
                :url="url+'/user/user-info-companies/data-list'"
                :filterable="true"
                :return-object="true"
                remote-name="CompanyName"
                remote-identifier="CompanyName"
            ></NewSelect>
            <div class="flex">
                <DatePicker
                    :range="true"
                    v-model="productSalesStats.dateRange"
                >
                </DatePicker>
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