<template>
    <div>
        <div>
            <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                        <span>
                            <span style="font-size: 1.1em;font-weight:bold;">
                                요청사항
                            </span>
                            <br>
                            <span style="font-size: 0.75em;color:gray;">
                                {{this.store.state.orderRequest}}
                            </span>
                        </span>
                        <div style="position:absolute;right:1%;top:15%;" v-on:click="reqModal();">
                            <img src="@/assets/Next.png" alt="1" width="35px;">
                        </div>
                        <div class="modal fade bd-example-modal-lg" v-bind:class="{ show: request }" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="text-algin:center;padding-right: 17px;background-color:rgba(0,0,0,0.7);">
                            <div class="modal-dialog modal-lg" style="left:2.5%;top:25%;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title h4 w-100" id="myLargeModalLabel" style="text-align:center;">요청사항</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" v-on:click="close()">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body w-100" style="text-algin:center;margin:0 auto;">
                                        <b-form-input id="userid"
                                                    type="text"
                                                    v-model="orderRequest"
                                                    class="w-100"
                                                    placeholder="요청사항 입력">
                                        </b-form-input>
                                        <br>
                                        <input type="button"  class="btn btn-primary w-100" v-on:click="setRequest()" value="완료">
                                    </div>     
                                </div>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>    
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderRequest',
        data() {
            return {
                request: false,
                orderRequest: '배송 및 상품에 대한 추가 요청사항 입력'
            }
        },
        methods : {
            reqModal(){
                this.request = true;
            },
            close(){
                this.request=false;
            },
            setRequest(){
                this.store.state.orderRequest = this.orderRequest;
                this.close();
            }
        }
    }
</script>

<style scoped>
    .show{
        display: block;
    }
</style>