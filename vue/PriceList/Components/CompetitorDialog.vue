<script setup lang="ts">

import Modal from "@/Components/Modal/Modal.vue";
import Button from "@/Components/Inputs/Button.vue";
import { ref, watch } from "vue";
import NewSelect from "@/Components/Inputs/NewSelect.vue";

const props = defineProps<{
    competitor?: object,
    show: boolean
}>();

const emit = defineEmits(['change', 'close', 'save']);

const competitor = ref<object|undefined>(props.competitor);
const show = ref<boolean>(props.show);


const save = () => {
    emit('save', competitor.value);
    close();
}

const close = () => {
    show.value = false;
    emit('close', competitor.value);
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
            Přidat ceník na porovnání
        </template>
        <template #body>
            <NewSelect
                v-model="competitor"
                label="Konkurent k porovnání"
                :url="url+'/admin/competitor/data-list'"
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