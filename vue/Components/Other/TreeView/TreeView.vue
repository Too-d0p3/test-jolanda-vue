<script setup>
// var loadTreeData = function(){
//     Helpers.ajax({
//         url: basePath + '/default/product/load-product-type-tree',
//         success: function (data) {
//             tree.data = JSON.parse(data);
//             tree.tree.jstree().settings.core.data = JSON.parse(data);
//             tree.tree.jstree('refresh');
//         }
//     })
// }

import {defineEmits, onMounted, ref} from 'vue';
import TreeViewItem from './TreeViewItem.vue';
import axios from "axios";

const props = defineProps({
   items: {
        type: Array,
        default: null,
   },
   dataUrl: {
        type: String,
        default: null,
   },
   modelValue: Boolean,
   label: {
        type: String,
        default: 'Select items',
   },
});

const emit = defineEmits(['update:modelValue']);

const items = ref(props.items);
const selected = ref(props.modelValue ?? []);

const loadTreeData = () => {
    if(!props.dataUrl) {
        return;
    }

    axios.get(props.dataUrl).then((response) => {
        items.value = response.data;
    });
};

onMounted(() => {
   if(props.dataUrl) {
       loadTreeData();
   }
});

const updateSelected = (newSelected) => {
    selected.value = newSelected;
    emit('update:modelValue', selected.value);
};
</script>

<template>
    <div>
        <div>{{props.label}}</div>
        <TreeViewItem :items="items" :selected="selected" @update-selected="updateSelected" />
    </div>
</template>

<style scoped>

</style>