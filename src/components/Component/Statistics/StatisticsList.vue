<template>
    <div>
        <div class="w-100" style="border-bottom:1px solid lightgray;">
            <b-list-group flush>
                <b-list-group-item >
                    <div>
                        <div style="width:50%;font-size:1.2em;font-weight:bold;color:gray;float:left;">
                            총 주문금액
                        </div>
                        <div style="width:50%;font-size:1.2em;font-weight:bold;color:gray;float:right;text-align:right;">
                            <span style="color:#18A384;" v-if="this.store.state.statistics.orderStatics.total_payment === undefined">0</span>
                            <span style="color:#18A384;" v-else>{{nwc(this.store.state.statistics.orderStatics.total_payment)}}</span> 원
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
        <div class="w-100" style="border-bottom:1px solid lightgray;">
            <b-list-group flush>
                <b-list-group-item >
                    <div>
                        <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:left;text-align:center;" v-if="this.store.state.statistics.orderStatics.total_orderNumber === undefined">
                            총 주문건수<br><span style="color:black;font-size:2.0em;">0</span> 건
                        </div>
                        <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:left;text-align:center;" v-else>
                            총 주문건수<br><span style="color:black;font-size:2.0em;">{{nwc(this.store.state.statistics.orderStatics.total_orderNumber)}}</span> 건
                        </div>

                        <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:left;text-align:center;" v-if="this.store.state.statistics.orderStatics.total_quantity === undefined">
                            총 주문수량<br><span style="color:black;font-size:2.0em;">0</span> 개
                        </div>
                        <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:left;text-align:center;" v-else>
                            총 주문수량<br><span style="color:black;font-size:2.0em;">{{nwc(this.store.state.statistics.orderStatics.total_quantity)}}</span> 개
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'StatisticsList',
        data () {
            return {

            }
        },
        methods: {
            nwc(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
        }
    }
</script>

<style scoped>

</style>