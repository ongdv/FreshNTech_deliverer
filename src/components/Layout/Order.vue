<template>
    <div>
        <Head headname="주문화면" />
        <OrderList />
        <OrderDate />
        <OrderAddress />
        <OrderRequest />
        
        <OrderSubmit />
    </div>
</template>

<script>
    import {
        Head,
        OrderList,
        OrderItemList,
        OrderDate,
        OrderAddress,
        OrderRequest,
        OrderPayment,
        OrderSubmit
    } from '../Component'
    export default {
        name: 'Order',
        components: {
            Head,
            OrderList,
            OrderDate,
            OrderAddress,
            OrderRequest,
            OrderPayment,
            OrderSubmit
        }
    }
</script>

<style scoped>

</style>