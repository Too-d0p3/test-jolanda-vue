<script setup lang="ts">

import Modal from "@/Components/Modal/Modal.vue";
import Button from "@/Components/Inputs/Button.vue";
import { ref, watch } from "vue";
import NewSelect from "@/Components/Inputs/NewSelect.vue";

const props = defineProps<{
    priceList?: object,
    show: boolean
}>();

const emit = defineEmits(['change', 'close', 'save']);

const priceList = ref<object|undefined>(props.priceList);
const show = ref<boolean>(props.show);


const save = () => {
    emit('save', priceList.value);
    close();
}

const close = () => {
    show.value = false;
    emit('close', priceList.value);
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
            Přidat eshop ceník na porovnání
        </template>
        <template #body>
            <NewSelect
                v-model="priceList"
                label="Eshop ceník k porovnání"
                :url="url+'/admin/shop/data-list'"
                :filterable="true"
                :return-object="true"
            ></NewSelect>
        </template>
        <template #footer>
            <Button variant="green" @click="save">Uložit</Button>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>