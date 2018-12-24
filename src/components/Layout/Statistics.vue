<template>
    <div>
        <Head headname="통계" />
        <StatisticsStringCondition  v-on:getStatistics="getStatistics" v-on:getStatisticsWithDate="getStatisticsWithDate"/>
        <StatisticsList />
        <StatisticsItemList :orderBy=orderBy v-on:changeOrderBy="changeOrderBy" />
    </div>
</template>

<script>
    var baseurl = "http://freshntech.cafe24.com"
    import {
        Head,
        StatisticsStringCondition,
        StatisticsDateCondition,
        StatisticsList,
        StatisticsItemList
    } from '../Component'
    export default {
        name: 'Statistics',
        components: {
            Head,
            StatisticsStringCondition,
            StatisticsDateCondition,
            StatisticsList,
            StatisticsItemList
        },
        data () {
            return {
                orderBy: 'desc'
            }
        },
        methods: {
            getStatistics(date) {
                console.log(date);
                this.$http.get(baseurl + '/order/statistics/' + this.store.state.customer.id + '?condition=' + date)
                .then((res) => {
                    this.store.state.statistics = res.data;
                    for(var i =0; i < this.store.state.statistics.orderItemStatics.length; i++){
                        this.store.state.statistics.orderItemStatics[i].itemName = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].itemName);
                        this.store.state.statistics.orderItemStatics[i].mainProvier = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].mainProvier);
                        this.store.state.statistics.orderItemStatics[i].origin = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].origin);
                        this.store.state.statistics.orderItemStatics[i].unit = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].unit);
                    }
                    this.store.state.statistics.orderStatics.total_orderNumber = res.data.orderStatics.total_orderNumber;
                    this.store.state.statistics.orderStatics.total_payment = res.data.orderStatics.total_payment;
                    this.store.state.statistics.orderStatics.total_quantity = res.data.orderStatics.total_quantity;
                    this.orderBy = 'desc';
                    console.log(this.store.state.statistics);
                })
                .catch((err) => {
                    console.log(err)
                })
            },
            getStatisticsWithDate(conDate){
                console.log(conDate);
                this.$http.get(baseurl + '/order/statistics/' + this.store.state.customer.id + '?startDate=' + conDate.startDate + "&endDate=" + conDate.endDate)
                .then((res) => {
                    this.store.state.statistics = res.data;
                    for(var i =0; i < this.store.state.statistics.orderItemStatics.length; i++){
                        this.store.state.statistics.orderItemStatics[i].itemName = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].itemName);
                        this.store.state.statistics.orderItemStatics[i].mainProvier = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].mainProvier);
                        this.store.state.statistics.orderItemStatics[i].origin = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].origin);
                        this.store.state.statistics.orderItemStatics[i].unit = this.b64DecodeUnicode(this.store.state.statistics.orderItemStatics[i].unit);
                    }
                    this.store.state.statistics.orderStatics.total_orderNumber = res.data.orderStatics.total_orderNumber;
                    this.store.state.statistics.orderStatics.total_payment = res.data.orderStatics.total_payment;
                    this.store.state.statistics.orderStatics.total_quantity = res.data.orderStatics.total_quantity;
                    this.orderBy = 'desc';
                    console.log(this.store.state.statistics);
                })
            },
            b64DecodeUnicode(str) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                }).join(''))
            },
            changeOrderBy(){
                console.log('active');
                if(this.orderBy === 'desc'){
                    this.orderBy = 'asc';
                }else{
                    this.orderBy = 'desc';
                }
                this.store.state.statistics.orderItemStatics.reverse();
            }
        },
        created() {
            this.getStatistics('total');
        },
    }
</script>

<style scoped>

</style>