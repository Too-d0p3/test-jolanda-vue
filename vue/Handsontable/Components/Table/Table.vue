<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
    import HotTable from "@handsontable/vue3";
    import { registerAllModules } from 'handsontable/registry';
    import 'handsontable/dist/handsontable.full.css';
    import Handsontable from "handsontable";
    import HandsontableManager from "./../../js/Handsontable";
    import {Table} from "@/Handsontable/js/Table.js";

    const props = defineProps<{
        name: string,
        table: Table
    }>();

    registerAllModules();

    const table = props.table;

    const hotTableRef = ref(null);
    const hotInstance = ref<Handsontable|null>(null);

    watch(() => table.handsontableSettings, (newVal: {[key: string]: any}, oldValue) => {
        // for (const key in newVal) {
        //     if (newVal.hasOwnProperty(key)) {
        //         hotSettings[key] = newVal[key];
        //     }
        // }
    }, {deep: true});

    // watchEffect(() => {
    //     console.log('changed');
    //     if(hotInstance.value){
    //         console.log('hotSettings changed', hotSettings);
    //         hotInstance.value.render();
    //     }
    // });


    onMounted(() => {
        if (hotTableRef.value) {
            // Zde získáte přístup k instanci Handsontable
            //@ts-ignore
            table.handsontable = hotTableRef.value.hotInstance;

            if(table.handsontable){
                HandsontableManager.registerInstance(props.name, table);
                //@ts-ignore
                window.table = table;
            }
        }
    });

    onUnmounted(() => {
        HandsontableManager.unregisterInstance(props.name);
    });

</script>

<template>
    <hot-table :settings="table.handsontableSettings" ref="hotTableRef"></hot-table>
</template>

<style scoped>

</style>