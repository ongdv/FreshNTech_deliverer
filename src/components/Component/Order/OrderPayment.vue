<template>
    <div>
        <div>
            <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                        <span>
                            <span style="font-size: 1.1em;font-weight:bold;">
                                결제수단 선택
                            </span>
                            <br>
                            <label for="card"><input checked type="radio" name="payMethod" id="card" value="신용카드" v-model="payMethod" v-on:click="setPaymethod">신용카드</label>
                            <label for="account"><input type="radio" name="payMethod" id="account" value="계좌이체" v-model="payMethod" v-on:click="setPaymethod">계좌이체</label>
                        </span>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderPayment',
        data () {
            return {
                payMethod: '신용카드'
            }
        },
        methods: {
            setPaymethod () {
                this.store.state.orderPayment = this.payMethod
                this.$forceUpdate();
                console.log(this.store.state.orderPayment);
            }
        }
    }
</script>

<style scoped>
    
</style>