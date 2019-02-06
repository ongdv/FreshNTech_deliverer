<template>
    <div>
        <b-list-group flush style="overflow:scroll;height:710px;">
                <b-list-group-item v-for="(item, index) in this.store.state.orderHistory" :key="index">
                    <div>
                        <b-btn v-b-modal="`modal${index}`" class="bg-transparent text-dark border-0 w-100"
                        
                        v-on:click="getDetail(item.id)">
                            <div style="width:75%;height:100%;float:left;text-align:left;">
                                {{item.orderdate}} <span style="font-weight:bold">{{item.customerBname}}</span>
                                <br>
                                <span style="width:65%;color:rgba(190,190,190,0.7);">주문금액 {{nwc(item.amount)}} 원</span>
                            </div>
                            <div style="width:25%;float:right;">
                                <span style="font-weight:bold;" v-bind:style="{ color: styleColor(item.orderstate)}">{{item.orderstate}}</span>
                            </div>
                        </b-btn>
                        <b-modal :id="`modal${index}`" :title="'배송상세보기'"
                                 :ok-only="true"
                                 :ok-title="'닫기'"
                                 :modal-ok="true"
                                 :header-bg-variant="'success'"
                                 :header-text-variant="'white'"
                                 v-on:ok="closeModal()"
                        >
                            <div class="w-100 bg-light" style="margin-top:10px;">
                                <b-list-group class="border-0">
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        {{item.orderdate}}  <span style="font-weight:bold">{{item.customerBname}}</span><br>
                                        {{item.id}}
                                    </b-list-group-item>
                                    <b-list-group-item v-for="(detailItem, index) in orderDetail" v-bind:key="index">
                                        <div style="width:10%;float:left;height:100%;text-align:left;">
                                               <b-form-checkbox v-model="detailItem.check" @change="addList(index);">
                                                </b-form-checkbox>     
                                           </div>
                                           <div style="width:60%;height:100%;float:left;">
                                               <span style="font-weight:bold;">[{{detailItem.item.manufacturer}}] {{detailItem.item.itemName}}</span><br>
                                               <span style="font-size:0.9em;color:rgba(190,190,190,0.7);">
                                                   {{detailItem.item.origin}} | {{detailItem.item.unit}}
                                               </span>
                                               
                                           </div>
                                           <div style="width:5%;height:100%;float:left;font-weight:bold;">
                                               {{detailItem.orderitem.qty}}
                                           </div>
                                           <div style="width:20%;height:100%;float:right;font-weight:bold;color:green;" >
                                               {{detailItem.orderitem.state}}
                                           </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        <div class="w-100">
                                            <span style="width:65%;float:left;font-weight:bold;">총 배송수량</span>
                                            <span style="float:right;font-weight:bold;">{{nwc(detailQty)}} 개</span>
                                        </div>
                                        <div class="w-100">
                                            <span style="width:65%;float:left;font-weight:bold;">총 반품수량</span>
                                            <span style="float:right;font-weight:bold;">{{nwc(calRefundTotal())}} 개</span>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        <div class="w-100 text-center">
                                            <b-button class="btn border-0 w-100" style="background:rgb(31, 161, 133);" @click="reqSuccess(item.id)">반품하기</b-button>
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
                switch(idx){
                    case '배송예정':
                        return 'black';
                        break;
                    case '배송준비':
                        return 'red';
                        break;
                    case '배송중':
                        return 'blue';
                        break;
                    case '배송완료':
                        return 'green';
                        break;
                    case '주문접수':
                        return 'red';
                        break;
                    case '주문취소':
                        return 'lightgray';
                        break;
                    case '주문완료':
                        return 'lightgreen';
                        break;
                    case '출고거절':
                        return 'pink';
                        break;
                    case '결제대기':
                        return 'purple';
                        break;
                }
            },
            getDetail(id){
                console.log(id);
                this.$http.get(baseurl + '/orderdetail/' + id)
                .then((res) => {
                    this.orderDetail = res.data;
                    this.detailTotal=0;
                    this.detailQty=0;
                    for(var i=0; i<this.orderDetail.length; i++){
                        this.detailQty+=Number(this.orderDetail[i].orderitem.qty);
                        this.orderDetail.check = false;
                    }
                    console.log(this.orderDetail);
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            addList(idx){
                if(this.orderDetail[idx].check){
                    this.orderDetail[idx].check = false;
                }else{
                    this.orderDetail[idx].check = true;
                }
                this.$forceUpdate();
            },
            calRefundTotal(){
                var qty= 0;
                for(var i=0; i < this.orderDetail.length; i++){
                    if(this.orderDetail[i].check === true){
                        qty+=this.orderDetail[i].orderitem.qty
                    }
                }
                return qty;
            },
            reqSuccess(id) {
                var test = [];
                var orderState ="";
                for(var i=0; i < this.orderDetail.length; i++){
                    if(this.orderDetail[i].check === true){
                        test.push({orderItemId: this.orderDetail[i].orderitem.id, orderItemState: '반품완료'})
                    }
                }
                
                var postData = {
                    orderItemList: test,
                    orderId: id,
                    orderState: "반품완료"
                }

                this.$http.put(baseurl + '/orderdetail', postData)
                .then((res) => {
                    if(res.data === true){
                        alert('배송완료 처리되었습니다.');
                        this.$router.push('/')
                    }
                })
            },
            
            closeModal(){
                    this.detailTotal=0;
                    this.detailQty=0;
                    this.orderDetail = "";
            }
        },
        created() {
            console.log(this.styleColor[0]);
        },
    }
</script>

<style scoped>

</style>