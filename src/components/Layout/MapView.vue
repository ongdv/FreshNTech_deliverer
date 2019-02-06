<template>
    <div>
        <MapViewerHead headname="지도보기"/>
        <MapViewer />
    </div>
</template>

<script>
    import {
        MapViewer,
        MapViewerHead,
        
    } from '../Component'
    export default {
        name: "MapView",
        components:{
            MapViewer,
            MapViewerHead,
        }
    }
</script>

<style scoped>

</style>