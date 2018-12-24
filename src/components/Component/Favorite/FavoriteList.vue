<template>
    <div>
        <div class="w-100 bg-light" style="height:50px;line-height:50px">
            <h5 style="margin-left:10px;line-height:50px;" class="font-weight-bold"> 즐겨찾기 목록</h5>
            <div class="position-absolute text-center" style="right:5px;top:40px" >
                <router-link to="/addFavorite">
                    <img src="@/assets/Add.png" alt="" width="80" class="text-center">
                </router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'FavoriteList',
    }
</script>

<style scoped>

</style>