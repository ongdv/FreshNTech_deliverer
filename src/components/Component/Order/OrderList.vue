<template>
    <div>
        <div class="w-100 bg-light" style="height:50px;line-height:50px">
            <h5 style="margin-left:10px;line-height:50px;" class="font-weight-bold"> 주문상품</h5>
            <div class="position-absolute text-center" style="right:5px;top:40px" >
                <router-link to="/addGoods">
                    <img src="@/assets/Add.png" alt="" width="80" class="text-center">
                </router-link>
            </div>
        </div>
        <OrderItemList />        
    </div>
</template>

<script>
    import OrderItemList from './OrderItemList.vue';
    var baseurl = "http://freshntech.cafe24.com";
    export default {
        name: "OrderList",
        components: {
            OrderItemList
        }
    }
</script>

<style scoped>
    
</style>