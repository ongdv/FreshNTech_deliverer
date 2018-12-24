<template>
    <div>
        <Head headname="즐겨찾기 추가" />
        <FavoriteSearchCondition v-on:getGoods="getGoods"/>
        <AddFavoriteList />
    </div>
</template>

<script>
    var baseurl = "http://freshntech.cafe24.com"

    import {
        FavoriteHead,
        FavoriteSearchCondition,
        AddFavoriteList
    } from '../Component';
    export default {
        name: 'AddFavorite',
        components: {
            Head : FavoriteHead,
            FavoriteSearchCondition,
            AddFavoriteList
        },
        data() {
            return {
                searchName: ''
            }
        },
        methods: {
            getGoods(name) {
                this.$http.get(baseurl + '/item/customersearch?keyword=' + name)
                .then((res) => {
                    this.store.state.goodsList = res.data;
                    this.store.state.goodsList.forEach(element => {
                        element.qty = 1;
                        element.amount = element.price1 * element.qty;
                        element.check= false
                    })
                }
                )
                .catch((err) => {
                    console.log(err);
                })
            }
        },
        created(){
            this.getGoods(this.searchName);
        }
    }
</script>

<style scoped>

</style>