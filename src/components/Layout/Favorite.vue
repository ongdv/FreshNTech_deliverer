<template>
    <div>
        <Head headname="즐겨찾기"/>
        <FavoriteList />
        <FavoriteItemList />
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    import {
        Head,
        FavoriteList,
        FavoriteItemList
    } from '../Component'
    export default {
        name: 'Favorite',
        components: {
            Head,
            FavoriteList,
            FavoriteItemList
        }
    }
</script>

<style scoped>

</style>