<template>
    <div>
        <b-list-group flush style="overflow:scroll; height:600px;">
            <b-list-group-item v-for="(item, index) in this.store.state.favorite" :key="index" >
                <div class="w-100">
                    [{{item.manufacturer}}] {{item.itemName}}
                </div>
                <div style="position:absolute;right:5%;top:10%;h-100;width:5%;text-align:center;" v-on:click="removeItem(index)">
                    x
                </div>
                <div class="w-100">
                    <span style="width:65%;color:rgba(190,190,190,0.7);float:left;">{{item.unit}} | {{item.origin}}</span>
                    <span style="float:right;font-size:1.2em;font-weight:bold;">{{nwc(item.price1)}} 원</span>
                </div>
            </b-list-group-item>
        </b-list-group>
        <b-list-group flush style="overflow:scroll; height:150px;" class="bg-light">
            <b-list-group-item class="bg-light">
                <div class="w-100">
                    <span style="width:65%;float:left;font-weight:bold;">총 주문수량</span>
                    <span style="float:right;font-weight:bold;">{{this.store.state.orderQty}} 개</span>
                </div>
                <div class="w-100">
                    <span style="width:65%;float:left;font-weight:bold;">총 상품금액</span>
                    <span style="float:right;font-weight:bold;font-size:1.2em;">{{nwc(this.store.state.orderTotal)}} 원</span>
                </div>
                <div class="w-100 " style="text-align:center;margin-top:10%;margin-top:15%;">
                            <b-button style="float:left;width:48%;background-color:white;color:gray;font-size:1.2em;" v-on:click="cancelFavorite">취소</b-button>
                            <b-button style="float:right;width:48%;background-color:#1FA185;font-size:1.2em;" class="border-0" v-on:click="submitFavorite">저장하기</b-button>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    export default {
        name: "FavoriteItemList",
        data () {
            return {
                totalQty:0,
                totalPrice:0,
                deleteItemList: [],
                customerItemList: []
            }
        },
        methods: {
            getFavorite(){
                if(this.store.state.favorite.length !== 0){
                    return;
                }
                this.$http.get(baseurl + "/customeritem/" + this.store.state.customer.id)
                .then((res) => {
                    this.store.state.favorite = res.data.customerItemList;
                    this.store.state.favorite.forEach(element => {
                        element.qty = 1;
                        element.amount = element.price1 * element.qty;
                        this.$forceUpdate();
                        this.getTotalQty();
                        this.getTotalPrice();
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            nwc(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            getTotalQty(){
                var sum = 0;
                for(var i=0; i < this.store.state.favorite.length; i++){
                    sum +=this.store.state.favorite[i].qty;
                }
                this.store.state.orderQty = sum;
                this.$forceUpdate();
            },
            getTotalPrice(){
                var sum = 0;
                for(var i=0; i < this.store.state.favorite.length; i++){
                    sum = sum + this.store.state.favorite[i].qty * this.store.state.favorite[i].price1;
                }
                this.store.state.orderTotal = sum;
                this.$forceUpdate();
            },
            removeItem(idx){
                var r= confirm('즐겨찾기 목록에서 제거합니다.');
                if(r == 1){
                    this.store.state.favoriteDelete.push({tbItem_ID: this.store.state.favorite[idx].id})
                    this.store.state.favorite.splice(idx, 1);
                    console.log(this.store.state.favoriteDelete);
                    this.$forceUpdate();
                    this.getTotalQty();
                    this.getTotalPrice();
                }
            },
            cancelFavorite () {
                this.store.state.favorite = "";
                this.$forceUpdate();
                this.$router.push('/');
            },
            submitFavorite() {
                var r= confirm('즐겨잧기 목록을 수정합니다');
                if(r == 1){
                    
                    var postData = {
                        customerItemList: this.store.state.favoriteInsert,
                        tbCustomer_ID: this.store.state.customer.id
                    };
                    var deleteData = {
                        customerItemList: this.store.state.favoriteDelete,
                        tbCustomer_ID: this.store.state.customer.id
                    };
                    console.log(postData);
                    this.$http.post(baseurl + '/insertcustomeritem', postData)
                    .then((res) => {
                        console.log(res);
                        alert('즐겨찾기 목록이 수정되었습니다.');
                        this.store.state.favoriteInsert="";
                        this.store.state.favoriteDelete="";
                        this.store.state.favorite="";
                        this.$router.push('/');                            
                        // this.$http.delete(baseurl + '/deletecustomeritem', deleteData)
                        // .then((res) => {
                        //     console.log(res);
                            
                        // })
                        // .catch((err) => {
                        //     console.log(err);
                        // })
                    })
                    
                }
            }

        },
        created() {
            this.getFavorite();
            this.getTotalQty();
            this.getTotalPrice();
        }
    }
</script>

<style scoped>

</style>