<template>
    <div>
        <b-list-group flush>
            <b-list-group-item class="bg-light">
                <div>
                    <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:left;">
                        주문 상품통계
                    </div>
                    <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:right;text-align:right;" v-if="orderBy ==='desc'" v-on:click="changeOrder">
                        주문 수량 순 ▼
                    </div>
                    <div style="width:50%;font-size:1.1em;font-weight:bold;color:gray;float:right;text-align:right;" v-else v-on:click="changeOrder">
                        주문 수량 순 ▲
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
        <b-list-group flush style="overflow:scroll;height:475px;">
            <b-list-group-item v-for="(item, index) in this.store.state.statistics.orderItemStatics" v-bind:key="index" style="font-size:1.1em;font-weight:bold;color:gray;" class="align-middle">
                <div style="width:10%;height:100%;font-size:1.5em;float:left;text-align:center;color:#18A384;">{{index+1}}</div>
                <div style="width:70%;height:100%;float:left;">
                    {{item.itemName}}<br>
                    <sup>{{item.unit}} | {{item.mainProvier}} / {{item.origin}}</sup>
                </div>
                <div style="width:20%;float:right;text-align:right;height:100%;" class="align-middle">
                    <span style="width:100%;color:black;font-size:1.3em;height:100%;display:block;">{{item.totalQuantity}} <span style="font-size:0.9em;color:gray;">개</span></span> 
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    export default {
        name: "StatisticsItemList",
        props: ['orderBy'],
        data () {
          return {

          }  
        },
        methods: {
            changeOrder() {
                // console.log('active');
                this.$emit('changeOrderBy');
            }
        }
    }
</script>

<style scoped>

</style>