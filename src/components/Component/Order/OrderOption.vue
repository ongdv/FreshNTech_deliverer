<template>
    <div>
        <div class="w-100 bg-light" style="margin-top:10px;">
            <b-list-group class="border-0">
                <b-list-group-item class="border-0 bg-light">
                    <span>
                        <span style="font-size: 1.2em;font-weight:bold;">
                            배송요청일
                        </span>
                        <br>
                        <span style="font-size: 1.3em;color:#18A384;">
                            {{deliveryDate}}
                        </span>
                    </span>
                    <div class="modal fade bd-example-modal-lg" v-bind:class="{ show: pick }" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="text-algin:center;padding-right: 17px;background-color:rgba(0,0,0,0.7);">
                        <div class="modal-dialog modal-lg" style="left:2.5%;top:25%;">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title h4 w-100" id="myLargeModalLabel" style="text-align:center;">날짜변경</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" v-on:click="close()">×</span>
                                    </button>
                                </div>
                                <div class="modal-body" style="text-algin:center;margin:0 auto;">
                                    <DatePicker 
                                        placeholder="Select Date" 
                                        v-model="deliveryDate"
                                        :language="languages[language]"
                                        :format="format"
                                        :inline="true"
                                    />
                                        <br>
                                    <input type="button"  class="btn btn-primary w-100" v-on:click="getDate()" value="완료">
                                </div>     
                            </div>
                        </div>
                    </div>
                    <b-button style="position:absolute;top:25%;right:5%;" v-on:click="changePick()">날짜변경</b-button>
                </b-list-group-item>
            </b-list-group>
        </div>
        
    </div>
</template>

<script>
    import DatePicker from 'vuejs-datepicker';
    import * as lang from "vuejs-datepicker/src/locale";
    let d = new Date();
    export default {
        name: 'OrderDate',
        components: {
            DatePicker
        },
        data(){
            return {
                deliveryDate: d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(),
                format: 'yyyy-MM-dd',
                language: "ko",
                languages: lang,
                pick: false
            }
        },
        methods: {
            getDate(){
                console.log(1);
                this.deliveryDate = this.deliveryDate.getFullYear() + "-" + (this.deliveryDate.getMonth()+1) + "-" + this.deliveryDate.getDate();
                this.store.state.deliveryDate = this.deliveryDate;
                this.close();
            },
            changePick(){
                console.log('active');
                this.pick = true;
            },
            close(){
                this.pick=false;
            }
        }
    }
</script>

<style scoped>
    .show{
        display: block;
    }
</style>