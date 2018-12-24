<template>
    <div >
        <MainHead />
        <visual />
        <MainGrid />
        <Notice />
        <Footer />
    </div>
</template>

<script>
    import {
        MainHead,
        Visual,
        MainGrid,
        Notice,
        Footer
    } from '../Component';
    export default {
        name: "Main",
        components: {
            MainHead,
            Visual,
            MainGrid,
            Notice,
            Footer
        },
        data () {
            return{
                msg: '',
            }
        }
    }
</script>

<style scoped>
    
</style>