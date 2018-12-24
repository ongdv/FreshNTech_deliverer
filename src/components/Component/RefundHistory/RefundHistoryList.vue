<template>
    <div>
        <b-list-group flush style="overflow:scroll;height:710px;">
                <b-list-group-item v-for="(item, index) in this.store.state.requestHistory" :key="index">
                    <div>
                        <b-btn v-b-modal="`modal${index}`" class="bg-transparent text-dark border-0 w-100"
                        
                        v-on:click="getDetail(item.id)">
                            <div style="width:75%;height:100%;float:left;text-align:left;">
                                <span style="width:65%;font-weight:bold;">반품금액 {{nwc(item.amount)}} 원</span>
                                <br>
                                <span style="color:rgba(190,190,190,0.7);">반품 접수일 {{item.regdate}}</span>
                                <br>
                                <span style="color:rgba(190,190,190,0.7);">주문번호 {{item.id}}</span>
                            </div>
                            <div style="width:25%;float:right;">
                                <span style="font-weight:bold;" v-bind:style="{ color: styleColor(item.orderstate)}">{{item.orderstate}}</span>
                            </div>
                        </b-btn>
                        <b-modal :id="`modal${index}`" :title="'반품상세보기'"
                                 :ok-title="'닫기'"
                                 :ok-only="true"
                                 :modal-ok="true"
                                 :header-bg-variant="'success'"
                                 :header-text-variant="'white'"
                        >
                            <div class="w-100 bg-light" style="margin-top:10px;">
                                <b-list-group class="border-0">
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        {{item.regdate}}<br>
                                        {{item.id}}
                                    </b-list-group-item>
                                    <b-list-group-item v-for="(detailItem, index) in orderDetail" v-bind:key="index">
                                           <div style="width:60%;height:100%;float:left;">
                                               <span style="font-weight:bold;">[{{detailItem.item.manufacturer}}] {{detailItem.item.itemName}}</span><br>
                                               <span style="font-size:0.9em;color:rgba(190,190,190,0.7);">
                                                   {{detailItem.item.origin}} | {{detailItem.item.unit}}
                                               </span>
                                               
                                           </div>
                                           <div style="width:5%;height:100%;float:left;font-weight:bold;">
                                               {{detailItem.orderitem.qty}}
                                           </div>
                                           <div style="width:35%;float:right;height:100%;text-align:right;">
                                               {{nwc(detailItem.orderitem.price)}} 원<br>
                                               <span style="font-weight:bold;">{{nwc(detailItem.orderitem.amount)}} 원</span>
                                           </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        <div class="w-100">
                                            <span style="width:65%;float:left;font-weight:bold;">총 주문수량</span>
                                            <span style="float:right;font-weight:bold;">{{nwc(detailQty)}} 개</span>
                                        </div>
                                        <div class="w-100">
                                            <span style="width:65%;float:left;font-weight:bold;">총 상품금액</span>
                                            <span style="float:right;font-weight:bold;font-size:1.2em;">{{nwc(detailTotal)}} 원</span>
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>    
                            </div>   
                        </b-modal>
                    </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    export default {
        name: 'RefundHistoryList',
        data () {
            return {
                orderDetail: '',
                detailTotal: 0,
                detailQty: 0,
            }
        },
        methods: {
            nwc(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            styleColor(idx) {
                console.log(idx);
                switch(idx){
                    case '반품대기':
                        return 'red';
                        break;
                    case '반품완료':
                        return 'green';
                        break;
                }
            },
            getDetail(id){
                console.log(id);
                this.$http.get(baseurl + '/orderdetail/' + id)
                .then((res) => {
                    console.log(res);
                    this.orderDetail = res.data;
                    this.detailTotal=0;
                    this.detailQty=0;
                    for(var i=0; i<this.orderDetail.length; i++){
                        this.detailTotal+=Number(this.orderDetail[i].orderitem.amount);
                        this.detailQty+=Number(this.orderDetail[i].orderitem.qty);
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            cancelOrder(id){
                var a = confirm('주문을 정말 취소하시겠습니까?');
                if(a == 1){
                    this.$http.put(baseurl + '/order/cancelOrder/' + id)
                    .then((res) => {
                        alert('주문을 취소했습니다.');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            }
        },
        created() {
            console.log(this.styleColor[0]);
        },
    }
</script>

<style scoped>

</style>