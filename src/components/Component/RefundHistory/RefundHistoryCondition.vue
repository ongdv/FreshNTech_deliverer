<template>
    <div>
        <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                            <div style="font-size: 1.1em;font-weight:bold;text-align:center;width:100%" v-on:change="filterHistory()">
                                <select class="form-control" style="width:45%;display:inline-block;" v-model="historyDate">
                                    <option value="7">지난 7일</option>
                                    <option value="30">지난 30일</option>
                                    <option value="365">지난 1년</option>
                                </select>
                                <select class="form-control" style="width:45%;display:inline-block;" v-model="condition">
                                    <option value="전체">전체</option>
                                    <option value="반품대기">반품대기</option>
                                    <option value="반품완료">반품완료</option>
                                </select>
                            </div>
                    </b-list-group-item>
                </b-list-group>    
            </div>
    </div>
</template>

<script>
    var baseurl = "http://freshntech.cafe24.com"
    export default {
        name: 'RefundHistoryCondition',
        data() {
            return {
                historyDate: '7',
                condition: '전체',
            }
        },
        methods: {
            getHistory(){
                this.$http.get(baseurl + '/order/getRefund/' + this.store.state.customer.id + '?condition=' + this.historyDate)
                .then((res) => {
                    console.log(res);
                    var list = [];
                    if(this.condition === "전체"){
                        this.store.state.requestHistory = res.data;
                        this.$forceUpdate();
                        return;
                    }else{
                        for(var i=0; i<res.data.length; i++){
                            list = res.data.filter((item) => {
                                return item.orderstate === this.condition;
                            });
                        }
                    }
                    this.store.state.requestHistory = list;
                    this.$forceUpdate();
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            filterHistory() {
                this.getHistory();
            }
        },
        created() {
            this.getHistory();
        },
    }
</script>

<style scoped>

</style>