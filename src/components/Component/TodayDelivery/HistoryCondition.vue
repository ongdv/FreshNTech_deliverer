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
                            return item.orderstate === "배송준비" || item.orderstate === "배송완료"|| item.orderstate === "배송중";
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
            }
        },
        created() {
            this.getHistory();
        },
    }
</script>

<style scoped>

</style>