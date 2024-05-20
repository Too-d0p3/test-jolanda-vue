<script setup>

const props = defineProps({
    items: Array,
    selected: Array
});

const emit = defineEmits(['update-selected']);

const toggleSelected = (item) => {
    const index = props.selected.indexOf(item.id);
    if (index > -1) {
        props.selected.splice(index, 1);
    } else {
        props.selected.push(item.id);
    }
    emit('update-selected', props.selected);
};

const isSelected = (id) => {
    return props.selected.includes(id);
};

</script>

<template>
    <ul class="pl-4">
        <li v-for="item in items" :key="item.id" class="mt-2">
            <div class="flex items-center" :class="{'ml-5': !item.children?.length}">
                <a v-if="item.children?.length" @click="item.expanded = !item.expanded" class="hover:cursor-pointer hover:underline mr-3">
                    {{ item.children?.length ? (item.expanded ? '-' : '+') : '' }}
                </a>
                <input type="checkbox" :checked="isSelected(item.id)" @change="toggleSelected(item)" class="mr-2">
                {{ item.text }}
            </div>
            <TreeViewItem v-if="item.expanded" :items="item.children" :selected="selected" @update-selected="$emit('update-selected', selected)" />
        </li>
    </ul>
</template>

<style scoped>

</style>