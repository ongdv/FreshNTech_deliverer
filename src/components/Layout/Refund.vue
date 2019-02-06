<template>
    <div>
        <Head headname="반품하기" />
        <RefundCondition />
        <RefundList />
    </div>
</template>

<script>
    import {
        Head,
        RefundCondition,
        RefundList
    } from '../Component';
    export default {
        name: 'Refund',
        components: {
            Head,
            RefundCondition,
            RefundList
        }
    }
</script>

<style scoped>

</style>