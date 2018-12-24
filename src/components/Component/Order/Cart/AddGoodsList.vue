<template>
    <div>
        <b-list-group flush style="overflow:scroll;height:540px;">
            <template v-for="(item, index) in this.store.state.goodsList">
                <b-list-group-item v-bind:key="index" v-on:click="addList(index)">
                    <div class="w-100 h-100" style="position:absolute;top:0;left:0;background-color:rgba(30, 161, 133, 0.3);" v-if="item.check"></div>
                    <div class="w-100 h-100" style="position:absolute;top:0;left:0;" v-else></div>
                    <span class="w-25" style="float:left;">
                        <img src="@/assets/VueLogo.png" alt="" width="60">
                    </span>
                    <div class="w-75" style="font-weight:bold;float:left;">
                        <span class="w-75">
                            [{{item.manufacturer}}] {{item.itemName}}<br>
                            <span style="width:65%;color:rgba(190,190,190,0.7);float:left;">{{item.unit}} <br> {{item.origin}}</span>
                        </span>
                        <span class="w-25">
                            <span style="float:right;font-weight:bold;">{{nwc(item.price1)}} 원</span>
                        </span>    
                    </div>
                </b-list-group-item>
            </template>
        </b-list-group>
        <b-list-group flush style="overflow:scroll; height:100px;" class="bg-light">
            <b-list-group-item class="bg-light">
                <div class="w-100">
                    <span style="width:65%;float:left;font-weight:bold;">선택상품</span>
                    <span style="float:right;font-weight:bold;">{{totalQty}} 개</span>
                </div>
                <div class="w-100 " style="text-align:center;margin-top:10%;">
                            <b-button style="width:48%;background-color:white;color:gray;font-size:1.1em;font-weight:bold;" v-on:click="cancelAdd">추가취소</b-button>
                            <b-button style="width:48%;background-color:#1FA185;font-size:1.1em;font-weight:bold;" class="border-0" v-on:click="goodsAdd">상품추가하기</b-button>
                        </div>
            </b-list-group-item>
        </b-list-group>
    </div>
    
</template>

<script>
    export default {
        name: "AddGoodsList",
        data () {
            return {
                totalQty:0
            }
        },
        methods: {
            nwc(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            addList(idx){
                if(this.store.state.goodsList[idx].check){
                    this.store.state.goodsList[idx].check = false;
                }else{
                    this.store.state.goodsList[idx].check = true;
                }
                this.getAddTotal();
                this.$forceUpdate();
            },
            getAddTotal(){
                var sum = 0;
                for(var i=0; i < this.store.state.goodsList.length; i++){
                    if(this.store.state.goodsList[i].check){
                        sum++;
                    }
                }
                this.totalQty=sum;
                this.$forceUpdate();
            },
            cancelAdd(){
                var a = confirm("추가된 항목이 모두 취소됩니다.")
                if(a==1){
                    for(var i=0; i < this.store.state.goodsList.length; i++){
                        this.store.state.goodsList[i].check = false;
                    }
                    this.getAddTotal();
                    this.$forceUpdate();
                }
            },
            goodsAdd(){
                if(this.totalQty === 0){
                    alert('선택한 상품이 없습니다.');
                    return;
                }
                
                for(var i=0; i<this.store.state.goodsList.length;i++){
                    if(this.store.state.goodsList[i].check === true){
                        let test = this.store.state.orderList.findIndex((item) => {
                            return item.id === this.store.state.goodsList[i].id;
                        })
                        console.log(test)
                        if(test !== -1){
                            continue;
                        }
                        console.log('active' + '  ' + i);
                        this.store.state.goodsList[i].qty=1;
                        this.store.state.goodsList[i].amount=this.store.state.goodsList[i].price1;
                        console.log(this.store.state.goodsList[i]);
                        this.store.state.orderList.push(this.store.state.goodsList[i]);
                        
                    }
                }
                console.log(this.store.state.orderList);
                this.$router.push('order')
            }
        },
    }
</script>

<style scoped>
    .active{
        background-color: green;
    }
</style>