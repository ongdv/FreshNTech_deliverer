<template>
    <div>
        <b-list-group flush style="overflow:scroll; height:200px;">
            <b-list-group-item v-for="(item, index) in this.store.state.orderList" :key="index">
                <div class="w-100">
                    [{{item.manufacturer}}] {{item.itemName}}
                </div>
                <div style="position:absolute;right:5%;top:10%;h-100;width:5%;text-align:center;" v-on:click="removeItem(index)">
                    x
                </div>
                <div class="w-100">
                    <span style="width:65%;color:rgba(190,190,190,0.7);float:left;">{{item.unit}} | {{item.origin}}</span>
                    <span style="float:right;font-weight:bold;">{{nwc(item.price1)}} 원</span>
                </div>
                <div class="w-100">
                    <b-button-group size="sm">
                        <b-button v-on:click="decrementQty(index)">-</b-button>
                        <b-button disabled>{{item.qty}}</b-button>
                        <b-button v-on:click="incrementQty(index)">+</b-button>
                    </b-button-group>
                    <span style="float:right;font-size:1.2em;font-weight:bold;">{{nwc(item.qty * item.price1)}} 원</span>
                </div>
            </b-list-group-item>
        </b-list-group>
        <b-list-group flush style="overflow:scroll; height:80px;" class="bg-light">
            <b-list-group-item class="bg-light">
                <div class="w-100">
                    <span style="width:65%;float:left;font-weight:bold;">총 주문수량</span>
                    <span style="float:right;font-weight:bold;">{{this.store.state.orderQty}} 개</span>
                </div>
                <div class="w-100">
                    <span style="width:65%;float:left;font-weight:bold;">총 상품금액</span>
                    <span style="float:right;font-weight:bold;font-size:1.2em;">{{nwc(this.store.state.orderTotal)}} 원</span>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    export default {
        name: "OrderItemList",
        data () {
            return {
                totalQty:0,
                totalPrice:0,
            }
        },
        methods: {
            getFavorite(){
                if(this.store.state.orderList.length !== 0){
                    return;
                }
                this.$http.get(baseurl + "/customeritem/" + this.store.state.customer.id)
                .then((res) => {
                    this.store.state.userAddress = res.data.userAddress;
                    this.store.state.orderList = res.data.customerItemList;
                    this.store.state.orderList.forEach(element => {
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
            incrementQty(idx){
                if(this.store.state.orderList[idx].qty >= this.store.state.orderList[idx].itemQty){
                    alert('주문수량 초과입니다.');
                    return;
                }
                this.store.state.orderList[idx].qty++;
                this.store.state.orderList[idx].amount = this.store.state.orderList[idx].qty * this.store.state.orderList[idx].price1;
                this.getTotalQty();
                this.getTotalPrice();
                this.$forceUpdate()
            },
            decrementQty(idx){
                if(this.store.state.orderList[idx].qty <= 1){
                    alert('1개 미만은 주문할 수 없습니다.');
                    return;
                }
                this.store.state.orderList[idx].qty--;
                this.store.state.orderList[idx].amount = this.store.state.orderList[idx].qty * this.store.state.orderList[idx].price1;
                this.getTotalQty();
                this.getTotalPrice();
                this.$forceUpdate()
            },
            nwc(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            getTotalQty(){
                var sum = 0;
                for(var i=0; i < this.store.state.orderList.length; i++){
                    sum +=this.store.state.orderList[i].qty;
                }
                this.store.state.orderQty = sum;
                this.$forceUpdate();
            },
            getTotalPrice(){
                var sum = 0;
                for(var i=0; i < this.store.state.orderList.length; i++){
                    sum = sum + this.store.state.orderList[i].qty * this.store.state.orderList[i].price1;
                }
                this.store.state.orderTotal = sum;
                this.$forceUpdate();
            },
            removeItem(idx){
                var r= confirm('주문 목록에서 제거합니다.');
                if(r == 1){
                    this.store.state.orderList.splice(idx, 1);
                    this.$forceUpdate();
                    this.getTotalQty();
                    this.getTotalPrice();
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