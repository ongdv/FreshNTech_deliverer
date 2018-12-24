<template>
    <div>
        <div class="modal fade bd-example-modal-lg" v-bind:class="{ show: pick }" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="text-algin:center;padding-right: 17px;background-color:rgba(0,0,0,0.7);">
            <div class="modal-dialog modal-lg" style="left:2.5%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title h4 w-100" id="myLargeModalLabel" style="text-align:center;">시작날짜변경</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" v-on:click="close()">×</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-algin:center;margin:0 auto;">
                        <DatePicker
                            placeholder="Select Date" 
                            v-model="startDate"
                            :format="format"
                            :language="languages[language]"
                            
                            :inline="true"
                        />
                            <br>
                        <input type="button"  class="btn btn-primary w-100" v-on:click="changeStartDate" value="다음">
                    </div>     
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg" v-bind:class="{ show: pick2 }" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="text-algin:center;padding-right: 17px;background-color:rgba(0,0,0,0.7);">
            <div class="modal-dialog modal-lg" style="left:2.5%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title h4 w-100" id="myLargeModalLabel" style="text-align:center;">종료날짜변경</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" v-on:click="close()">×</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-algin:center;margin:0 auto;">
                        <DatePicker
                            placeholder="Select Date" 
                            v-model="endDate"
                            :format="format"
                            :language="languages[language]"
                            
                            :inline="true"
                        />
                            <br>
                        <input type="button"  class="btn btn-primary w-100" v-on:click="changeEndDate()" value="완료">
                    </div>     
                </div>
            </div>
        </div>
        <div style="display:none;" v-on:change ="stringSearch">
            <input type="radio" v-model="selectDate" value="total" id="totalStatics" >
            <input type="radio" v-model="selectDate" value="lastMonth" id="lastMonth" >
            <input type="radio" v-model="selectDate" value="thisMonth" id="thisMonth" >
        </div>
        <div class="w-100 bg-light" style="text-align:center;height:65px;">
            <b-button-group style="margin-top:3%;">
                <label for="thisMonth" class="btn btn-white text-success border-secondary" style="width:125px;font-weight:bold;background-color:white;" v-if="selectDate === 'thisMonth'">이번달</label>
                <label for="thisMonth" class="btn btn-white text-secondary border-secondary" style="width:125px;background-color:white;" v-else>이번달</label>
                <label for="lastMonth" class="btn btn-white text-success border-secondary" style="width:125px;font-weight:bold;background-color:white;" v-if="selectDate==='lastMonth'">지난달</label>
                <label for="lastMonth" class="btn btn-white text-secondary border-secondary" style="width:125px;background-color:white;" v-else>지난달</label>
                <label for="totalStatics" class="btn btn-white text-success border-secondary" style="width:125px;font-weight:bold;background-color:white;" v-if="selectDate === 'total'">전체</label>
                <label for="totalStatics" class="btn btn-white text-secondary border-secondary" style="width:125px;background-color:white;" v-else>전체</label>
            </b-button-group>
        </div>
        <div class="w-100 bg-light" style="height:35px;border-bottom:0.1px solid lightgray;">
            <div style="margin-left:5%;font-size:1.1em;font-weight:700;color:lightgray;">
                <span style="float:left;width:70%;">
                    {{startDate}} ~ {{endDate}}
                </span>
                <span style="float:right;width:30%;text-align:right;" v-on:click="changePick">
                    기간선택 >&nbsp;&nbsp;
                </span >
            </div>
        </div>
    </div>
</template>

<script>
    let d = new Date();
    import DatePicker from 'vuejs-datepicker';
    import * as lang from "vuejs-datepicker/src/locale";
    export default {
        name: 'StatisticsStringCondition',
        components: {
            DatePicker
        },
        data () {
            return{
                selectDate: 'total',
                startDate: '',
                endDate: d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(),
                format: 'yyyy-MM-dd',
                language: "ko",
                languages: lang,
                pick: false,
                pick2: false
            }
        },
        methods: {
            stringSearch(){
                switch(this.selectDate) {   
                    case 'thisMonth' :
                        var d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                        this.startDate = d2.getFullYear() + '-' + (d2.getMonth()+1) + '-' + 1;
                        this.endDate = d2.getFullYear() + '-' + (d2.getMonth()+1) + '-' + d2.getDate();
                        break;
                    case 'lastMonth' : 
                        var d2 = new Date(d.getFullYear(), d.getMonth()+1, 0);
                        this.startDate = d2.getFullYear() + '-' + d2.getMonth() + '-' + 1;
                        this.endDate = d2.getFullYear() + '-' + (d2.getMonth()) + '-' + d2.getDate();
                        break;
                    case 'total' : 
                        this.startDate = '';
                        this.endDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
                        break;
                }
            this.$emit('getStatistics', this.selectDate);
            },
            changeStartDate() {
                this.close();
                this.pick2=true;
            },
            changeEndDate() {
                this.startDate= this.startDate.getFullYear() + '-' + (this.startDate.getMonth()+1) + '-' + this.startDate.getDate();
                this.endDate= this.endDate.getFullYear() + '-' + (this.endDate.getMonth()+1) + '-' + this.endDate.getDate();
                var conDate = {
                    startDate: this.startDate,
                    endDate: this.endDate
                }
                this.$emit('getStatisticsWithDate', conDate);
                this.close();
            },
            changePick(){
                this.pick = true;
            },
            close(){
                this.pick=false;
                this.pick2= false;
            }
        }
        
    }
</script>

<style scoped>
    .show{
        display: block;
    }
</style>