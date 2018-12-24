<template>
    <div>
        <div>
            <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                        <b-input-group>
                            <b-form-input v-model="gName"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-success" v-on:click="search()">검색</b-btn>
                            </b-input-group-append>
                    </b-input-group>
                    <b-form-select v-model="selected" :options="options" class="mb-3 mt-3" />
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'searchCondition',
        data () {
            return{
                gName: '',
                selected: null,
                options: [
                    { value: null, text: '카테고리 선택' },
                    { value: '1', text: '1' },
                    { value: '2', text: '2' },
                    { value: '3', text: '3' },
                    { value: '4', text: '4' },
                    { value: '5', text: '5' }
                ]
            }
        },
        methods: {
            search(){
                this.$emit('getGoods', this.gName);
            }
        }
    }
</script>

<style scoped>

</style>