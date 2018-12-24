<template>
    <div>
        <div class="w-100 bg-light">
            <div style="margin-left:5%;">
                {{startDate}} ~ {{endDate}}
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatisticsDateCondition",
        data() {
            return {
                startDate: '2018-07-01',
                endDate: '2018-07-31'
            }
        }
    }
</script>

<style scoped>

</style>