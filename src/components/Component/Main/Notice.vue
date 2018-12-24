<template>
    <div>
        <table style="width:90%; margin:5% auto">
            <tr>
                <th class="w-75"><h4>공지사항</h4></th>
                <th class="text-right"><small style="font-size:15px ;color:rgba(150,150,150)">더보기 ></small></th>
            </tr>
            <tr style="border-bottom: 0.1px solid rgba(233,233,233);" v-for="(notice, index) in this.store.state.delivererNotice" v-bind:key="notice.id">
                <td class="w-75text-right font-weight-bold">
                    <div>
                        <b-btn v-b-modal="`modal${index}`" class="bg-transparent text-dark border-0" v-on:click="getNoticeDetail(notice.id)">{{notice.title}}</b-btn>
                        <b-modal :id="`modal${index}`" :title="detail.title" :ok-only="true" :ok-title="'닫기'">
                            <p class="my-4">{{detail.content}}</p>
                        </b-modal>
                    </div>
                </td>
                <td class="text-right"><small>{{notice.regDate}}</small></td>
            </tr>
        </table>
    </div>
</template>

<script>
    var baseurl="http://freshntech.cafe24.com";
    export default {
        name: "Notice",
        data () {
            return {
                detail: ''
            }
        },
        methods:{
            getNoticeDetail(idx){
                this.$http.get(baseurl+"/deliverernotice/" + idx)
                .then((res) => {
                    this.detail = res.data;
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getNoticeDetail();
        },
    }
</script>

<style scoped>

</style>