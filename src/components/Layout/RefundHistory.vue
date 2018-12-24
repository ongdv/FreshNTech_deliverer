<template>
    <div>
        <Head headname="취소/반품 내역" />
        <RefundHistoryCondition />
        <RefundHistoryList />
    </div>
</template>

<script>
    import {
        Head,
        RefundHistoryCondition,
        RefundHistoryList
    } from '../Component'
    export default {
        name: 'RefundHistory',
        components: {
            Head,
            RefundHistoryCondition,
            RefundHistoryList
        }
    }
</script>

<style scoped>

</style>