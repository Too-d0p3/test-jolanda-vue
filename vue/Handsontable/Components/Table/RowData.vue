<script setup lang="ts">
    import TbodyTd from "@/Components/Table/TbodyTd.vue";
    import Tbody from "@/Components/Table/Tbody.vue";
    import Table from "@/Components/Table/Table.vue";
    import TheadTr from "@/Components/Table/TheadTr.vue";
    import TbodyTr from "@/Components/Table/TbodyTr.vue";
    import Thead from "@/Components/Table/Thead.vue";
    import TheadTh from "@/Components/Table/TheadTh.vue";

    const props = defineProps<{
        data: { [key: string]: any },
    }>();
</script>

<template>
    <Table>
        <Thead>
        <TheadTr>
            <TheadTh>Název</TheadTh>
            <TheadTh>Hodnota</TheadTh>
        </TheadTr>
        </Thead>
        <Tbody>
            <TbodyTr v-for="([name, value], index) in Object.entries(data)" :key="index">
                <TbodyTd>{{ name }}</TbodyTd>
                <TbodyTd>{{ value }}</TbodyTd>
            </TbodyTr>
        </Tbody>
    </Table>
</template>

<style scoped>

</style>