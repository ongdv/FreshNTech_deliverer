<template>
    <div>
        <div style="position:fixed;top:25%;">
            <img src="@/assets/maingrid.png" alt="" v-bind:width="getwidth" style="">
            <router-link to="todayDelivery" style="position:absolute;width:33%;height:30%;top:3%;">
            </router-link>
            <router-link to="totalHistory" style="position:absolute;width:33%;height:30%;top:3%;left:33.5%">
            </router-link>
            <router-link to="#" style="position:absolute;width:33%;height:30%;top:3%;left:67.5%">
            </router-link>
            <router-link to="orderHistory" style="position:absolute;width:33%;height:30%;top:35%;left:17%">
            </router-link>
            <router-link to="favorite" style="position:absolute;width:33%;height:30%;top:35%;left:51%">
            </router-link>
            <router-link to="refundHistory" style="position:absolute;width:33%;height:30%;top:65.5%;">
            </router-link>
            <router-link to="statistics" style="position:absolute;width:33%;height:30%;top:65.5%;left:33.5%">
            </router-link>
            <router-link to="setting" style="position:absolute;width:33%;height:30%;top:65.5%;left:67.5%">
            </router-link>
        </div>
        <div style="width:100%;height:350px;">
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainGrid",
        data() {
            return{
                getwidth:window.innerWidth
            }
        }
    }
</script>

<style scoped>
    
</style>