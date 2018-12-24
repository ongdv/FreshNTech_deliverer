<template>
    <div>
        <Head headname="배송내역" />
        <HistoryCondition />
        <OrderHistoryList />
    </div>
</template>

<script>
    import {
        Head,
        HistoryCondition,
        OrderHistoryList
    } from '../Component'
    export default {
        name: 'OrderHistory',
        components: {
            Head,
            HistoryCondition,
            OrderHistoryList
        }
    }
</script>

<style scoped>

</style>