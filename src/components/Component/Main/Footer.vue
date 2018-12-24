<template>
    <div>
        <b-breadcrumb :items="items" class="bg-transparent w-100" style="position:fixed; bottom:0;"/>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data () {
            return {
                items: [{
                    text: '사업자 정보확인',
                    href: '#',
                    active: false
                }, {
                    text: '이용약관',
                    href: '#',
                    active: false
                }]
            }
        }
    }
</script>

<style scoped>

</style>