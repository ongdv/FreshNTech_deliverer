<template>
    <div>
        <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                            <div style="font-size: 1.1em;font-weight:bold;text-align:center;width:100%" v-on:change="filterHistory()">
                                <select class="form-control" style="width:90%;display:inline-block;text-align:center;" v-model="historyDate">
                                    <option value="전체">전체</option>
                                    <template v-for="(item, index) in dateList">
                                        <option :value="item" v-bind:key="index">{{item}}</option>
                                    </template>
                                    
                                </select>
                            </div>
                    </b-list-group-item>
                </b-list-group>    
            </div>
    </div>
</template>

<script>
    var baseurl = "http://freshntech.cafe24.com";
    var d= new Date();
    export default {
        name: 'HistoryCondition',
        data() {
            return {
                historyDate: "전체",
                dateList: []
            }
        },
        methods: {
            getHistory(){
                this.$http.get(baseurl + '/order/getDelivererOrder/' + this.store.state.customer.id + "?condition=9999")
                .then((res) => {
                    console.log(res);
                    var list = [];
                    var date = [];
                    for(var i=0; i<res.data.length; i++){
                        date.push(res.data[i].orderdate)
                    }
                    this.dateList = [...new Set(date)];
                    if(this.historyDate === '전체'){
                        list = res.data;
                    }else{
                        for(var i=0; i<res.data.length; i++){
                            list = res.data.filter((item) => {
                                return item.orderdate === this.historyDate;
                            });
                        }
                    }
                    
                    this.store.state.orderHistory = list;
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