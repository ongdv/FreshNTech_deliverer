<template>
    <div>
        <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                            <div style="font-size: 1.1em;font-weight:bold;text-align:center;width:100%">
                                {{this.today}}
                            </div>
                    </b-list-group-item>
                </b-list-group>    
            </div>
    </div>
</template>

<script>
    var d = new Date();
    var baseurl = "http://freshntech.cafe24.com"
    export default {
        name: 'HistoryCondition',
        data() {
            return {
                historyDate: '0',
                condition: '전체',
                today : d.getFullYear() +"-" + (d.getMonth()+1) + "-" +d.getDate()
            }
        },
        methods: {
            getHistory(){
                this.$http.get(baseurl + '/order/getDelivererOrder/' + this.store.state.customer.id + '?condition=' + this.historyDate)
                .then((res) => {
                    console.log(res);
                    var list = [];
                    
                    for(var i=0; i<res.data.length; i++){
                        list = res.data.filter((item) => {
                            return  item.orderstate === "주문접수"||item.orderstate === "배송준비" || item.orderstate === "배송완료"|| item.orderstate === "배송중" || item.orderstate === "배송보류";
                        });
                    }
                    this.store.state.orderHistory = list;
                    console.log(this.store.state.orderHistory);
                    this.$forceUpdate();
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            filterHistory() {
                this.getHistory();
            },
            changeState() {
                var list =[];
                var detail= [];
                var state = "";
                var test = [];
                var postData = {};
                var id = "";
                this.$http.get(baseurl + '/order/getDelivererOrder/' + this.store.state.customer.id + '?condition=' + this.historyDate)
                .then((res) => {
                    list = res.data;
                    console.log(list);
                    for(var i=0; i < list.length; i++){
                        console.log(list[i]);
                        if(list[i].orderstate === "배송준비" || list[i].orderstate === "주문접수"){
                            state = "배송중";
                        }else{
                            state = list[i].orderstate;
                        }
                        id = list[i];
                        this.$http.get(baseurl + '/orderdetail/' + list[i].id)
                        .then((res) => {
                            detail = res.data;
                            for(var j=0; j < detail.length; j++){
                              if(detail[j].orderitem.state === "배송준비" || detail[j].orderitem.state === "주문접수"){
                                  console.log(j);
                                  test.push({orderItemId: detail[j].orderitem.id, orderItemState: "배송중"})
                              }
                            }
                            postData = {
                                orderItemList: test,
                                orderId: id,
                                orderState: state
                            }
                        })
                        .then(() => {
                            console.log(postData);
                            this.$http.put(baseurl + '/orderdetail', postData)
                            .then((res) => {
                                console.log(res);
                                test = [];
                                postData = {};
                                state=""
                            })
                        })
                        
                    }
                })
            }
        },
        
        created() {
            this.changeState();
            this.getHistory();
        },
    }
</script>

<style scoped>

</style>