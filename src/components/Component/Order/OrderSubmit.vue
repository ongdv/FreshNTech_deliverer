<template>
    <div>
                <div>
            <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                        <span>
                            <span style="font-size: 1.1em;font-weight:bold;">
                                결제수단 선택
                            </span>
                            <br>
                            <label for="card"><input checked type="radio" name="payMethod" id="card" value="신용카드" v-model="payMethod" >신용카드</label>
                            <label for="account"><input type="radio" name="payMethod" id="account" value="계좌이체" v-model="payMethod" >계좌이체</label>
                        </span>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
        <div>
            <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                        <div class="w-100">
                            <span style="width:65%;float:left;font-weight:bold;font-size:1.2em;">총 주문금액</span>
                            <span style="float:right;font-weight:bold;font-size:1.2em;color:#18A384;">{{nwc(this.store.state.orderTotal)}} 원</span>
                        </div>        
                        <div class="w-100 " style="text-align:center;margin-top:10%;">
                            <b-button style="width:48%;background-color:white;color:gray;font-size:1.2em;" v-on:click="cancelOrder">주문취소</b-button>
                            <b-button style="width:48%;background-color:#1FA185;font-size:1.2em;" class="border-0" v-on:click="submitOrder">주문하기</b-button>
                        </div>
                    </b-list-group-item>
                </b-list-group>    
            </div>
        </div>
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    export default {
        name: 'OrderSubmit',
        data() {
            return{
                payMethod: '신용카드'
            }
        },
        methods: {
            nwc(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            cancelOrder() {
                var a = confirm("주문 목록이 초기화됩니다.")
                if(a == 1){
                    this.store.state.orderList = "";
                    this.store.state.orderTotal = "";
                    this.store.state.orderQty = "";
                    this.$router.push('/');
                }
            },
            submitOrder() {
                var order = {
                    orderItemList: this.store.state.orderList,
                    userId: this.store.state.customer.id,
                    reqDate: this.store.state.deliveryDate,
                    amount: this.store.state.orderTotal,
                    point: 0,
                    payMethod: this.payMethod,
                    requests: this.store.state.orderRequest
                }
                console.log(order);
                this.$http.post(baseurl + '/order/insert', order)
                .then((res) => {
                    console.log(res);
                    alert('주문이 완료되었습니다.');
                    this.store.state.orderList = "";
                    this.store.state.orderTotal = "";
                    this.store.state.orderRequest = "배송 및 상품에 대한 추가 요청사항 입력";
                    this.store.state.orderQty = "";
                    this.$router.push('/');
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>