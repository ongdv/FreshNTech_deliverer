<template>
    <div>
        <Head headname="상품추가"/>
        <SearchCondition v-on:getGoods="getGoods"/>
        <AddGoodsList />
    </div>
</template>

<script>
    var baseurl = "http://freshntech.cafe24.com"
    import {
        addOrderHead,
        SearchCondition,
        AddGoodsList
    } from '../Component'
    export default {
        name: 'AddGoods',
        components: {
            Head: addOrderHead,
            SearchCondition,
            AddGoodsList
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