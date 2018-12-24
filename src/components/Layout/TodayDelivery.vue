<template>
    <div>
        <Head headname="당일배송"/>
        <TodayHistoryCondition />
        <TodayHistoryList />
    </div>
</template>

<script>
    import {
        Head,
        TodayHistoryCondition,
        TodayHistoryList
    } from '../Component/'
    export default {
        name: 'TodayDelivery',
        components: {
            Head,
            TodayHistoryCondition,
            TodayHistoryList
        }
    }
</script>

<style scoped>

</style>