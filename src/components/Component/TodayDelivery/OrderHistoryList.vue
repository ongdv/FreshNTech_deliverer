<template>
    <div>
        <b-list-group flush style="overflow:scroll;height:680px;">
                <b-list-group-item v-for="(item, index) in this.store.state.orderHistory" :key="index">
                    <div>
                        <b-btn v-b-modal="`modal${index}`" class="bg-transparent text-dark border-0 w-100"
                        v-on:click="getDetail(item.id)">
                            <div style="width:75%;height:100%;float:left;text-align:left;font-weight:bold">
                                {{item.customerBname}}
                                <br>
                                <span style="width:65%;font-weight:normal;">{{item.address1 + item.address2}}</span>
                            </div>
                            <div style="width:25%;float:right;">
                                <span style="font-weight:bold;" v-bind:style="{color: styleColor(item.orderstate)}">{{item.orderstate}}</span>
                            </div>
                        </b-btn>
                        <b-modal :id="`modal${index}`" :title="'배송정보상세보기'"
                                 :ok-title="'닫기'"
                                 :modal-ok="true"
                                 :header-bg-variant="'success'"
                                 :header-text-variant="'white'"
                                 :ok-only="true">
                            <div class="w-100 bg-light" style="margin-top:10px;">
                                <b-list-group class="border-0">
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        {{item.orderdate}}({{item.id}})<br>
                                         {{item.customerBname}}
                                    </b-list-group-item>
                                    <b-list-group-item v-for="(detailItem, index) in orderDetail" v-bind:key="index">
                                           <div style="width:10%;float:left;height:100%;text-align:center;">
                                                <b-form-checkbox v-model="detailItem.check" @change="addList(index);">
                                                </b-form-checkbox>     
                                           </div>
                                           <div style="width:60%;height:100%;float:left;text-align:left;">
                                               <span style="font-weight:bold;">[{{detailItem.item.manufacturer}}] {{detailItem.item.itemName}}</span><br>
                                               <span style="font-size:0.9em;color:rgba(190,190,190,0.7);">
                                                   {{detailItem.item.origin}} | {{detailItem.item.unit}}
                                               </span>
                                           </div>
                                           <div style="width:10%;height:100%;float:left;font-weight:bold;">
                                               {{detailItem.orderitem.qty}}
                                           </div>
                                           <div style="width:20%;height:100%;float:right;font-weight:bold;" >
                                               <span v-bind:style="{ color: styleColor(detailItem.orderitem.state)}">{{detailItem.orderitem.state}}</span>
                                           </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        <div>
                                            <b-form-textarea id="textarea1"
                                                v-model="detailText"
                                                placeholder="비고란"
                                                :rows="3"
                                                :max-rows="6">
                                            </b-form-textarea>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        <div class="w-100">
                                            <span style="width:65%;float:left;font-weight:bold;">총 주문수량</span>
                                            <span style="float:right;font-weight:bold;">{{nwc(detailQty)}} 개</span>
                                        </div>
                                        <div class="w-100">
                                            <span style="width:65%;float:left;font-weight:bold;">총 배송수량</span>
                                            <span style="float:right;font-weight:bold;">{{nwc(calRefundTotal())}} 개</span>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="border-0 bg-light" style="font-weight:bold;">
                                        <div class="w-100 text-center">
                                            <b-button class="btn border-0" style="background:lightgray;" @click="reqFailure(item.id)">배송보류</b-button>
                                            <b-button class="btn border-0" style="background:rgb(31, 161, 133);" @click="reqSuccess(item.id)">배송완료</b-button>
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>    
                            </div>   
                        </b-modal>
                    </div>
            </b-list-group-item>
        </b-list-group>
        <div class="text-center">
            <b-button class="btn border-0" style="width:90%;background:rgb(31, 161, 133);" to="mapView">지도보기</b-button>
        </div>
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    export default {
        name: 'OrderHistoryList',
        data () {
            return {
                orderDetail: '',
                detailTotal: 0,
                detailQty: 0,
                detailText: ''
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
                    case '배송보류':
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
                        test.push({orderItemId: this.orderDetail[i].orderitem.id, orderItemState: '배송완료'})
                    }
                }
                if(test.length === 0){
                    alert('선택된 물품이 없습니다.')
                    return;
                }
                var t = test.filter((item) => {
                    return item.orderstate === "배송보류";
                })
                if(t.length !== 0){
                    orderState = "배송보류"
                }else if(this.orderDetail.length > test.length){
                    orderState = "배송중"
                }else{
                    orderState = "배송완료"
                }
                var postData = {
                    orderItemList: test,
                    orderId: id,
                    orderState: orderState
                }
                console.log(postData);
                this.$http.put(baseurl + '/orderdetail', postData)
                .then((res) => {
                    if(res.data === true){
                        alert('배송완료 처리되었습니다.');
                        this.$router.push('/')
                    }
                })
            },
            reqFailure(id) {
                var test = [];
                for(var i=0; i < this.orderDetail.length; i++){
                    if(this.orderDetail[i].check === true){
                        test.push({orderItemId: this.orderDetail[i].orderitem.id, orderItemState: '배송보류'})
                    }
                }
                console.log(test);

                if(test.length === 0){
                    alert('선택된 물품이 없습니다.')
                    return;
                }
                var postData = {
                    orderItemList: test,
                    orderId: id,
                    orderState: "배송보류"
                }
                this.$http.put(baseurl + '/orderdetail', postData)
                .then((res) => {
                    if(res.data === true){
                        alert('배송보류 처리되었습니다.');
                        this.$router.push('/')
                    }
                })
                .catch((res) => {
                    console.log(res);
                })         
            }
            
        },
        created() {
            
        },
    }
</script>

<style scoped>

</style>