<script setup lang="ts">
import Button from "@/Components/Inputs/Button.vue";
import { ref } from "vue";
import Modal from "@/Components/Modal/Modal.vue";
import RowData from "@/Handsontable/Components/Table/RowData.vue";

const props = defineProps<{
    data: { [key: string]: any },
    show: boolean,
}>();

const emit = defineEmits(['close']);

const show = ref<boolean>(props.show);

const close = () => {
    show.value = false;
    emit('close');
}
</script>

<template>
    <Modal :isVisible="show" @update:isVisible="close">
        <template #header>
            Data řádku
        </template>
        <template #body>
           <RowData :data="props.data"></RowData>
        </template>
        <template #footer>
            <Button variant="red" @click="close">Zavřít</Button>
        </template>
    </Modal>
</template>

<style scoped>

</style>