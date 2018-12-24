<template>
    <div>
        <Head headname="전체배송내역"/>
        <TotalHistoryCondition />
        <TotalHistoryList />
    </div>
</template>

<script>
    import {
        Head,
        TotalHistoryCondition,
        TotalHistoryList
    } from '../Component'
    export default {
        name: 'TotalHistory',
        components: {
            Head,
            TotalHistoryCondition,
            TotalHistoryList
        }
    }
</script>

<style scoped>

</style>